import { Helmet } from "react-helmet-async";

export function Page404() {
  return <div>
    <Helmet>
      <title>Page not found</title>
      <meta name='errorpage' content='true' />
      <meta name='errortype' content='404 - Not Found' />
    </Helmet>
    <h1>Error 404</h1>
    <div>There's nothing on this page!</div>
  </div>;
}
