import express  from "express";
import userroute from "./user.routes";

const router = express.Router();
const defaultRoutes = [
    {
        path:"/user" , 
        route : userroute ,     
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router ;

