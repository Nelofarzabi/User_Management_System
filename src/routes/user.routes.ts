import express, { Request, Response, Router } from 'express';
import validate from "../middlewares/validate";
import { userValidations  } from '../validations';
import {userController} from "../controllers";
import usercontroller from '../controllers/userController';

const router: Router = express.Router();

router.post('/add-user', usercontroller.addUser);
router.post('/login', usercontroller.login); 
router.get('/get-user', usercontroller.getUser);
router.delete("/delete/:id", usercontroller.deleteUser);
router.put("/update/:id", validate(userValidations.updateUser), usercontroller.updateUser);
router.post("/assign-role", userController.assignRole);
router.get('/users-with-roles', userController.getUsersWithRoles);
router.get('/roles-with-permissions' , usercontroller.getRolesWithPermissions);

export default router;