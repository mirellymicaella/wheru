import { Router } from 'express';
import { GroupController } from './controllers/GroupController';
import { UserGroupController } from './controllers/UserGroupController';
import {UserController} from './controllers/UserController';

const router = Router();

const userController = new UserController();
const groupController = new GroupController();
const userGroupController = new UserGroupController();

router.post("/users",userController.create); 
router.get("/users",userController.list); 
router.get("/users/:userId",userController.show);
router.put("/users/:userId",userController.update);
router.delete("/users/:userId",userController.delete);

router.post("/groups",groupController.create);
router.get("/groups",groupController.list);
router.get("/groups/:groupId",groupController.show);
router.put("/groups/:groupId",groupController.update);
router.delete("/groups/:groupId",groupController.delete);

router.post("/join",userGroupController.join);
router.delete("/exit",userGroupController.exit);

router.get("/groups/users/:groupId",userGroupController.users);
router.get("/users/groups/:userId",userGroupController.groups);
router.put("/users/groups/:userId",userGroupController.visibity);
router.get("/users_groups",userGroupController.list);



export {router};