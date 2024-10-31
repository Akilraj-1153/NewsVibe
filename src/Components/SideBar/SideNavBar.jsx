import React from "react";
import { NavButton, CategoryButton } from "../MiniComponents/MiniComponents";
import { useRecoilState } from 'recoil';
import { isDarkMode, CurrentPage, ShowMobileNav } from '../Configuration/Atom';
import { useNavigate } from 'react-router-dom';

function SideNavBar() {
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);
  const [page, setPage] = useRecoilState(CurrentPage);
  const [MobileNav, setMobileNav] = useRecoilState(ShowMobileNav);
  const navigate = useNavigate();

  const newsCategories = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const handleSearch = (e) => {
    let query = e.target.value;
    if (e.key === 'Enter' && query.length) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="w-full p-2 flex flex-col gap-3">
      <NavButton 
        path="/" 
        isDarkTheme={isDarkTheme} 
        page={page} 
        setPage={setPage} 
        setMobileNav={setMobileNav} 
        ButtonName="Home" 
      />
      <NavButton 
        path="/Latest-News" 
        isDarkTheme={isDarkTheme} 
        page={page} 
        setPage={setPage} 
        setMobileNav={setMobileNav} 
        ButtonName="Latest News" 
      />

      {/* <div
        className={`flex flex-col gap-2 w-full p-2 rounded font-mate ${
          page === "Search News" 
            ? isDarkTheme 
              ? "bg-white text-black transition-colors duration-500" 
              : "bg-[#121212] text-white transition-colors duration-500"
            : ""
        }`}
      >
        <h1>Search News</h1>
        <input
          type="search"
          onClick={() => setPage("Search News")}
          onKeyDown={handleSearch}
          placeholder="Enter search query"
          className="p-2 w-full rounded-lg outline-none bg-transparent"
        />
      </div> */}

      <h1 className="font-bold text-xl font-mate">Category</h1>
      {newsCategories.map((category) => (
        <div className="ml-5" key={category}>
          <CategoryButton 
            isDarkTheme={isDarkTheme} 
            page={page} 
            setMobileNav={setMobileNav} 
            setPage={setPage} 
            ButtonName={category} 
          />
        </div>
      ))}
    </div>
  );
}

export default SideNavBar;
