import { DataSnapshot, onValue, ref, update } from "firebase/database";
import { db } from "../../firebase";
import { Order } from "@/models";
import { Unsubscribe } from "firebase/auth";

export class OrderService {
  static updateOrder = async (
    orderKey: string,
    orderParams: { status: string }
  ): Promise<void> => {
    try {
      const orderRef = ref(db, `pedidos/${orderKey}`);
      const status = Order.toDTO(orderParams.status);
      return update(orderRef, { status });
    } catch (error: any) {
      console.error("Erro ao atualizar pedido:", error.message);
      throw "Erro ao atualizar pedido. Tente novamente.";
    }
  };
  static trackOrders = (callback: (snapshot: DataSnapshot) => void): void => {
    const ordersRef = ref(db, `pedidos`);
    onValue(ordersRef, callback);
  };
}
