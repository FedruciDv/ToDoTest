import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CompleteToDoDTO } from './dto/complete-todo.dto';
import { DeleteToDoDTO } from './dto/delete-todo';

@Controller('todos')
export class ToDoController {
  constructor(private readonly ToDoService: ToDoService) {}

  @Get()
  async getAll() {
    try {
      const todo = await this.ToDoService.findAll();
      return new ResponseDTO(todo);
    } catch (error) {
      throw new HttpException(
        ResponseDTO.error('Error retrieving todo items'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create')
  async createToDoItem(@Body() createToDoDTO: CreateToDoDTO) {
    try {
      
        const result = await this.ToDoService.createToDo(createToDoDTO);
      return new ResponseDTO({ result });
    } catch (error) {
      throw new HttpException(
      
        ResponseDTO.error('Unexpected error during creation'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/delete')
  async deleteToDoItem(@Body() deleteToDoDto: DeleteToDoDTO) {
    try {
      const result = await this.ToDoService.removeToDo(deleteToDoDto);
      return new ResponseDTO({ result });
    } catch (error) {

      throw new HttpException(
        ResponseDTO.error('Unexpected error during deletion'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/complete')
  async completeToDoItem(@Body() completeToDoDTO: CompleteToDoDTO) {
    try {

      const result = await this.ToDoService.completeToDo(completeToDoDTO);
      return new ResponseDTO({ result });

    } catch (error) {
      throw new HttpException(
        ResponseDTO.error('Unexpected error during completion'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
