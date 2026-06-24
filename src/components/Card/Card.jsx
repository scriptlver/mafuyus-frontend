function Card({ image, title }) {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div
        className="absolute inset-0 bg-[#3E3259]/70 flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition duration-300"
      >
       <span
  className="text-white text-sm text-center px-4"
  style={{ fontFamily: "Cormorant", fontWeight: "700" }}
>
  {title}
</span>
      </div>
    </div>
  );
}

export default Card;
