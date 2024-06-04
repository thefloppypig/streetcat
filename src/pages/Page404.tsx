import { Head } from "vite-react-ssg";

export function Page404() {
  return <div>
    <Head>
      <title>Page not found</title>
      <meta name='errorpage' content='true' />
      <meta name='errortype' content='404 - Not Found' />
    </Head>
    <h1>Error 404</h1>
    <div>There's nothing on this page!</div>
  </div>;
}
