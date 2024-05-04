
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { HelmetProvider } from "react-helmet-async";
import { Page404 } from './Page404';
import { Suspense } from 'react';
import About from './About';
import CatPage from './CatPage';
import Homepage from './Homepage';
import Identifier from './Identifier';
import FeederListView from './FeederList';
import { ToolFindCst } from './ToolFindCst';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Tools } from './Tools';

// const About = lazy(() => import('./About'));
// const Homepage = lazy(() => import('./Homepage'));
// const Identifier = lazy(() => import('./Identifier'));
// const CatPage = lazy(() => import('./CatPage'));

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
        path: `/list`,
        element: <FeederListView />
      },
      {
        path: `/tools`,
        element: <Tools />
      },
      {
        path: `/tools/checker`,
        element: <ToolFindCst />
      },
      {
        path: '/:f',
        element: <Identifier />,
      },
      {
        path: '/:f/:c',
        element: <CatPage />,
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
      <Tooltip id="tooltip" />
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
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
    </>
  )
}

export default App
