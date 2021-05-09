import { catchError, filter, map, mapTo } from 'rxjs/operators';
import { MonoTypeOperatorFunction, of, OperatorFunction, throwError } from 'rxjs';
import { Message, MessageTypeEnum } from '../models/messages';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedData } from '../models/paginated-data';

export interface ResponseLike<T> {
  data: T;
}

export const toResponseData = <T>() =>
  map((response: ResponseLike<T>) => {
    return response.data;
  });

export const mapToPaginatedData = <T>(
  arrayMapFn: (value: any, index: number, array: any[]) => T
): OperatorFunction<PaginatedData<unknown>, PaginatedData<T>> =>
  map((response: PaginatedData<unknown>) => {
    const { paging, data } = response;
    return {
      paging,
      data: data.map<T>(arrayMapFn)
    };
  });

export const mapToMessage = <T>(
  message: string,
  title = 'Success',
  type = MessageTypeEnum.SUCCESS
): OperatorFunction<T, Message> =>
  mapTo({
    type,
    title,
    message
  });

export const catchErrorAndMapToMessage = <T>(
  message: string,
  title = 'Error',
  type = MessageTypeEnum.ERROR
): OperatorFunction<T, T | Message> =>
  catchError(() =>
    of({
      type,
      title,
      message
    })
  );

export const filterByLenderId = <T extends { lenderId: string }>(lenderId: string): MonoTypeOperatorFunction<T> =>
  filter<T>(val => {
    return val.lenderId === lenderId;
  });

export type NonThrowingErrorHandler<T> = (error: HttpErrorResponse) => T;
export const catch404 = <T>(handler: NonThrowingErrorHandler<T>): OperatorFunction<T, T | never> =>
  catchError((error: HttpErrorResponse) => {
    if (error.status === 404) {
      return of(handler(error));
    }
    return throwError(error);
  });
