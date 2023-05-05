import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService extends BaseService {
  repositoriesChange = new BehaviorSubject<Repository[] | null>(null);

  constructor(
    http: HttpClient
  ) {
    super(http, "api/repositories");
  }

  search(content: string) {
    return this.get<Repository[]>(content)
    .pipe(
      tap(res => {
        this.repositoriesChange.next(res == null ? [] : res)
      }),
      catchError(err => this.handleError(err))
    );
  }


  handleError(error: HttpErrorResponse) {
    let errMessage = "An unknown error ocurred";
        if (!error.error) {
            return throwError(errMessage)
        }
        switch(error.error) {
            case "FAILED_UPDATE_CHARACTER":
                errMessage = "Failed to update the character"
                break;
        }
        return throwError(errMessage)
  }

}
