
import { HashRouter, Route, Routes, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import { Nav } from './Nav';
import Identifier from './Identifier';
import { Homepage } from './Homepage';
import { CatPage } from './CatPage';
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {

  return (
    <>
      <HelmetProvider>
        <HashRouter>
          <Helmet>
            <title>Streetcat Identifier</title>
            <meta name="title" content="Streetcat Identifier" />
            <meta name="description" content="Identify the cats on Hello Street Cat livestreams" />
          </Helmet>
          <Nav />
          <div className='main'>
            <Routes>
              <Route path='/' Component={Homepage} />
              <Route path='/:f' Component={Feeder} />
              <Route path='/:f/:c' Component={CatPageRoute} />
              <Route path='*' Component={Page404} />
            </Routes>
          </div>
          <Footer />
        </HashRouter>
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

function Page404() {
  return <div>
    <h1>Error 404</h1>
    <div>There's nothing on this page!</div>
  </div>
}

export default App
