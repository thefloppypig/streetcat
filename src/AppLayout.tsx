import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";

export default function AppLayout() {
    return (
        <div className='app'>
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
        </div>
    )
}