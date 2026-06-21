import { useNavigate } from "react-router-dom";
import stars from "../../images/layout/stars.png";
import stars1 from "../../images/layout/star-1.png";
import stars2 from "../../images/layout/star-2.png";
import mafuyuTitle from "../../images/layout/mafuyu-title.png";
import AsahinaTitle from "../../images/layout/asahina-title.png";
import mafuyu from "../../images/layout/mafuyu.png";
import mafuyu2 from "../../images/layout/mafuyu-2.png";
import dress from "../../images/layout/dress.png";
import sticker from "../../images/layout/sticker.png";

function Layout() {
  const navigate = useNavigate();

  const hoverImage =
    "absolute transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:brightness-105 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] hover:z-30";

  const hoverTitle =
    "absolute transition-all duration-500 ease-out hover:scale-[1.05] hover:brightness-110 hover:drop-shadow-[0_0_14px_rgba(255,230,255,0.22)] hover:z-40";

  return (
    <>
      <div
        className="hidden md:flex w-screen h-screen flex-col justify-between relative overflow-hidden"
        style={{ backgroundColor: "#3E3259" }}
      >
        <div className="px-8 pt-6">
          <img src={stars} alt="" className="w-full" />
        </div>

        <img
          src={stars2}
          alt=""
          className="absolute pointer-events-none"
          style={{
            width: "11vw",
            bottom: "14vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <img
          src={stars1}
          alt=""
          className="absolute pointer-events-none"
          style={{
            width: "11vw",
            bottom: "36vh",
            left: "77%",
            transform: "translateX(-50%)",
          }}
        />

        <img
          src={mafuyu}
          alt=""
          className={hoverImage}
          style={{
            height: "100vh",
            bottom: 0,
            left: 0,
          }}
        />

        <img
          src={mafuyuTitle}
          alt=""
          className={hoverTitle}
          style={{
            width: "30vw",
            bottom: "52vh",
            left: "44vw",
          }}
        />

        <img
          src={AsahinaTitle}
          alt=""
          className={hoverTitle}
          style={{
            width: "30vw",
            bottom: "33vh",
            left: "48vw",
          }}
        />

        <span
          onClick={() => navigate("/cardslist")}
          className="
            absolute
            cursor-pointer
            text-white
            transition-all
            duration-500
            ease-out
            hover:scale-[1.05]
            hover:text-pink-200
            hover:drop-shadow-[0_0_12px_rgba(255,220,255,.45)]
          "
          style={{
            bottom: "18vh",
            left: "60vw",
            fontFamily: "'Cormorant', serif",
            fontSize: "1.8rem",
            opacity: 0.8,
            letterSpacing: "4px",
          }}
        >
          Click here
        </span>

        <span
  className="absolute"
  style={{
    bottom: "9vh",
    right: "3vw",
    fontFamily: "'Cormorant', serif",
    fontSize: "16px",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "2px",
  }}
>
  design by{" "}
  <span
    className="
      inline-block
      cursor-default
      transition-all
      duration-500
      hover:scale-[1.06]
      hover:text-pink-200
      hover:brightness-110
      hover:drop-shadow-[0_0_10px_rgba(255,220,255,.4)]
    "
  >
    lavi
  </span>
</span>

        <img
          src={dress}
          alt=""
          className="absolute pointer-events-none"
          style={{
            height: "94vh",
            bottom: 74,
            right: 0,
          }}
        />

        <img
          src={sticker}
          alt=""
          className={hoverImage}
          style={{
            height: "32vh",
            bottom: "12vh",
            left: "80vw",
          }}
        />

        <div className="px-8 pb-6">
          <img src={stars} alt="" className="w-full" />
        </div>
      </div>

      <div
        className="flex md:hidden w-screen h-screen flex-col justify-between relative overflow-hidden"
        style={{ backgroundColor: "#3E3259" }}
      >
        <div className="px-4 pt-4">
          <img src={stars} alt="" className="w-full opacity-70" />
        </div>

        <img
          src={mafuyuTitle}
          alt=""
          className={hoverTitle}
          style={{
            width: "60vw",
            top: "6%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <img
          src={AsahinaTitle}
          alt=""
          className={hoverTitle}
          style={{
            width: "62vw",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <span
          onClick={() => navigate("/cardslist")}
          className="
            absolute
            cursor-pointer
            text-white
            transition-all
            duration-500
            hover:scale-[1.05]
            hover:text-pink-200
            hover:drop-shadow-[0_0_12px_rgba(255,220,255,.45)]
          "
          style={{
            top: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Cormorant', serif",
            fontSize: "1.5rem",
            letterSpacing: "4px",
          }}
        >
          Click here
        </span>

        <img
          src={mafuyu2}
          alt=""
          className={hoverImage}
          style={{
            width: "90vw",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <span
  className="absolute"
  style={{
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: "'Cormorant', serif",
    fontSize: "15px",
    color: "rgba(255,255,255,0.45)",
  }}
>
  by{" "}
  <span
    className="
      inline-block
      transition-all
      duration-500
      hover:scale-[1.06]
      hover:text-pink-200
      hover:drop-shadow-[0_0_10px_rgba(255,220,255,.4)]
    "
  >
    lavi
  </span>
</span>

        <div className="px-4 pb-4">
          <img src={stars} alt="" className="w-full opacity-70" />
        </div>
      </div>
    </>
  );
}

export default Layout;