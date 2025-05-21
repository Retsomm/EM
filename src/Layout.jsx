import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Hamburger,
  Rocket,
  BookMarked,
  Users,
  Newspaper,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import { useAuth } from "./contexts/AuthContext";
import ToTop from "./component/ToTop";
import { useTheme } from "./contexts/ThemeContext";
import { ToggleLeft, ToggleRight } from "lucide-react";

export default function Layout() {
  const [isPicVisible, setIsPicVisible] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { user, loginType } = useAuth();
  const navigate = useNavigate();
  //開關馬斯克跟火星
  const togglePic = () => {
    setIsPicVisible((prev) => !prev); // 切換顯示/隱藏狀態
  };
  //開關漢堡選單
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  let avatarSrc = "/defaultMemberPic.webp";
  if (user?.photoURL) {
    avatarSrc = user.photoURL;
  } else if (user?.email?.endsWith("@gmail.com")) {
    avatarSrc = `https://www.google.com/s2/photos/profile/${user.email}`;
  }
  return (
    <div>
      <div
        className={`hamLists z-999 mt-15 fixed top-0 left-0 right-0 p-2 px-1 flex align-middle justify-between shadow-2xl 
      ${isNavOpen ? "max-h-fit" : "hidden"}
      `}
      >
        <ul className={`hamList ${isNavOpen ? true : false}`}>
          <li>
            <Link to="/company" className="navLink" onClick={toggleNav}>
              <Rocket className="w-12 h-12 mr-3 hover:scale-105 text-blue-600" />
              公司
            </Link>
          </li>
          <li>
            <Link to="/life" className="navLink" onClick={toggleNav}>
              <BookMarked className="w-12 h-12 mr-3 hover:scale-105 text-green-600" />
              生平
            </Link>
          </li>
          <li>
            <Link to="/news" className="navLink" onClick={toggleNav}>
              <Newspaper className="w-12 h-12 mr-3 hover:scale-105 text-purple-600" />
              新聞
            </Link>
          </li>
          <li>
            <Link to="/info" className="navLink" onClick={toggleNav}>
              <Users className="w-12 h-12 mr-3 hover:scale-105 text-red-600" />
              更多消息
            </Link>
          </li>

          <li>
            {user ? (
              <button
                className="navLink p-0 border-none bg-transparent"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => navigate("/member")}
              >
                <img
                  src={avatarSrc}
                  alt="會員頭像"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  onClick={toggleNav}
                  onError={(e) => (e.target.src = "/avatar.webp")}
                />
                <p className="">會員資料</p>
              </button>
            ) : (
              <Link to="/login" className="navLink" onClick={toggleNav}>
                登入
              </Link>
            )}
          </li>
          <li>
            <button
              className="ml-4 p-2 rounded-full "
              onClick={() => {
                toggleTheme();
                toggleNav();
              }}
              aria-label="切換深淺色"
              type="button"
            >
              {isDark ? (
                <ToggleRight className="w-7 h-7 text-yellow-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-400" />
              )}
            </button>
          </li>
        </ul>
      </div>
      <nav className="fixed top-0 left-0 right-0 nav p-2 px-10 flex align-middle justify-between shadow-2xl z-1000">
        <div className="ham md:hidden left-5 absolute rounded-full p-2">
          <Hamburger
            className="hamburger text-white dark:text-black cursor-pointer"
            onClick={toggleNav}
          />
        </div>
        <div className="logo">
          <Link to="/" className="navLink flex text-center">
            <img
              src="/logo.webp"
              className="max-w-md"
              alt="Elon Musk 首頁連結"
            />
          </Link>
        </div>
        <ul className="flex justify-evenly max-md:hidden items-center">
          <li>
            <Link to="/company" className="navLink">
              公司
            </Link>
          </li>
          <li>
            <Link to="/life" className="navLink">
              生平
            </Link>
          </li>
          <li>
            <Link to="/news" className="navLink">
              新聞
            </Link>
          </li>
          <li>
            <Link to="/info" className="navLink">
              更多消息
            </Link>
          </li>

          <li>
            {user ? (
              <button
                className="navLink p-0 border-none bg-transparent"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => navigate("/member")}
              >
                <img
                  src={avatarSrc}
                  alt="會員頭像"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  onError={(e) => (e.target.src = "/avatar.webp")}
                />
              </button>
            ) : (
              <Link to="/login" className="navLink">
                登入
              </Link>
            )}
          </li>
          <li>
            <button
              className="ml-4 p-2 rounded-full "
              onClick={toggleTheme}
              aria-label="切換深淺色"
              type="button"
            >
              {isDark ? (
                <ToggleRight className="w-7 h-7 text-yellow-400" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-400" />
              )}
            </button>
          </li>
        </ul>
      </nav>
      <div className="accordion mt-16 flex flex-col items-center justify-center h-fit">
        <div
          className="cursor-pointer dark:text-white text-black p-3 text-center font-bold"
          onClick={togglePic}
        >
          {isPicVisible ? <ChevronsUp /> : <ChevronsDown />}
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 flex flex-col items-center justify-center ${
            isPicVisible ? "max-h-screen" : "max-h-0"
          }`}
        >
          <img
            src="/banner.webp"
            alt=""
            className="w-full max-w-screen-lg h-auto"
          />
          <button
            type="button"
            className="focus:outline-none text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-fit"
          >
            OCCUPY MARS
          </button>
          <div className="rocket hidden">
            <Rocket />
          </div>
        </div>
      </div>

      <main className="min-h-screen flex flex-col justify-center">
        <Outlet />
      </main>

      <footer>
        <div className="accordion flex flex-col items-center justify-center h-fit">
          <div
            className="cursor-pointer text-black dark:text-white p-3 text-center font-bold"
            onClick={togglePic}
          >
            {isPicVisible ? <ChevronsUp /> : <ChevronsDown />}
          </div>
          <div
            className={`overflow-hidden transition-all duration-700 ${
              isPicVisible ? "max-h-screen" : "max-h-0"
            }`}
          >
            <img
              src="/mars.webp"
              alt=""
              className="w-full max-w-screen-lg h-auto"
            />
          </div>
        </div>
      </footer>
      <div className="contact h-15 flex justify-center items-center p-5">
        If there is any infringement, please email to 112182ssss@gmail.com
      </div>
      <ToTop />
    </div>
  );
}
