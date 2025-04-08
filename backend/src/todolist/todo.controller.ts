import {Body, Controller,Delete,Get, HttpException, HttpStatus, Param, Post, Query} from "@nestjs/common";
import {ToDoService} from "./todo.service";
import { CreateToDoDTO } from "./dto/create-todo.dto";
import { ResponseDTO } from "src/common/dto/response.dto";
import { CompleteToDoDTO } from "./dto/complete-todo.dto";
import { DeleteToDoDTO } from "./dto/delete-todo";
@Controller("todos")
export class ToDoController{
    constructor(private readonly ToDoService : ToDoService){
    }
    @Get()
    async getAll(){
        const todo=await this.ToDoService.findAll();
        return new ResponseDTO(todo)
    }
    @Post("/create")
    async createToDoItem(@Body() createToDoDTO:  CreateToDoDTO){
        try{
            const create= await this.ToDoService.createToDo(createToDoDTO);
            return new ResponseDTO({create})
        }catch(error){
            console.log(error);
            
            throw new HttpException(
                ResponseDTO.error("error creating todo item"),
                HttpStatus.UNAUTHORIZED
            )
        }

    }    
    
    @Post("/delete")
    async deleteToDoItem(@Body() deleteToDoDto:  DeleteToDoDTO){
        try{
            return this.ToDoService.removeToDo(deleteToDoDto);
        }catch(error){
            throw new HttpException(
                ResponseDTO.error("error deleting todo item"),
                HttpStatus.UNAUTHORIZED
            )
        }

    }

    @Post("/complete")
    async completeToDoItem(@Body() completeToDoDTO:  CompleteToDoDTO){
        try{
            const create= await this.ToDoService.completeToDo(completeToDoDTO);
            return new ResponseDTO({create})
        }catch(error){
            throw new HttpException(
                ResponseDTO.error("error during completing todo item"),
                HttpStatus.UNAUTHORIZED
            )
        }

    }   

}