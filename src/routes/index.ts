import express  from "express";
import userroute from "./user.routes";
import postroute from "./post.routes";
import commentroute from "./comment.routes";

const router = express.Router();
const defaultRoutes = [
    {
        path:"/user" , 
        route : userroute ,     
    },
    {
        path:"/post",
        route:postroute,
    },
    {
        path:"/comment",
        route:commentroute,
    }

]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router ;

