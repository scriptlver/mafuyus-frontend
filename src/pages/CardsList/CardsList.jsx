import mafuyuCard from "../../images/cards/mafuyu-card.webp";

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
        {Array.from({ length: 9 }).map((_, index) => (
          <img
            key={index}
            src={mafuyuCard}
            alt="Mafuyu Card"
            className="w-full rounded-sm"
          />
        ))}
      </div>
    </div>
  );
}

export default CardsList;
