import { atom } from "jotai";

type renderingType = "none" | "document" | "camera";

export const titleAtom = atom("");
export const uriAtom = atom("");

export const renderingAtom = atom<renderingType, any, any>(
  "none",
  (_, set, renderNext) => {
    if (renderNext === "none") {
      set(uriAtom, "");
      set(titleAtom, "");
    }
    set(renderingAtom, renderNext);
  },
);
