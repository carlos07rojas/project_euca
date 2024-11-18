import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TablePayments } from "../../components/admin";
import { usePayment } from "../../hooks";

export function PaymentHistory() {
  const { loagind, payments, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div>
      <HeaderPage title="Historial de Pagos" />
      {loagind ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
          <TablePayments payments={payments} />
      )}
    </div>
  );
}
