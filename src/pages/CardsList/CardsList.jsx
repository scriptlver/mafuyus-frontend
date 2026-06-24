import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import AddCard from "../../components/AddCard/AddCard";
import { api } from "../../services/api";

import cardsListTitle from "../../images/CardsList/cards-list.png";

const cormorant = { fontFamily: "Cormorant", fontWeight: "700" };

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function CardsList() {
  const isAdmin = localStorage.getItem("admin") === "true";

  const [showModal, setShowModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const [editingCard, setEditingCard] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");

  async function loadCards() {
    try {
      const response = await api.get("/cards");
      const sorted = response.data.sort((a, b) => {
        const nameA = (a.name || formatFileName(a.image)).toLowerCase();
        const nameB = (b.name || formatFileName(b.image)).toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setCards(sorted);
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

  function isUpgrade(card) {
    const name = (card.name || card.image).toLowerCase();
    return name.includes("up");
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

  async function updateCard() {
    if (!editingCard) return;
    try {
      const formData = new FormData();
      if (newImage) formData.append("image", newImage);
      if (newTitle.trim()) formData.append("name", newTitle);

      await api.put(`/cards/${editingCard._id}`, formData);

      setEditingCard(null);
      setNewImage(null);
      setPreviewImage("");
      setSelectedCard(null);
      setNewTitle("");
      loadCards();
    } catch (error) {
      console.error("Erro ao atualizar card:", error);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  const availableLetters = new Set(
    cards.map((card) =>
      (card.name || formatFileName(card.image))[0].toUpperCase(),
    ),
  );

  const filteredCards = cards.filter((card) => {
    if (activeType === "upgrade") return isUpgrade(card);
    if (activeType === "normal") return !isUpgrade(card);
    if (activeLetter)
      return (card.name || formatFileName(card.image))
        .toUpperCase()
        .startsWith(activeLetter);
    return true;
  });

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
          <div className="absolute right-90 top-1/2 -translate-y-1/2">
            <Button onClick={() => setShowModal(true)}>Add Card</Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-start gap-3 mb-6 flex-wrap">
        <span
          className="text-white"
          style={{ ...cormorant, fontSize: "1.2rem" }}
        >
          Filter by:
        </span>

        <button
          onClick={() => {
            setActiveLetter(null);
            setActiveType(null);
          }}
          style={{
            ...cormorant,
            fontSize: "1.1rem",
            color:
              activeLetter === null && activeType === null
                ? "white"
                : "#9B8AB8",
            fontWeight:
              activeLetter === null && activeType === null ? "700" : "500",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          All
        </button>

        {ALPHABET.map((letter) => {
          const available = availableLetters.has(letter);
          if (!available) return null;
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              onClick={() => {
                setActiveType(null);
                setActiveLetter(isActive ? null : letter);
              }}
              style={{
                ...cormorant,
                fontSize: "1rem",
                color: isActive ? "white" : "#9B8AB8",
                fontWeight: isActive ? "700" : "500",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredCards.map((card) => (
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
                <span
                  className="text-white text-center px-3 break-all"
                  style={{ ...cormorant, fontSize: "1.1em" }}
                >
                  {card.name || formatFileName(card.image)}
                </span>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(card._id);
                }}
                className="absolute top-2 right-2 bg-red-700 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                style={cormorant}
              >
                Delete
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
              alt={selectedCard.name}
              className="w-full max-h-[70vh] object-contain rounded"
            />

            <p
              className="text-white text-center mt-4"
              style={{ ...cormorant, fontSize: "1.7rem" }}
            >
              {selectedCard.name || formatFileName(selectedCard.image)}
            </p>

            <div className="flex justify-center gap-2 mt-4">
              {isAdmin && (
                <button
                  className="px-4 py-2 rounded-xl bg-[#624F8C] text-white hover:bg-[#725EA1]"
                  style={cormorant}
                  onClick={() => {
                    setEditingCard(selectedCard);
                    setPreviewImage(
                      `http://localhost:3000/uploads/${selectedCard.image}`,
                    );
                    setNewTitle(selectedCard.name || "");
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-[#8c8c8c]"
                style={cormorant}
                onClick={() => setSelectedCard(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCard && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]"
          onClick={() => setEditingCard(null)}
        >
          <div
            className="bg-[#3E3259] p-6 rounded-xl w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/src/images/AddCard/edit-card.png"
              alt="Edit Card"
              className="mb-4 w-42"
            />

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Edit title of the card"
              className="w-full mb-4 px-3 py-2 rounded bg-[#2E2442] text-white outline-none"
              style={cormorant}
            />

            <div className="rounded-xl h-64 flex items-center justify-center overflow-hidden mb-4">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <label
              className="w-full cursor-pointer px-4 py-3 rounded-xl bg-[#624F8C] text-white text-center block"
              style={cormorant}
            >
              Choose image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setNewImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
            </label>

            <div className="flex gap-2 mt-6">
              <button
                className="flex-1 bg-green-600 text-white py-2 rounded"
                style={cormorant}
                onClick={updateCard}
              >
                Save
              </button>

              <button
                className="flex-1 bg-red-500 text-white py-2 rounded"
                style={cormorant}
                onClick={() => {
                  setEditingCard(null);
                  setNewImage(null);
                  setPreviewImage("");
                  setNewTitle("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardsList;
