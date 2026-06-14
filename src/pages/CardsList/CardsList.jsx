import { useState } from "react";

import Button from "../../components/Button/Button";
import AddCard from "../../components/AddCard/AddCard";
import cardsListTitle from "../../images/CardsList/cards-list.png";
import mafuyuCard from "../../images/cards/mafuyu-card.webp";
import mafuyuCard2 from "../../images/cards/mafuyu-card-2.webp";

const cards = [
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
  mafuyuCard2,
  mafuyuCard,
];

function CardsList() {
  const isAdmin = localStorage.getItem("admin") === "true";
  const [showModal, setShowModal] = useState(false);

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

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {cards.map((card, index) => (
          <img
            key={index}
            src={card}
            alt={`Card ${index + 1}`}
            className="w-full rounded-sm"
          />
        ))}
      </div>

      {showModal && <AddCard onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CardsList;
