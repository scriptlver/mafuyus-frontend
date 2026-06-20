import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import AddCard from "../../components/AddCard/AddCard";
import { api } from "../../services/api";

import cardsListTitle from "../../images/CardsList/cards-list.png";

function CardsList() {
  const isAdmin = localStorage.getItem("admin") === "true";

  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  async function loadCards() {
    try {
      const response = await api.get("/cards");
      setCards(response.data);
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
    }
  }

  function formatFileName(filename) {
    return filename
      .split("-")
      .slice(1)
      .join("-")
      .replace(/\.[^/.]+$/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
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
          <div
            key={card._id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <div
              className="overflow-hidden rounded-lg relative"
              style={{ aspectRatio: "1000 / 571" }}
            >
              <img
                src={`http://localhost:3000/uploads/${card.image}`}
                alt={formatFileName(card.image)}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#3E3259]/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-sm text-center px-3 break-all">
                  {formatFileName(card.image)}
                </span>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(card._id);
                }}
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

      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-[#3E3259] p-4 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:3000/uploads/${selectedCard.image}`}
              alt={formatFileName(selectedCard.image)}
              className="w-full max-h-[70vh] object-contain rounded"
            />

            <p className="text-white text-center mt-4 text-lg">
              {formatFileName(selectedCard.image)}
            </p>

            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
              onClick={() => setSelectedCard(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsList;
