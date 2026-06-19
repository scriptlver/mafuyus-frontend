import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { api } from "../../services/api";

function AddCard({ onClose, onCardAdded }) {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setPreviews(selectedFiles.map((f) => URL.createObjectURL(f)));
    }
  };

  const handleSave = async () => {
    if (files.length === 0) {
      alert("Selecione ao menos uma imagem");
      return;
    }
    try {
      await Promise.all(
        files.map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return api.post("/cards", formData);
        }),
      );
      onCardAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cards:", error);
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
          Adicionar Cards
        </h2>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Imagens dos Cards
          </label>

          <div className="w-full h-48 border-2 border-dashed border-[#624F8C] rounded-xl flex items-center justify-center mb-4 overflow-hidden">
            {previews.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto p-2 w-full h-full">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="h-full object-contain rounded"
                  />
                ))}
              </div>
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
                  Escolha as imagens
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="
              w-full text-sm text-white
              file:mr-4 file:px-4 file:py-2
              file:rounded-xl file:border-0
              file:bg-[#624F8C] file:text-white
              file:font-semibold
            "
          />

          {files.length > 0 && (
            <p className="text-gray-300 text-sm mt-2">
              {files.length} imagem{files.length > 1 ? "s" : ""} selecionada
              {files.length > 1 ? "s" : ""}
            </p>
          )}
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
