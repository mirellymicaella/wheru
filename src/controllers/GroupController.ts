import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { GroupRepository } from "../repositories/GroupRepository";
import { UserRepository } from "../repositories/UserRepository";

class GroupController{

    async create(request: Request, response:Response){
        const {name,ownerId} = request.body;

        const userRepository= getCustomRepository(UserRepository);
        const userExists = await userRepository.findOne({id:ownerId}) ;
        if(!userExists)
            throw new AppError("User does not exists!");


        const groupRepository = getCustomRepository(GroupRepository);
        const groupAlreadyExists = await groupRepository.findOne({
            where:{name:name,ownerId:ownerId},
        })

        if(groupAlreadyExists)
            throw new AppError("Group's name already exists!");

        const group = groupRepository.create({
            name,ownerId
        })

        await groupRepository.save(group);

        return response.status(201).json(group);
    }

    async list(request: Request,response:Response){
        const groupRepository = getCustomRepository(GroupRepository);
        const groups =  await groupRepository.find();
        return response.status(200).json(groups);
    }

    async show(request: Request,response:Response){
        const {groupId} = request.params;

        const groupRepository = getCustomRepository(GroupRepository);
        const group =  await groupRepository.findOne({id:groupId});

        if(!group)
            throw new AppError("Group does not exists!");

        return response.status(200).json(group);
    }

    async update(request: Request,response:Response){
        const {groupId} = request.params;

        const groupRepository = getCustomRepository(GroupRepository);
        let group =  await groupRepository.findOne({id:groupId});

        if(!group)
            throw new AppError("Group does not exists!");
        
        await groupRepository.update({id:groupId}, request.body);

        group =  await groupRepository.findOne({id:groupId});

        return response.status(200).json(group);
    }

    async delete(request: Request,response:Response){
        const {groupId} = request.params;
        const groupRepository = getCustomRepository(GroupRepository);
        let group =  await groupRepository.findOne({id:groupId});

        if(!group)
            throw new AppError("Group does not exists!");
        
        await groupRepository.delete(group);

        return response.status(200).json({message:"Sucess!"});
    }

}

export {GroupController}