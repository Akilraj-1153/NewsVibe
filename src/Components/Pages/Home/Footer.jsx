import React from 'react';
import { useRecoilState } from 'recoil';
import { CurrentPage, isDarkMode } from '../../Configuration/Atom';

function Footer() {
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);

  return (
    <footer className={`footer text-center p-4 rounded-lg w-full mx-auto transition-colors duration-500 ${isDarkTheme ? 'bg-[#121212] text-white' : 'bg-[#f9fafb] text-black'}`}>
      <p>&copy; {new Date().getFullYear()} NewsVibe. All rights reserved.</p>
      <div className="mt-5">
        <button className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-500 mx-2 transition-colors duration-300`}>
          About
        </button>
        <button className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-500 mx-2 transition-colors duration-300`}>
          Contact
        </button>
        <button className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-500 mx-2 transition-colors duration-300`}>
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}

export default Footer;
