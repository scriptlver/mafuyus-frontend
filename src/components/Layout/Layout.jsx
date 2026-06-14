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
          style={{
            width: "11vw",
            bottom: "14vh",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="absolute pointer-events-none"
        />

        <img
          src={stars1}
          alt=""
          style={{
            width: "11vw",
            bottom: "36vh",
            left: "77%",
            transform: "translateX(-50%)",
          }}
          className="absolute pointer-events-none"
        />

        <img
          src={mafuyu}
          alt=""
          style={{
            height: "100vh",
            width: "auto",
            bottom: 0,
            left: 0,
          }}
          className="absolute pointer-events-none"
        />

        <img
          src={mafuyuTitle}
          alt=""
          style={{
            width: "30vw",
            bottom: "52vh",
            left: "44vw",
          }}
          className="absolute pointer-events-none"
        />

        <img
          src={AsahinaTitle}
          alt=""
          style={{
            width: "30vw",
            bottom: "33vh",
            left: "48vw",
          }}
          className="absolute pointer-events-none"
        />

        <span
          onClick={() => navigate("/cardslist")}
          className="absolute cursor-pointer text-white hover:text-pink-300 transition-colors duration-300"
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
          design by lavi
        </span>

        <img
          src={dress}
          alt=""
          style={{
            height: "94vh",
            width: "auto",
            bottom: 74,
            right: 0,
          }}
          className="absolute pointer-events-none"
        />

        <img
          src={sticker}
          alt=""
          style={{
            height: "32vh",
            width: "auto",
            bottom: "12vh",
            left: "80vw",
          }}
          className="absolute pointer-events-none"
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
          src={stars2}
          alt=""
          className="absolute pointer-events-none"
          style={{
            width: "22vw",
            top: "30%",
            left: "86%",
            transform: "translateX(-50%)",
            opacity: 0.8,
          }}
        />

        <img
          src={stars1}
          alt=""
          className="absolute pointer-events-none"
          style={{
            width: "22vw",
            top: "34%",
            right: "75%",
            opacity: 0.8,
          }}
        />

        <img
          src={mafuyuTitle}
          alt=""
          className="absolute pointer-events-none"
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
          className="absolute pointer-events-none"
          style={{
            width: "62vw",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <span
          onClick={() => navigate("/cardslist")}
          className="absolute cursor-pointer text-white hover:text-pink-300 transition-colors duration-300"
          style={{
            top: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Cormorant', serif",
            fontSize: "1.5rem",
            opacity: 0.8,
            letterSpacing: "4px",
          }}
        >
          Click here
        </span>
        <img
          src={mafuyu2}
          alt=""
          className="absolute pointer-events-none"
          style={{
            width: "90vw",
            height: "auto",
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
            letterSpacing: "2px",
          }}
        >
          by lavi
        </span>

        <div className="px-4 pb-4">
          <img src={stars} alt="" className="w-full opacity-70" />
        </div>
      </div>
    </>
  );
}

export default Layout;
