import Footer from "../Footer";
import Header from "../Header";
/**
 * Base layout can be used to wrap all pages
 */
export default function BaseLayout({ children }) {
    return (<>
      <Header />
      <main>{children}</main>
      <Footer />
    </>);
}
