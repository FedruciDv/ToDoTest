import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateToDoDTO } from "./dto/create-todo.dto";
import { title } from "process";
import {  DeleteToDoDTO } from "./dto/delete-todo";
import { ResponseDTO } from "src/common/dto/response.dto";
import { CompleteToDoDTO } from "./dto/complete-todo.dto";
@Injectable()
export class ToDoService{
    constructor(private prisma : PrismaService){
        
    }

    async findAll(){
        try{
            return await this.prisma.toDoList.findMany();
        }
        catch(error){
            throw new HttpException(
                "Error during getting todo",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        
    }
    async createToDo(createToDo : CreateToDoDTO){
        try{
            const res=await this.prisma.toDoList.create({
                data:{
                    title:createToDo.title
                }

            });

            return res
        }
        catch(error){
            throw new HttpException(
                "Error creating todo item",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        
    }
    async removeToDo(deleteToDo : DeleteToDoDTO){

        try{
            const res= await this.prisma.toDoList.delete({
                where:{
                    id:deleteToDo.id
                }

            });

            return res
        }
        catch(error){
            throw new HttpException(
                "Error deleting todo item",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
    }
        
    }
    async completeToDo(completeToDo : CompleteToDoDTO){

        try{
            const res= await this.prisma.toDoList.update({
                where:{
                    id:completeToDo.id
                },
                data:{
                    completed:true
                }

            });

            return res
        }
        catch(error){
            throw new HttpException(
                "Error deleting todo item",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
    }
        
    }
}