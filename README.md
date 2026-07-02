# 💜🔮 mafuyus frontend 🔮
frontend developed for the mafuyu cards project, a site dedicated to mafuyu asahina from project sekai. this interface manages the user experience and data consumption using a modern and responsive architecture. 💜

---

## 🔮 project preview
here are some records of the interface:

<div align="center">
  <img src="/assets/images/screenshots/mobile.png" width="700px" alt="mafuyus frontend preview">
</div>

---

## 💜 look & feel
the project was built with a focus on **ui/ux aesthetic**, using a soft purple color palette and elegant typography to reflect mafuyu asahina's identity.

* **💜 interactivity:** smooth transitions and visual feedback while browsing cards.
* **💜 design:** inspired by mafuyu asahina's project sekai card art.
* **💜 responsiveness:** adapted for different screen sizes.
* **💜 organization:** cards displayed in alphabetical order, showing only base (non-evolved) versions.

---

## 🔮 technologies used
* **react**: core of the project for high performance and dynamic components.
* **vite**: fast build tool and development server.
* **javascript**: main programming language of the application.
* **tailwind css**: utility-first styling for a custom, modern layout.
* **axios**: integration with the backend for api consumption.
* **mongodb**: cloud database for data persistence.
* **postman**: rigorous testing and validation of all api routes.
* **eslint**: code quality and consistency enforcement.

---

## 🔒 site features
| feature | description |
| :--- | :--- |
| **view cards** | complete listing of mafuyu asahina's cards in alphabetical order. |
| **card details** | view detailed information for each individual card. |
| **base cards only** | displays only normal (non-evolved) card versions. |
| **admin panel** | exclusive admin functions for full card management. |
| **add card** | admin can create new cards with images and details. |
| **edit card** | admin can update existing card information in real time. |
| **delete card** | admin can permanently remove a card from the collection. |

---

## 🔮 project structure
```
mafuyus-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── components/
│   │   └── images/
│   │       ├── AddCard/
│   │       ├── Cards/
│   │       ├── CardsList/
│   │       ├── Layout/
│   │       └── Preview/
│   ├── pages/
│   │   ├── CardsList/
│   │   │   └── CardsList.jsx
│   │   └── Home/
│   │       └── Home.jsx
│   ├── routes/
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitattributes
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 💜 repositories
* **frontend:** [https://github.com/scriptlver/mafuyus-frontend](https://github.com/scriptlver/mafuyus-frontend)
* **backend:** [https://github.com/scriptlver/mafuyus-backend](https://github.com/scriptlver/mafuyus-backend)

---

## 🔮 local installation
to run the interface on your machine:

### 1. clone the repository
```bash
git clone https://github.com/scriptlver/mafuyus-frontend.git
cd mafuyus-frontend
```

### 2. install dependencies
```bash
npm install
```

### 3. run the project
```bash
npm run dev
```

---

## 💜 final notes 🔮
* **language**: the entire site was built in english.
* **data management**: full persistence handled by **mongodb**.
* **testing**: all crud operations were validated via **postman** to ensure stability and reliability.
* **purpose**: project developed for portfolio, blending technology and art direction.

design by scriptlver 💜