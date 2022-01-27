import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from "yup";

class UserController{
    async create(request: Request,response:Response){
        const {name,latitude,longitude, deviceName,token} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Name is required."),
            latitude: yup.number().required("Latitude is required."),
            longitude: yup.number().required("Longitude is required."),
            deviceName: yup.string().required("Device name is required."),
            token: yup.string().required("Token is required."),
        });

        try {
            await schema.validate(request.body, {abortEarly:false})
        } catch (error) {
            throw new AppError(error);
        }

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            token
        });

        if(userAlreadyExists)
            throw new AppError("User already exists!");


        const user = userRepository.create({
            name,latitude,longitude,deviceName, token
        })

        await userRepository.save(user);

        return response.status(201).json(user);
    }  

    async list(request: Request,response:Response){
        const userRepository = getCustomRepository(UserRepository);
        const users =  await userRepository.find();
        return response.json(users);
    }

    async show(request: Request,response:Response){
        const {userId }= request.params;
        
        const userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({id:userId});

        if(!user)
            throw new AppError("User does not exists!");


        return response.status(200).json(user);
    }

    async update(request:Request, response:Response){
        const {userId }= request.params;
        
        const userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({id:userId});

        if(!user)
            throw new AppError("User does not exists!");

        
        userRepository.update({id:userId},request.body);

        user = await userRepository.findOne({id:userId});
        return response.status(200).json(user);
    }

    async delete(request:Request,response:Response){
        const {userId }= request.params;
        
        const userRepository = getCustomRepository(UserRepository);
        let user = await userRepository.findOne({id:userId});

        if(!user)
            throw new AppError("User does not exists!");


        await userRepository.remove(user);
        return response.status(200).json({message:"Sucess!"});
    }

}

export { UserController };
