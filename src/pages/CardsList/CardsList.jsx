import mafuyuCard from "../../images/cards/mafuyu-card.webp";
import mafuyuCard2 from "../../images/cards/mafuyu-card-2.webp";

const cards = [mafuyuCard, mafuyuCard2];

function CardsList() {
  return (
    <div
      className="w-full min-h-screen px-12 py-6"
      style={{ backgroundColor: "#3E3259" }}
    >
      <h1 className="text-4xl font-bold text-white text-center mb-10">
        Cards List
      </h1>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
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
    </div>
  );
}

export default CardsList;