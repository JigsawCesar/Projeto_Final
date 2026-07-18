# 🦁 LionsDev Final Project | Full-Stack Application

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Render-00E676?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
</p>

---

## 📝 Overview
This full-stack application represents the **Final Graduation Project** for the **LionsDev** software engineering program. Built upon a robust architectural foundation, the ecosystem delivers secure authentication, cloud-native data persistence, decoupled domain layers, and seamless end-to-end frontend integration.

---

## 🚀 Live Deployments
The application is fully operational in production. Explore the cloud environments below:

<table>
  <tr>
    <td><strong>🌐 Frontend Site</strong></td>
    <td><a href="INSERT_FRONTEND_URL_HERE">🔗 Access Live Interface</a></td>
  </tr>
  <tr>
    <td><strong>⚙️ Backend Gateway</strong></td>
    <td><a href="INSERT_BACKEND_URL_HERE">🔗 Access Public API API</a></td>
  </tr>
</table>

---

## 🛠️ Technology Stack
* **Runtime:** Node.js (LTS Engine)
* **Framework:** Express.js 
* **Database ODM:** Mongoose / MongoDB Atlas
* **Security:** `bcryptjs` (Blowfish Hashing) & `jsonwebtoken` (Stateful Bearer Bearer)
* **Testing:** Postman Automated Core
* **Deployment System:** Render Web Services

---

## ✨ System Architecture & Layers
The system core builds directly upon the original **LionsDev Boilerplate**, implementing a strictly decoupled architectural model to enforce separation of concerns:

```text
src/
├── 📄 app.js             # Global interceptors, route orchestration, and 404 handlers
├── 📄 server.js          # Core initialization, environment boots, and MongoDB driver
├── 📂 config/            # Infrastructure drivers (database.js connections)
├── 📂 controllers/       # HTTP request ingestion and structural JSON response delivery
├── 📂 middlewares/       # Core security walls, route guarding, and validation pipelines
├── 📂 models/            # Strict Mongoose ODM collection Schemas
├── 📂 repositories/      # Data Access Objects (DAO) communicating with the MongoDB driver
├── 📂 routes/            # Network edge routing and middleware chain definitions
├── 📂 services/          # Pure isolated business domain and validation constraints
└── 📂 utils/             # Reusable core engines (custom dynamic error generation)
```

> ⚠️ **Core Layer Rule:** Controllers do *not* speak to the database. Persistance is strictly managed by the **Repository**, while business workflow validations are locked inside the **Service** tier.

---

## 🛣️ Production API Blueprint

### 🔐 Security & Identity
| Method | Endpoint | Description | Guard Type |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/cadastro` | Provision new user credentials | `Public` |
| `POST` | `/api/auth/login` | Validate records & distribute JWT | `Public` |
| `GET` | `/api/usuarios/perfil` | Fetch authenticated identity metadata | `Bearer Token` |
| `PATCH` | `/api/usuarios/perfil` | Update dynamic profile vectors | `Bearer Token` |
| `DELETE` | `/api/usuarios/perfil`| Decommission user system records | `Bearer Token` |

### 📁 Core Domain Entities
*Replace placeholders below with your exact system domain models:*

#### Entity Model Alpha: `[Entity A]`
* `POST /api/entidade-a` → Register unique record `[Protected]`
* `GET /api/entidade-a` → Ingest full collection logs `[Protected]`
* `GET /api/entidade-a/:id` → Fetch targeted unique instance ID `[Protected]`
* `PATCH /api/entidade-a/:id` → Mutate localized fields `[Protected]`
* `DELETE /api/entidade-a/:id` → Purge system entity entry `[Protected]`

#### Entity Model Beta: `[Entity B]`
* `POST /api/entidade-b` → Register unique record `[Protected]`
* `GET /api/entidade-b` → Ingest full collection logs `[Protected]`
* `GET /api/entidade-b/:id` → Fetch targeted unique instance ID `[Protected]`
* `PATCH /api/entidade-b/:id` → Mutate localized fields `[Protected]`
* `DELETE /api/entidade-b/:id` → Purge system entity entry `[Protected]`

---

## ⚙️ Environment Blueprint (`.env`)
Generate your local configuration file inside the root repository root using the layout structure below:

```ini
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_token_secret_key
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

---

## 💻 Local Setup Flow
1. **Clone the repository:**
   ```bash
   git clone [YOUR-REPOSITORY-URL]
   cd [REPOSITORY-DIRECTORY]
   ```
2. **Install project node modules:**
   ```bash
   npm install
   ```
3. **Seed configuration keys:**
   Create a local `.env` matching the architecture variables pattern defined above.
4. **Boot the gateway engine:**
   ```bash
   npm start
   ```

---

## 📮 Postman Quality Assurance
An executable integration test collection file is packaged directly into the root workspace directory:
* **Target Schema File:** `Your_Collection_File_Name.postman_json`

Import the collection directly into Postman to run automated request suites assessing error handling boundaries, malformed identifiers, unauthenticated blockades, and relation workflow logic across both `localhost` and `Render` deployment parameters.

---

## 🤖 Applied AI Logs
* **System Automation Platforms:** `[Specify e.g., FlutterFlow / v0 / ChatGPT]`
* **Scope Applied:** Rapid responsive interface generation, structural boilerplate layouts, and specific front-end layout constraints.
* **Human Validation Scope:** 100% of the core backend business rules, architectural layer logic, custom error definitions, middleware logic, and database schema associations were manually authored, tested, and audited by the project team.

---

## 👥 Engineering Team
This software ecosystem was engineered, tested, and delivered by:
* **Lucas Vinícius Strachulski**
* **Lucas Apollo**
* **Wendel**
* **Felipe Portela**

---
<p align="center">
  <sub>Developed for the graduation requirements of the LionsDev Full-Stack Software Engineering Modules.</sub>
</p>
