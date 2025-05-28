import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkymKOrvjC8cobaJM5ghL32-rhBBg-Gas",
  authDomain: "my-snack-cd3cb.firebaseapp.com",
  databaseURL: "https://my-snack-cd3cb-default-rtdb.firebaseio.com",
  projectId: "my-snack-cd3cb",
  storageBucket: "my-snack-cd3cb.appspot.com",
  messagingSenderId: "709071649276",
  appId: "1:709071649276:web:144e7174c48a394a0c5a79",
  measurementId: "G-FH543CE1MG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

signInWithEmailAndPassword(auth, "operador@mysnack.com", "senhaSegura123")
  .then(() => {
    console.log("Login do operador realizado com sucesso.");

    const pedidosRef = ref(db, "pedidos");
    const lista = document.getElementById("listaPedidos");

    onValue(pedidosRef, (snapshot) => {
      lista.innerHTML = "";

      snapshot.forEach((childSnapshot) => {
        const pedido = childSnapshot.val();
        const key = childSnapshot.key;

        const li = document.createElement("li");
        li.textContent = `${pedido.nome} - ${pedido.status}`;

        const avancar = document.createElement("button");
        avancar.textContent = "Avançar";

        avancar.onclick = () => {
          const novoStatus =
            pedido.status === "aguardando aceite" ? "aceito" :
            pedido.status === "aceito" ? "preparando pedido" :
            pedido.status === "preparando pedido" ? "pronto" : "pronto";

          const pedidoRef = ref(db, `pedidos/${key}`);
          update(pedidoRef, { status: novoStatus })
            .then(() => console.log(`Pedido ${key} atualizado para: ${novoStatus}`))
            .catch((err) => console.error("Erro ao atualizar pedido:", err.message));
        };

        li.appendChild(avancar);
        lista.appendChild(li);
      });
    });
  })
  .catch((error) => {
    console.error("Erro ao autenticar operador:", error.message);
  });
