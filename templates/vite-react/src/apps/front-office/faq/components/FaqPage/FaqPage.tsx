import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";
import { preload } from "@mongez/react-utils";
import { faqAtom } from "../../atom/faqAtom";
import { getFAQ } from "../../services/services";
import FaqContent from "./FaqContent";
import { FaqWrapper, MainTitle } from "./style";

function FaqPageContent() {
  return (
    <>
      <Helmet title={trans("faq")} />
      <>
        <FaqWrapper>
          <MainTitle>{trans("faq")}</MainTitle>
          <FaqContent />
        </FaqWrapper>
      </>
    </>
  );
}

const FaqPage = preload(FaqPageContent, getFAQ, {
  onSuccess: response => {
    faqAtom.update(response.data.records);
  },
});

export default FaqPage;
