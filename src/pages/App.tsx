
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { HelmetProvider } from "react-helmet-async";
import { Page404 } from './Page404';
import { Suspense, lazy } from 'react';
import About from './About';
import CatPage from './CatPage';
import Homepage from './Homepage';
import Identifier from './Identifier';
import FeederListView from './FeederList';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ImageViewer from './ImageViewer';

// const About = lazy(() => import('./About'));
// const Homepage = lazy(() => import('./Homepage'));
// const Identifier = lazy(() => import('./Identifier'));
// const CatPage = lazy(() => import('./CatPage'));
const Tools = lazy(() => import('./Tools'));
const ToolFindCst = lazy(() => import('./ToolFindCst'));

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
        path: `/image`,
        element: <ImageViewer />
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
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
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

export default App
