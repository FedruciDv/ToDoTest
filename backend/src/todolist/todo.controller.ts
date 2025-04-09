import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDTO } from './dto/create-todo.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CompleteToDoDTO } from './dto/complete-todo.dto';
import { DeleteToDoDTO } from './dto/delete-todo';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/guard';

@Roles(["user"])
@Controller('todos')
export class ToDoController {
  constructor(private readonly ToDoService: ToDoService) {}

  @Get()

  async getAll() {
    try {
      const todo = await this.ToDoService.findAll();
      return new ResponseDTO(todo);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error during completion',
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Post('/create')
  @Roles(["admin"])

  async createToDoItem(@Body() createToDoDTO: CreateToDoDTO) {
    try {
      
      const result = await this.ToDoService.createToDo(createToDoDTO);
      return new ResponseDTO({ result });
    } catch (error) {
      
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error during completion',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/delete')
  @Roles(["admin"])

  async deleteToDoItem(@Body() deleteToDoDto: DeleteToDoDTO) {
    try {
      const result = await this.ToDoService.removeToDo(deleteToDoDto);
      return new ResponseDTO({ result });
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error during deletion',
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Post('/complete')
  @Roles(["admin"])

  async completeToDoItem(@Body() completeToDoDTO: CompleteToDoDTO) {
    try {

      const result = await this.ToDoService.completeToDo(completeToDoDTO);
      return new ResponseDTO({ result });

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error during completion',
      }, HttpStatus.FORBIDDEN);
    }
  }
}
