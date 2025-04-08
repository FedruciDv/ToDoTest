import { Module } from "@nestjs/common";
import {ToDoController} from "./todo.controller";
import {ToDoService} from "./todo.service";
import { PrismaService } from "src/prisma/prisma.service";
@Module({
    controllers:[ToDoController],
    providers:[ToDoService,PrismaService],
    imports:[]
})
export default class ToDoModule{};