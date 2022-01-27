import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UserGroup } from "../models/UserGroup";
import { GroupRepository } from "../repositories/GroupRepository";
import { UserGroupRepository } from "../repositories/UserGroupRepository";
import { UserRepository } from "../repositories/UserRepository";

class UserGroupController{

    async join(request:Request, response:Response){
        const {userId, groupId} = request.body;

        const userRepository= getCustomRepository(UserRepository);
        const user = await userRepository.findOne({id:userId}) ;
        if(!user)
            throw new AppError("User does not exists!");

        const groupRepository = getCustomRepository(GroupRepository);
        const group= await groupRepository.findOne({id:groupId})
        if(!group)
            throw new AppError("Group does not exists!");


        const userGroupRepository = getCustomRepository(UserGroupRepository);
        
        const userGroupAlreadyExists = await userGroupRepository.findOne({
            where:{userId:user.id,groupId:group.id},
        });    
        
        if(userGroupAlreadyExists)
        throw new AppError("This user is already in this group!");
        
           
        let userGroup = new UserGroup();
        userGroup.group = group;
        userGroup.user=user;
        userGroup.visibility = true;
        
        await userGroupRepository.save(userGroup);

    
        return response.status(201).json(userGroup);

    }

    async exit(request:Request, response:Response){
        const {userId, groupId} = request.body;

        const userRepository= getCustomRepository(UserRepository);
        const user = await userRepository.findOne({id:userId}) ;
        if(!user)
            throw new AppError("User does not exists!");

        const groupRepository = getCustomRepository(GroupRepository);
        const group= await groupRepository.findOne({id:groupId})
        if(!group)
            throw new AppError("Group does not exists!");

        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const userGroup = await userGroupRepository.findOne({
            where:{userId:user.id,groupId:group.id},
        });    

        if(!userGroup)
            throw new AppError("This user is not in this group!");
      
        await userGroupRepository.delete(userGroup);   
        return response.status(200).json({message:"Sucess!"});

    }

    async users(request: Request,response:Response){
        const {groupId} = request.params;

        const groupRepository = getCustomRepository(GroupRepository);
        const group =  await groupRepository.findOne({id:groupId});

        if(!group)
            throw new AppError("Group does not exists!");

        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const users = await userGroupRepository.createQueryBuilder("userGroup")
        .innerJoin("users", "u")
        .where("userGroup.groupId = :id", {id: groupId})
        .getMany();


        return response.status(200).json(users);
    }

    async groups(request: Request,response:Response){
        const {userId} = request.params;

        const userRepository = getCustomRepository(UserRepository);
        const user =  await userRepository.findOne({id:userId});

        if(!user)
            throw new AppError("user does not exists!");

        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const groups = await userGroupRepository.createQueryBuilder("userGroup")
        .innerJoin("groups", "g")
        .where("userGroup.userId = :id", {id: userId})
        .getMany();


        return response.status(200).json(groups);
    }    

    async list(request: Request,response:Response){
        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const usersGroups =  await userGroupRepository.find();
        return response.status(200).json(usersGroups);
    }

    async visibity(request: Request,response:Response){
        const {userId} = request.params;
        const {groupId, visibility} = request.body;

        const userRepository= getCustomRepository(UserRepository);
        const user = await userRepository.findOne({id:userId}) ;
        if(!user)
            throw new AppError("User does not exists!");

        const groupRepository = getCustomRepository(GroupRepository);
        const group= await groupRepository.findOne({id:groupId})
        if(!group)
            throw new AppError("Group does not exists!");

        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const userGroup = await userGroupRepository.findOne({
            where:{userId:user.id,groupId:group.id},
        });    

        if(!userGroup)
            throw new AppError("This user is not in this group!");

        userGroup.visibility = visibility;
        await userGroupRepository.save(userGroup);
        
        
        return response.status(201).json(userGroup);
        
    }


}

export {UserGroupController}