function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2
        bg-[#624F8C]
        text-white
        font-semibold
        rounded-lg
        hover:bg-[#725EA1]
        transition
      "
    >
      {children}
    </button>
  );
}

export default Button;
