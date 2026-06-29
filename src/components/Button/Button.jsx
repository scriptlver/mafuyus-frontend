function Button({ children, onClick, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: "Cormorant", fontWeight: "800", ...style }}
      className={`
  px-4 py-2
  bg-[#624F8C]
  text-white
  rounded-lg
  hover:bg-[#4e3d70]
  transition-colors duration-200
  ${className}
`}
    >
      {children}
    </button>
  );
}

export default Button;
