
import About from "./pages/About";
import CatPage from "./pages/CatPage";
import FeederListView from "./pages/FeederList";
import Homepage from "./pages/Homepage";
import Identifier from "./pages/Identifier";
import ImageViewer from "./pages/ImageViewer";
import { Page404 } from "./pages/Page404";
import ToolFindCst from "./pages/ToolFindCst";
import ToolNotepad from "./pages/ToolNotepad";
import Tools from "./pages/Tools";
import AppLayout from "./AppLayout";
import { RouteRecord } from "vite-react-ssg";
import { fetchFeederCatList, fetchFeederData, fetchFeederList } from "./utils/fetchUtils";
import { loaderFeederList } from "./loader";

export const routes: RouteRecord[] = [
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Homepage />,
                index: true,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: `/list`,
                element: <FeederListView />,
                loader: loaderFeederList,
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
            // {
            //     path: `/tools/notepad`,
            //     element: <ToolNotepad />
            // },
            {
                path: '/:f',
                element: <Identifier />,
                entry: "./pages/Identifier.tsx",
                getStaticPaths: () => ['happycanteen'],
                async loader({ params }) {
                    const feeder = params.f!;
                    const pFeeder = fetchFeederData(feeder)
                    const pCats = fetchFeederCatList(feeder)

                    const [feederData, catDataList] = await Promise.all([pFeeder, pCats]);

                    return {
                        feederData,
                        catDataList
                    }
                }
            },
            // {
            //     path: '/:f/:c',
            //     element: <CatPage />,
            // },
            // {
            //     path: '*',
            //     element: <Page404 />,
            // },
        ]
    }
]