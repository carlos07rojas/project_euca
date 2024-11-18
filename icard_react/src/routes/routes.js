import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import { error404 } from "../pages";
import { BasicLayout } from "../layouts";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    layout: BasicLayout,
    component: error404,
  },
];

export default routes;
