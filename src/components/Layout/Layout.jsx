import stars from "../../images/layout/stars.png";

function Layout() {
  return (
    <div
      className="w-screen min-h-screen flex flex-col justify-between"
      style={{ backgroundColor: "#3E3259" }}
    >
      <div className="px-8 pt-6">
        <img src={stars} alt="" className="w-full" />
      </div>
      <div className="px-8 pb-6">
        <img src={stars} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default Layout;