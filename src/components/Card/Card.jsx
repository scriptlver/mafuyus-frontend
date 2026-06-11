function Card({ image, title }) {
  return (
    <div className="overflow-hidden rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover hover:scale-105 transition duration-300"
      />
    </div>
  );
}

export default Card;
