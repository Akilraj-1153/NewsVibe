import { useNavigate, Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link'

export const NavButton = ({ isDarkTheme, ButtonName, page, setPage, setMobileNav, path }) => {
  const handleSideNavBtn = () => {
    setPage(ButtonName);
    setMobileNav(false);
  };

  const isActive = page === ButtonName;
  const activeStyle = isDarkTheme ? "bg-white text-black transition-colors duration-500" : "bg-[#121212] text-white transition-colors duration-500";
  const baseStyle = "w-full p-2 rounded text-start font-mate";

  return (
    <Link
      to={path}
      onClick={handleSideNavBtn}
      className={`${baseStyle} ${isActive ? activeStyle : ""}`}
    >
      {ButtonName}
    </Link>
  );
};

export const CategoryButton = ({ isDarkTheme, ButtonName, page, setPage, setMobileNav }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    setPage(ButtonName);
    setMobileNav(false);
    navigate(`/category/${ButtonName}`);
  };

  const isActive = page === ButtonName;
  const activeStyle = isDarkTheme ? "bg-white text-black transition-colors duration-500" : "bg-[#121212] text-white transition-colors duration-500";
  const baseStyle = "w-full p-2 rounded text-start font-mate";

  return (
    <button
      onClick={handleCategoryClick}
      className={`${baseStyle} ${isActive ? activeStyle : ""}`}
    >
      {ButtonName}
    </button>
  );
};


export const LinkButton = ({ isDarkTheme, ButtonName, link }) => {

  const activeStyle = isDarkTheme ? "bg-white text-black transition-colors duration-500" : "bg-[#121212] text-white transition-colors duration-500";
  const baseStyle = "w-full font-bold p-2 rounded text-center font-mate";

  return (
    <ExternalLink
      href={link}
      className={`${baseStyle} ${activeStyle}`}
    >
      {ButtonName}
    </ExternalLink >
  );
};
