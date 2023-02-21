import { HTML } from "@mongez/moonlight";
import Helmet from "@mongez/react-helmet";
import { Page } from "../../atoms";
import { MainTitle, Text } from "./Page.styles";

export default function Page({ page }: { page: Page }) {
  return (
    <>
      <Helmet title={page.title} />
      <MainTitle>{page.title}</MainTitle>
      <Text>
        <HTML html={page.description} />
      </Text>
    </>
  );
}
