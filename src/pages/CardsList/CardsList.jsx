import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import AddCard from "../../components/AddCard/AddCard";
import { api } from "../../services/api";

import cardsListTitle from "../../images/CardsList/cards-list.png";

function CardsList() {
  const isAdmin = localStorage.getItem("admin") === "true";

  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([]);

  async function loadCards() {
    try {
      const response = await api.get("/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
    }
  }

  async function deleteCard(id) {
    if (!confirm("Deletar este card?")) return;
    try {
      await api.delete(`/cards/${id}`);
      loadCards();
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div
      className="w-full min-h-screen px-12 py-6"
      style={{ backgroundColor: "#3E3259" }}
    >
      <div className="relative mb-8">
        <div className="flex justify-center">
          <img
            src={cardsListTitle}
            alt="Cards List"
            className="h-18 object-contain"
          />
        </div>

        {isAdmin && (
          <div className="absolute right-80 top-1/2 -translate-y-1/2">
            <Button onClick={() => setShowModal(true)}>Adicionar Card</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card._id} className="relative group">
            <div
              className="overflow-hidden rounded-lg"
              style={{ aspectRatio: "1000 / 571" }}
            >
              <img
                src={`http://localhost:3000/uploads/${card.image}`}
                alt="Card"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            {isAdmin && (
              <button
                onClick={() => deleteCard(card._id)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Deletar
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <AddCard onClose={() => setShowModal(false)} onCardAdded={loadCards} />
      )}
    </div>
  );
}

export default CardsList;
