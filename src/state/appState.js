import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: false,
});

export const searchQueryState = atom({
  key: "searchQueryState",
  default: [
    {
      Title: "",
      Year: "",
      imdbID: "",
      Type: "",
      Poster:
        "",
    }
  ]
});