import { atom } from "@mongez/react-atom";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const faqAtom = atom<FAQ[]>({
  key: "faq",
  default: [],
});
