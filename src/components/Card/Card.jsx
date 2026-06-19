function Card({ image, title }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg group"
      style={{ aspectRatio: "1000 / 571" }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />

      <div className="absolute inset-0 bg-[#3E3259]/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <span
          className="text-white text-sm text-center px-4 break-all"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default Card;
