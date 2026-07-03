# 💜🔮 mafuyu's backend 🔮
backend developed for the mafuyu cards project, responsible for managing and serving all card data for mafuyu asahina from project sekai. this api handles authentication-free data operations, image uploads, and persistence using a modern node.js architecture. 💜

---

## 🔗 live demo
* **💜 frontend:** [mafuyus-frontend.vercel.app](https://mafuyus-frontend.vercel.app/)
* **🔮 backend api:** [mafuyus-backend.onrender.com](https://mafuyus-backend.onrender.com)

---

## 💜 overview
the api was built with a focus on **simplicity and reliability**, providing clean routes for card management and serving as the data layer for the mafuyus frontend.

* **💜 crud operations:** full create, read, update and delete support for cards.
* **💜 image uploads:** handles card image uploads with multer.
* **💜 database:** persistent storage powered by mongodb.
* **💜 organization:** clean separation between routes, models, services and middleware.

---

## 🔮 technologies used
* **node.js**: javascript runtime for the server.
* **express**: web framework for building the api routes.
* **mongodb**: database used for data persistence.
* **mongoose**: object modeling for mongodb.
* **multer**: middleware for handling image uploads.
* **postman**: rigorous testing and validation of all api routes.
* **dotenv**: environment variable management.

---

## 🔒 api features
| feature | description |
| :--- | :--- |
| **get cards** | retrieves the complete list of cards. |
| **get card by id** | retrieves detailed information for a single card. |
| **create card** | adds a new card with image upload support. |
| **update card** | edits an existing card's information. |
| **delete card** | permanently removes a card from the database. |
| **image handling** | sanitizes filenames and builds full image urls for uploaded card art. |

---

## 🔮 project structure
```
mafuyus-backend/
├── src/
│   ├── config/
│   │   └── database/
│   │       └── connection.js
│   ├── middleware/
│   ├── models/
│   │   └── Card.js
│   ├── routes/
│   │   └── card.routes.js
│   ├── services/
│   │   └── api.js
│   └── uploads/
├── .env
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## 💜 repositories
* **backend:** [https://github.com/scriptlver/mafuyus-backend](https://github.com/scriptlver/mafuyus-backend)
* **frontend:** [https://github.com/scriptlver/mafuyus-frontend](https://github.com/scriptlver/mafuyus-frontend)

---

## 🔮 local installation
to run the api on your machine:

### 1. clone the repository
```bash
git clone https://github.com/scriptlver/mafuyus-backend.git
```

### 2. install dependencies
```bash
npm install
```

### 3. set up environment variables
create a `.env` file with your mongodb connection string and other required variables.

### 4. run the project
```bash
npm start
```

---

## 💜 final notes 🔮
* **language**: the entire project was built in english.
* **data management**: full persistence handled by **mongodb**.
* **testing**: all crud operations were validated via **postman** to ensure stability and reliability.
* **purpose**: project developed for portfolio, serving as the data layer for the mafuyus frontend.