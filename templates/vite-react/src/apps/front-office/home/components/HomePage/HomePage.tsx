import Helmet from "@mongez/react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet title="home" appendAppName={false} />
      <h1>Hello, Home</h1>
    </>
  );
}
