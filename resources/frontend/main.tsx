import React from "react";
import route from "ziggy-js";
import { createRoot } from "react-dom/client";
import { InertiaProgress } from "@inertiajs/progress";
import { createInertiaApp } from "@inertiajs/inertia-react";
import spinner from "@/Assets/spinner.svg";

import "./main.scss"

route(
    undefined,
    undefined,
    undefined,
    await (await fetch("/routes")).json()
);

createInertiaApp({
    resolve: (name) => React.lazy(() => import(`./Pages/${name}`)),
    setup({ el, App, props }) {

        createRoot(el).render(
            <React.StrictMode>
                <React.Suspense fallback={
                    <div className="h-screen flex justify-center items-center">
                        <div className="flex items-center justify-center gap-2 mt-6 mb-14">
                            <img src={spinner} />
                        </div>
                    </div>}>
                    <App {...props} />
                </React.Suspense>
            </React.StrictMode>
        );
    },
});

InertiaProgress.init({
    showSpinner: true,
    color: "indigo",
});
