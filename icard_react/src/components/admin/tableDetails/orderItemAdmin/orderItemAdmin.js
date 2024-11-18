import React from "react";
import { Button, Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import { useOrder } from "../../../../hooks";
import { ORDER_STATUS } from "../../../../utils/constans";
import "moment/locale/es";
import "./orderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;
  const { CheckDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await CheckDeliveredOrder(order.id);
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("DD/MM | HH:mm")}</span> {" - "}
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </div>

      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={onCheckDeliveredOrder}>
          ENTREGADO
        </Button>
      )}
    </div>
  );
}
