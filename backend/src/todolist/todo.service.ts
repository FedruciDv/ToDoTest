import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
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
            return await this.prisma.toDoList.findMany();
        
        
    }
    async createToDo(createToDo : CreateToDoDTO){
            const res=await this.prisma.toDoList.create({
                data:{
                    title:createToDo.title
                }

            });

            return res
       
        
    }
    async removeToDo(deleteToDo : DeleteToDoDTO){

            const res= await this.prisma.toDoList.delete({
                where:{
                    id:deleteToDo.id
                }
            });

            return res
        
    }
    async completeToDo(completeToDo : CompleteToDoDTO){

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
}