import { useState } from "react";
import { ImageIcon } from "lucide-react";

import { api } from "../../services/api";

function AddCard({ onClose, onCardAdded }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      await api.post("/cards", {
        image: imageUrl,
      });

      onCardAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar card:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: "#3E3259" }}
      >
        <h2
          className="text-white text-4xl font-semibold mb-6"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Adicionar Card
        </h2>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Imagem do Card
          </label>

          <div className="w-full h-48 border-2 border-dashed border-[#624F8C] rounded-xl flex items-center justify-center mb-4 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon
                  size={60}
                  className="text-[#8B74B8]"
                  strokeWidth={1.5}
                />

                <span
                  className="text-gray-300 text-lg"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  Escolha uma imagem
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
              w-full
              text-sm
              text-white
              file:mr-4
              file:px-4
              file:py-2
              file:rounded-xl
              file:border-0
              file:bg-[#624F8C]
              file:text-white
              file:font-semibold
            "
          />

        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-500 text-white"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[#624F8C] text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;import { useState } from "react";
import { ImageIcon } from "lucide-react";

import { api } from "../../services/api";

function AddCard({ onClose, onCardAdded }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async () => {
    try {
      if (!file) {
        alert("Selecione uma imagem");
        return;
      }

      const formData = new FormData();

      formData.append("image", file);

      await api.post("/cards", formData);

      onCardAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar card:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: "#3E3259" }}
      >
        <h2
          className="text-white text-4xl font-semibold mb-6"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Adicionar Card
        </h2>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Imagem do Card
          </label>

          <div className="w-full h-48 border-2 border-dashed border-[#624F8C] rounded-xl flex items-center justify-center mb-4 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon
                  size={60}
                  className="text-[#8B74B8]"
                  strokeWidth={1.5}
                />

                <span
                  className="text-gray-300 text-lg"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  Escolha uma imagem
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
              w-full
              text-sm
              text-white
              file:mr-4
              file:px-4
              file:py-2
              file:rounded-xl
              file:border-0
              file:bg-[#624F8C]
              file:text-white
              file:font-semibold
            "
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-500 text-white"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[#624F8C] text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;