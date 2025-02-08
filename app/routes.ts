/** @format */

import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    route("/f/:folderId", "./routes/home.tsx"),
    route("/dev", "./routes/dev.tsx"),
] satisfies RouteConfig;
