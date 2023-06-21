import { trans } from "@mongez/localization";
import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet title={trans("home")} appendAppName={false} />
    </>
  );
}
