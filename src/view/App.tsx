
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import { Nav } from './Nav';
import Identifier from './Identifier';
import { Homepage } from './Homepage';
import { CatPage } from './CatPage';
import { HelmetProvider } from "react-helmet-async";
import { Page404 } from './Page404';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/:f',
        element: <Feeder />,
      },
      {
        path: '/:f/:c',
        element: <CatPageRoute />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ]
  }
]);

function AppLayout() {
  return (
    <>
      <ScrollRestoration getKey={(location) => {
        return location.pathname;
      }} />
      <Nav />
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}


function App() {

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  )
}

function Feeder() {
  const { f } = useParams();
  if (f) {
    return <Identifier feeder={f} />
  }
  else return <Page404 />;
}

function CatPageRoute() {
  const { f, c } = useParams();
  if (f && c) {
    return <CatPage feeder={f} cat={c} />
  }
  else return <Page404 />;
}

export default App
