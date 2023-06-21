import { atom } from "@mongez/react-atom";

export type Page = {
  id: number;
  slug: string;
  title: string;
  name: string;
  description: string;
};

export const pageAtom = atom<Page>({
  key: "page",
  default: {} as Page,
});
