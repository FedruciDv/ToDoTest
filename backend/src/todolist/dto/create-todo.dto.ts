import { IsString,IsNotEmpty } from "class-validator"
export class CreateToDoDTO{
    @IsString()
    @IsNotEmpty()
    title: string
}   