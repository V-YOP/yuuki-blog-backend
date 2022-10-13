import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { NotFoundException } from './ClientException';

@Catch(ZodError)
class ConstraintViolationExceptionHandler implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    res.json({
      statusCode: 400,
      data: exception.issues,
      message: `Parameter constraint violation! Illegal Parameters: ${exception.issues
        .map((issue) => issue.path)
        .join(', ')}`,
    });
  }
}

@Catch(NotFoundException)
class NotFoundExceptionHandler implements ExceptionFilter<NotFoundException> {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    res.json({
      statusCode: 404,
      message: exception.message,
    });
  }
}

export function customExceptionFilters(): ExceptionFilter[] {
  return [
    new ConstraintViolationExceptionHandler(),
    new NotFoundExceptionHandler(),
  ];
}
