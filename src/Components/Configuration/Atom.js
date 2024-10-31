import { atom } from "recoil";

export const isDarkMode = atom({
  key: "isDarkMode",   
  default: null        
});

export const ShowMobileNav = atom({
  key: "ShowMobileNav",   
  default: false        
});

export const CurrentPage = atom({
  key: "CurrentPage",
  default: null,
});


export const HomeTrending = atom({
  key: "HomeTrending",
  default: null,
});

export const HomeLatestState = atom({
  key: "HomeLatest",
  default: null,
});

export const LatestNewsState = atom({
  key: "LatestNews",
  default: null,
});


export const RandomNewsState = atom({
  key: "RandomNewsState",
  default: null,
});
