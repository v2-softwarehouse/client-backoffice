import { Order } from "@/models";
import { OrderListItem } from "./order-list-item.component";

type OrdersListProps = {
  items: Order[];
};

export const Orders = ({ items }: OrdersListProps) => {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold p-3">Backoffice</h1>
      <ul>
        {items.map((elem: Order, index) => (
          <OrderListItem key={index} item={elem} />
        ))}
      </ul>
    </div>
  );
};
