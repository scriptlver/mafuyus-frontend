import { useNavigate } from "react-router-dom";
import stars from "../../images/layout/stars.png";
import stars1 from "../../images/layout/star-1.png";
import stars2 from "../../images/layout/star-2.png";
import mafuyuTitle from "../../images/layout/mafuyu-title.png";
import AsahinaTitle from "../../images/layout/asahina-title.png";
import mafuyu from "../../images/layout/mafuyu.png";
import dress from "../../images/layout/dress.png";
import sticker from "../../images/layout/sticker.png";

function Layout() {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex flex-col justify-between relative overflow-hidden"
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
        style={{ height: "100vh", width: "auto", bottom: 0, left: 0 }}
        className="absolute pointer-events-none"
      />

      <img
        src={mafuyuTitle}
        alt=""
        style={{
          width: "30vw",
          height: "auto",
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
          height: "auto",
          bottom: "33vh",
          left: "48vw",
        }}
        className="absolute pointer-events-none"
      />

      <button
        onClick={() => navigate("/cardslist")}
        style={{
          bottom: "20vh",
          left: "61vw",
          backgroundColor: "#ff74ff",
          fontFamily: "'Cormorant Garamond', serif",
        }}
        className="absolute text-white px-8 py-2 rounded-lg cursor-pointer shadow-lg text-xl"
      >
        Click here
      </button>

      <img
        src={dress}
        alt=""
        style={{ height: "94vh", width: "auto", bottom: 74, right: 0 }}
        className="absolute pointer-events-none"
      />

      <img
        src={sticker}
        alt=""
        style={{ height: "32vh", width: "auto", bottom: "12vh", left: "80vw" }}
        className="absolute pointer-events-none"
      />

      <div className="px-8 pb-6">
        <img src={stars} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Layout;