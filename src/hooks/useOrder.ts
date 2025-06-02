import { Order } from "@/models";
import { AuthService, OrderService } from "@/services";
import { useState } from "react";

export const useOrder = () => {
  const [items, setItems] = useState<Order[]>([]);

  const setup = async () => {
    try {
      const params = {
        email: "operador@mysnack.com",
        password: "senhaSegura123",
      };
      await AuthService.signIn(params);

      OrderService.trackOrders((snapshot) => {
        setItems([]);

        snapshot.forEach((childSnapshot) => {
          const pedido = childSnapshot.val();
          const key = childSnapshot.key;
          const item = new Order({ key, ...pedido });

          setItems((curr) => [...curr, item]);
        });
      });
    } catch (error: any) {
      console.error("Erro ao autenticar operador:", error.message);
    }
  };

  return {
    items,
    setup,
  };
};
