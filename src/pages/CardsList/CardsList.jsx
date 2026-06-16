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
            <Button onClick={() => setShowModal(true)}>
              Adicionar Card
            </Button>
          </div>
        )}
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {cards.map((card) => (
          <img
            key={card._id}
            src={card.image}
            alt="Card"
            className="w-full rounded-sm"
          />
        ))}
      </div>

      {showModal && (
        <AddCard
          onClose={() => setShowModal(false)}
          onCardAdded={loadCards}
        />
      )}
    </div>
  );
}

export default CardsList;