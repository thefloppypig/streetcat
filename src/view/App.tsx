
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { CatPage } from './CatPage';
import { HelmetProvider } from "react-helmet-async";
import { Page404 } from './Page404';
import { About } from './About';
import Homepage from './Homepage';
import Identifier from './Identifier';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/:f',
        element: <Identifier />,
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

function CatPageRoute() {
  const { f, c } = useParams();
  if (f && c) {
    return <CatPage feeder={f} cat={c} />
  }
  else return <Page404 />;
}

export default App
