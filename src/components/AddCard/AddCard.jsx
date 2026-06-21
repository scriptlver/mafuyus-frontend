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
          Add Cards
        </h2>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">
            Images of the Cards
          </label>

          <div
  className="
    w-full
    rounded-2xl
    bg-[#2E2442]
    p-3
    mb-4
  "
>
  {files.length > 0 ? (
    <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
      {files.map((file, index) => (
        <div
          key={index}
          className="
            flex
            items-center
            justify-between
            bg-[#4B3A6D]
            rounded-xl
            px-4
            py-3
          "
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <ImageIcon
              size={22}
              className="text-[#C9B2FF] shrink-0"
            />

            <span className="text-white truncate">
              {file.name}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const updated = files.filter((_, i) => i !== index);

              setFiles(updated);

              setPreviews(
                updated.map((f) =>
                  URL.createObjectURL(f)
                )
              );
            }}
            className="
              text-red-300
              hover:text-red-200
              text-sm
            "
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="h-[120px] flex flex-col items-center justify-center gap-2">
      <ImageIcon
        size={40}
        className="text-[#8B74B8]"
      />

      <span className="text-gray-300">
        No images selected
      </span>
    </div>
  )}
</div>
          <label className="w-full cursor-pointer px-4 py-3 rounded-xl bg-[#624F8C] text-white font-semibold text-center block">
            Choose images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <p className="text-gray-300 text-sm mt-2">
              {files.length} image{files.length > 1 ? "s" : ""} selected
              {files.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-[#624F8C] text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
