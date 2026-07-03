import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import AddCard from "../../components/AddCard/AddCard";
import { api } from "../../services/api";

import cardsListTitle from "../../images/CardsList/cards-list.png";

const cormorant = { fontFamily: "Cormorant", fontWeight: "700" };

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const BACKEND_URL = "https://mafuyus-backend.onrender.com";

function Toast({ type, message, onClose }) {
  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 right-6 z-[100] w-[320px] bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <span
          className="text-gray-800 flex-1"
          style={{
            fontFamily: "Cormorant",
            fontWeight: "600",
            fontSize: "1.05rem",
          }}
        >
          {message}
        </span>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none flex-shrink-0"
        >
          &#10005;
        </button>
      </div>

      <div className="h-1 w-full bg-gray-100">
        <div
          className={`h-full ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
          style={{
            animation: "toast-progress 3s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

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

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

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

  async function confirmDelete() {
    if (!deleteConfirm) return;
    try {
      await api.delete(`/cards/${deleteConfirm._id}`);
      loadCards();
      showToast("success", "Card deleted successfully!");
    } catch (error) {
      console.error("Erro ao deletar card:", error);
      showToast("error", "Failed to delete the card. Please try again.");
    } finally {
      setDeleteConfirm(null);
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
      showToast("success", "Card updated successfully!");
    } catch (error) {
      console.error("Erro ao atualizar card:", error);
      showToast("error", "Failed to update the card. Please try again.");
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

  function goToPrevCard() {
    const currentIndex = filteredCards.findIndex(
      (card) => card._id === selectedCard._id,
    );
    if (currentIndex === -1) return;
    const prevIndex =
      (currentIndex - 1 + filteredCards.length) % filteredCards.length;
    setSelectedCard(filteredCards[prevIndex]);
    document
      .getElementById("thumbnail-strip")
      ?.scrollBy({ left: -150, behavior: "smooth" });
  }

  function goToNextCard() {
    const currentIndex = filteredCards.findIndex(
      (card) => card._id === selectedCard._id,
    );
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredCards.length;
    setSelectedCard(filteredCards[nextIndex]);
    document
      .getElementById("thumbnail-strip")
      ?.scrollBy({ left: 150, behavior: "smooth" });
  }

  useEffect(() => {
    if (!selectedCard) return;

    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") goToPrevCard();
      if (e.key === "ArrowRight") goToNextCard();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCard, filteredCards]);

  return (
    <div
      className="w-full min-h-screen px-12 py-6 flex flex-col"
      style={{ backgroundColor: "#3E3259" }}
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex-1">
        <div className="relative mb-8">
          <div className="flex justify-center">
            <img
              src={cardsListTitle}
              alt="Cards List"
              className="h-18 object-contain"
            />
          </div>

          {isAdmin && (
            <div className="absolute right-90 top-1/2 -translate-y-1/2 hidden sm:block">
              <Button onClick={() => setShowModal(true)}>Add Card</Button>
            </div>
          )}

          {isAdmin && (
            <div className="flex justify-center mt-6 sm:hidden">
              <Button
                onClick={() => setShowModal(true)}
                className="text-xl px-20 py-2"
              >
                Add Card
              </Button>
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
                  opacity: availableLetters.has(letter) ? 1 : 0.3,
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
                  src={`${BACKEND_URL}/uploads/${card.image}`}
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
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingCard(card);
                      setPreviewImage(`${BACKEND_URL}/uploads/${card.image}`);
                      setNewTitle(card.name || formatFileName(card.image));
                    }}
                    className="bg-[#624F8C] text-white text-xs px-2 py-1 rounded w-10 text-center hover:bg-[#3d2f5e] transition-colors duration-200"
                    style={cormorant}
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(card);
                    }}
                    className="bg-red-600 text-white text-xs px-2 py-1 rounded w-12 text-center hover:bg-red-800 transition-colors duration-200"
                    style={cormorant}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-10 py-4 text-center">
        <span style={{ ...cormorant, fontSize: "1.09rem", color: "#C9BEDE" }}>
          by{" "}
          <a
            href="https://github.com/scriptlver"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
            style={{ ...cormorant, color: "#C9BEDE" }}
          >
            scriptlver
          </a>
        </span>
      </footer>

      {showModal && (
        <AddCard onClose={() => setShowModal(false)} onCardAdded={loadCards} />
      )}

      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-[#3E3259] p-3 sm:p-5 rounded-lg max-w-3xl w-[90%] sm:w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-3 right-4 text-white text-lg hover:text-[#9B8AB8] leading-none"
            >
              &#10005;
            </button>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevCard();
                }}
                className="text-white text-3xl px-2 py-1 rounded-full hover:text-[#9B8AB8] transition flex-shrink-0"
                style={cormorant}
              >
                &#8249;
              </button>

              <img
                src={`${BACKEND_URL}/uploads/${selectedCard.image}`}
                alt={selectedCard.name}
                className="flex-1 max-h-[35vh] sm:max-h-[60vh] object-contain rounded"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextCard();
                }}
                className="text-white text-3xl px-2 py-1 rounded-full hover:text-[#9B8AB8] transition flex-shrink-0"
                style={cormorant}
              >
                &#8250;
              </button>
            </div>

            <p
              className="text-white text-center mt-2"
              style={{ ...cormorant, fontSize: "1.2rem" }}
            >
              {selectedCard.name || formatFileName(selectedCard.image)}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById("thumbnail-strip")
                    ?.scrollBy({ left: -150, behavior: "smooth" });
                }}
                className="text-white text-3xl px-1 hover:text-[#9B8AB8] flex-shrink-0"
                style={cormorant}
              >
                &#8249;
              </button>

              <div
                id="thumbnail-strip"
                className="flex gap-2 overflow-x-auto flex-1 scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredCards.map((card) => (
                  <img
                    key={card._id}
                    src={`${BACKEND_URL}/uploads/${card.image}`}
                    alt={formatFileName(card.image)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(card);
                    }}
                    className={`h-10 w-16 sm:h-14 sm:w-24 object-cover rounded cursor-pointer flex-shrink-0 transition ${
                      selectedCard._id === card._id
                        ? "ring-2 ring-white"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById("thumbnail-strip")
                    ?.scrollBy({ left: 150, behavior: "smooth" });
                }}
                className="text-white text-3xl px-1 hover:text-[#9B8AB8] flex-shrink-0"
                style={cormorant}
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCard && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] px-4"
          onClick={() => setEditingCard(null)}
        >
          <div
            className="bg-[#3E3259] p-4 sm:p-6 rounded-xl w-full max-w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/src/images/AddCard/edit-card.png"
              alt="Edit Card"
              className="mb-4 w-32 sm:w-42"
            />

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Edit title of the card"
              className="w-full mb-4 px-3 py-2 rounded bg-[#2E2442] text-white outline-none"
              style={cormorant}
            />

            <div className="rounded-xl h-40 sm:h-64 flex items-center justify-center overflow-hidden mb-4">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <label
              className="w-full cursor-pointer px-4 py-3 rounded-xl bg-[#624F8C] text-white text-center block hover:bg-[#4e3d70] transition-colors duration-200"
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

            <div className="flex gap-2 mt-6 justify-end">
              <button
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                style={cormorant}
                onClick={updateCard}
              >
                Save
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
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

      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] px-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-[#3E3259] p-6 rounded-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="text-white text-center mb-4"
              style={{ ...cormorant, fontSize: "1.3rem" }}
            >
              Delete this card?
            </p>

            <div
              className="rounded-lg overflow-hidden mb-6"
              style={{ aspectRatio: "1000 / 571" }}
            >
              <img
                src={`${BACKEND_URL}/uploads/${deleteConfirm.image}`}
                alt={formatFileName(deleteConfirm.image)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                style={cormorant}
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-700 transition-colors duration-200"
                style={cormorant}
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
