import { HTML } from "@mongez/moonlight";
import Helmet from "@mongez/react-helmet";
import { MainTitle, Text } from "./Page.styles";
export default function PageContent({ page }) {
    return (<>
      <Helmet title={page.title}/>
      <MainTitle>{page.title}</MainTitle>
      <Text>
        <HTML html={page.description}/>
      </Text>
    </>);
}
