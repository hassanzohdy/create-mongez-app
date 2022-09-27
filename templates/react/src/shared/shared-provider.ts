import router from "@mongez/react-router";
import NotFoundPage from "design-system/layouts/NotFoundPage";
import "./apps-list";
import "./config";

// define the 404 router

router.add("/404", NotFoundPage);
