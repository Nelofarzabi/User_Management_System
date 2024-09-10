import { Request, Response } from 'express';
import { ICreateUser } from '../interfaces/user.interface';
import {sequelize} from '../config/database';
import { Permission, Role, RolePermission, User, UserRole } from '../models';

 class UserController {

  addUser = async (req: Request, res: Response) => {
    try {
      console.log('Request Body:', req.body); // Add this line
      const { email, password, first_name, last_name } = req.body;
      const user = new User({ email, first_name, last_name });
      await user.setPassword(password);
      const result = await user.save();
      res.status(201).json({ message: 'User registered successfully', user: result });
    } catch (error) {
      console.error('Error creating user:', error); // Log the error details

      res.status(500).send('Server Error');
    }
  }
  
   login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).send('User not exist');
      }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(401).send('User not exist');
      }
      const token = await user.generateAuthToken();
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const users = await User.getAllUser(); 
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isDeleted = await User.deleteUserById(parseInt(id));
      if (isDeleted) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }


  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedData = req.body as Partial<ICreateUser>;
      const updatedUser = await User.updateUserById(parseInt(id), updatedData);
      if (updatedUser) {
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }


  assignRole = async (req: Request, res: Response) => {
    try {
      const { userId, roleId } = req.body;
      await UserRole.create({ user_id: userId, role_id: roleId });
      res.status(200).json({ message: "Role assigned successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  };


  getUsersWithRoles = async (req: Request, res: Response) => {
    try {
      const usersWithRoles = await User.scope('withRoles').findAll();
      res.status(200).json(usersWithRoles);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };


  getRolesWithPermissions = async (req: Request, res: Response) => {
    try {
      const rolesWithPermissions = await Role.scope('withPermissions').findAll();
      res.status(200).json(rolesWithPermissions);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }

}

const usercontroller : UserController = new  UserController() ;
export default usercontroller ;


























  // login = async (req: Request, res: Response) => {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await User.findOne({ where: { email } });
  //     if (!user || !(await user.validatePassword(password))) {
  //       return res.status(401).send('User not exist');
  //     }
  //     const token = await user.generateAuthToken();
  //     res.json({ token });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send('Server Error');
  //   }
  // }