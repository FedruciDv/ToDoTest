import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { ResponseDTO } from "../dto/response.dto";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx= host.switchToHttp();
        const response=ctx.getResponse<Response>(); 
        const code=exception?.getStatus()||500;   
        const responseBody=exception.getResponse();
        response.status(code).json(ResponseDTO.error(responseBody.message || "Something went wrong"))
        
    }

    
}   