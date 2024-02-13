import { preload } from "@mongez/react-utils";
import { pageAtom } from "../../atoms";
import { getPage } from "../../services/informative-pages-service";
import Page from "../Page";
function InformativePageContent() {
    const page = pageAtom.useValue();
    return (<>
      <Page page={page}/>
    </>);
}
const InformativePage = preload(InformativePageContent, ({ params, name }) => getPage(name || params.name), {
    onSuccess: response => {
        pageAtom.update(response.data.record);
    },
});
export default InformativePage;
