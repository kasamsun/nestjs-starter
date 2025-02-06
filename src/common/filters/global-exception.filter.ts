import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, ForbiddenException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = (exception as any).message;
    let status = HttpStatus.BAD_REQUEST;
    let errorCode = (exception as any).errorCode;
    
    console.log(exception.constructor)
    switch (exception.constructor) {
      case AxiosError:
        status = HttpStatus.BAD_REQUEST;
        /* fiit error message */
        message = (exception as any).response?.data?.ErrorMessage;
        if (!message) {
          message = (exception as any).code;
        }
        break;
      case BaseException:
        status = HttpStatus.BAD_REQUEST;
        break;
      case BadRequestException:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as any).response.message
        break;
      case UnauthorizedException:
        status = HttpStatus.UNAUTHORIZED;
        break;
      case ForbiddenException:
        status = HttpStatus.FORBIDDEN;        
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      // case I18nValidationException:
      //   status = HttpStatus.BAD_REQUEST;
      //   console.log(exception);
      //   message = (exception as I18nValidationException).errors.map(err=>err.constraints);
      //   break;
      default:
        status = HttpStatus.BAD_REQUEST;
    }

    response
      .status(status)
      .json({
        status_code: status,
        error_code: (errorCode)?errorCode:undefined,
        message: message,
      });
  }
}
