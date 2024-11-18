import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { OrderHistoryItem } from "../../components/client/orderHistoryItem/orderHistoryItem";
import { ModalConfirm } from "../../components/common";
import { useOrder, useTable, usePayment } from "../../hooks";

export function OrdersHistory() {
  const [idTable, setIdTable] = useState(null);
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;
    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      totalPayment: totalPayment.toFixed(2),
      paymentType,
      statusPayment: "PENDING",
    };

    const payment = await createPayment(paymentData);
    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }
    window.location.reload();
  };

  return (
    <div>
      <h2>Historial de Pedidos</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {map(orders, (order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}

          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "Cuenta pedida"
                : "Pedir cuenta"}
            </Button>
          )}
        </>
      )}

      <ModalConfirm
        title="Pagar con:"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment("CASH")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("CART")}
      />
    </div>
  );
}
