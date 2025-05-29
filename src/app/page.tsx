"use client";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { db, auth } from "../../firebase";

type ListItem = {
  value: string;
  button: {
    label: string;
    onClick: () => void;
  };
};

export default function Home() {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => setup(), []);

  const setup = () => {
    signInWithEmailAndPassword(auth, "operador@mysnack.com", "senhaSegura123")
      .then(() => {
        console.log("Login do operador realizado com sucesso.");

        const pedidosRef = ref(db, "pedidos");

        onValue(pedidosRef, (snapshot) => {
          setList([]);

          snapshot.forEach((childSnapshot) => {
            const pedido = childSnapshot.val();
            const key = childSnapshot.key;

            let item: ListItem = {
              value: `${pedido.nome} - ${pedido.status}`,
              button: {
                label: "Avançar",
                onClick: () => {
                  const novoStatus =
                    pedido.status === "aguardando aceite"
                      ? "aceito"
                      : pedido.status === "aceito"
                      ? "preparando pedido"
                      : pedido.status === "preparando pedido"
                      ? "pronto"
                      : "pronto";

                  const pedidoRef = ref(db, `pedidos/${key}`);
                  update(pedidoRef, { status: novoStatus })
                    .then(() =>
                      console.log(
                        `Pedido ${key} atualizado para: ${novoStatus}`
                      )
                    )
                    .catch((err) =>
                      console.error("Erro ao atualizar pedido:", err.message)
                    );
                },
              },
            };

            setList((curr) => [...curr, item]);
          });
        });
      })
      .catch((error) => {
        console.error("Erro ao autenticar operador:", error.message);
      });
  };

  return (
    <>
      <h1>Client Backoffice</h1>
      <ul>
        {list.map((elem: ListItem, index) => (
          <Item key={index} item={elem} />
        ))}
      </ul>
    </>
  );
}

const Item = ({ item }: { item: ListItem }) => (
  <li>
    {item.value}
    {item.button && (
      <button onClick={item.button.onClick}>{item.button.label}</button>
    )}
  </li>
);
