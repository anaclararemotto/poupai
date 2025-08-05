# Poup.ai - Shell 

Este projeto representa o **Shell principal** do sistema Poup.ai, responsável por hospedar e orquestrar o Micro Frontend (MFE) utilizando **Native Federation** com Angular 20.

---

## 🚀 Tecnologias

- Angular 20
- Module Federation via `@angular-architects/native-federation`
- Bootstrap 5 + Bootstrap Icons
- JWT para autenticação
- Docker / Docker Compose

---

## 🔗 Integração com MFE

Este Shell se comunica com MFEs remotos definidos em `federation.config.js`. O carregamento dos MFEs é feito dinamicamente via **es-module-shims**.

> Certifique-se de que os MFEs estejam no ar antes de rodar o Shell.

---

## ⚙️ Como Rodar Localmente

### ✅ Pré-requisitos

- Node.js `>=18.x`
- Docker + Docker Compose
- Angular CLI:

```bash
npm install -g @angular/cli
```

▶️ Rodar via Docker Compose (recomendado)
1. Clone todos os repositórios envolvidos (shell e MFEs)
2. No diretório raiz do docker-compose.yml, execute:
```bash
docker compose up --build
```
3. Acesse o Shell em http://localhost:4200

▶️ Rodar localmente sem Docker
```bash
npm install
ng serve
```
---
## 📁 Estrutura
- `federation.config.js` — Configurações dos remotes (MFEs)
- `webpack.config.js` — Configuração de build para o Native Federation
- `app.routes.ts` — Configuração de rotas e lazy loading dos MFEs
---
## 📦 Dependências Principais
- `@angular-architects/native-federation`
- `@softarc/native-federation-node`
- `es-module-shims`
- `jwt-decode`

---

## 🤝 Contribuições
Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues com sugestões ou problemas, ou enviar pull requests com melhorias.








