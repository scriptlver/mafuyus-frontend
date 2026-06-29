import { useState } from "react";
import { api } from "../../services/api";

const cormorant = { fontFamily: "Cormorant", fontWeight: "600" };

function AddCard({ onClose, onCardAdded, card }) {
  const [title] = useState(card?.title || "");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSave = async () => {
    try {
      if (card) {
        const formData = new FormData();

        if (files[0]) {
          formData.append("image", files[0]);
        }

        await api.put(`/cards/${card.id}`, formData);
      } else {
        if (files.length === 0) {
          alert("Selecione ao menos uma imagem");
          return;
        }

        await Promise.all(
          files.map((file) => {
            const formData = new FormData();

            formData.append("image", file);

            return api.post("/cards", formData);
          }),
        );
      }

      onCardAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar card:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="w-full max-w-xs sm:max-w-md mx-4 rounded-2xl p-4 sm:p-6"
        style={{ backgroundColor: "#3E3259" }}
      >
        {card ? (
          <h2
            className="text-white text-4xl font-semibold mb-6"
            style={cormorant}
          >
            Edit Card
          </h2>
        ) : (
          <img
            src="/src/images/AddCard/add-card.png"
            alt="Add Card"
            className="mb-6 w-42"
          />
        )}

        <div className="mb-6">
          <label
            className="block text-white mb-2"
            style={{ ...cormorant, fontSize: "1.1rem" }}
          >
            Images of the Cards
          </label>

          <div className="w-full rounded-2xl bg-[#2E2442] p-3 mb-4">
            {files.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#4B3A6D] rounded-xl px-4 py-2"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={previews[index]}
                        alt={file.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />

                      <span
                        className="text-white truncate"
                        style={{ ...cormorant, fontSize: "1rem" }}
                      >
                        {file.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-300 hover:text-red-500 transition-colors duration-200 flex-shrink-0"
                      style={{ ...cormorant, fontSize: "1rem" }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[120px] flex flex-col items-center justify-center gap-2">
                <span
                  className="text-gray-400"
                  style={{ ...cormorant, fontSize: "1rem" }}
                >
                  {card ? "Keep current image" : "No images selected"}
                </span>
              </div>
            )}
          </div>

          <label
            className="w-full cursor-pointer px-4 py-3 rounded-xl bg-[#624F8C] text-white text-center block hover:bg-[#3d2f5e] transition-colors duration-200"
            style={{ ...cormorant, fontSize: "1.1rem" }}
          >
            Choose images
            <input
              type="file"
              accept="image/*"
              multiple={!card}
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <p
              className="text-gray-300 mt-2"
              style={{ ...cormorant, fontSize: "0.9rem" }}
            >
              {files.length} image
              {files.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-700 transition-colors duration-200"
            style={{ ...cormorant, fontSize: "1.1rem" }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[#624F8C] text-white hover:bg-[#3d2f5e] transition-colors duration-200"
            style={{ ...cormorant, fontSize: "1.1rem" }}
          >
            {card ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
