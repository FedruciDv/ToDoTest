import { IsInt, IsNotEmpty } from "class-validator";

export class CompleteToDoDTO{
    @IsNotEmpty()
    @IsInt()
    id: number
}