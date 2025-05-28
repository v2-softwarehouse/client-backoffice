# Client Backoffice

Sistema operacional para controle de pedidos.

## Requisitos
- Firebase CLI instalado (`npm install -g firebase-tools`)
- Projeto Firebase com Authentication, Realtime Database e Hosting habilitados

## Publicação
```bash
cd client-backoffice
firebase init hosting
# Selecione o projeto, defina 'public' como pasta e habilite como SPA
firebase deploy --only hosting
```

## Funcionalidades
- Login com e-mail/senha via Firebase Auth
- Visualização e atualização do status de pedidos# client-backoffice
