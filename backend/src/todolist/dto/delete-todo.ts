import { IsInt,IsNotEmpty } from "class-validator"
export class DeleteToDoDTO{
    @IsNotEmpty()
    @IsInt()
    id: number
}