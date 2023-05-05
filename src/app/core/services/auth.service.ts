import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthForm } from '../models/authForm.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageEnum } from '../enums/storage.enum';
import { BookmarksService } from './bookmarks.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  userChange = new BehaviorSubject<string | null>(null);
  constructor(
    http: HttpClient,
    private router: Router,
    private bookmarksService: BookmarksService
  ) {
    super(http, "api/auth");
  }

  login(authFrom: AuthForm) {
    return this.post<{token: string}, AuthForm>("login", authFrom).pipe(
      tap(res => {
        this.handleToken(res?.token)
      }),
      catchError(err => this.handleAuthError(err))
    )
  }

  signup(authFrom: AuthForm) {
    return this.post<{token: string}, AuthForm>("signup", authFrom).pipe(
      tap(res => {
        this.handleToken(res?.token)
      }),
      catchError(err => this.handleAuthError(err))
    )
  }

  logout() {
    this.clearBookmarks();
    this.clearUser();
    this.router.navigate(["login"])
  }

  private clearBookmarks(){
    localStorage.removeItem(StorageEnum.BOOKMARKS)
    this.bookmarksService.bookmarksChange.next([]);
  }

  private clearUser(){
    localStorage.removeItem(StorageEnum.TOKEN)
    this.userChange.next(null);
  }

  autoLogin() {
    let token =localStorage.getItem(StorageEnum.TOKEN)
    if(token) {
      this.userChange.next(token);
    }
    else{
      this.clearBookmarks();
    }
  }

  private handleToken(token: string | undefined) {
    if(token) {
      localStorage.setItem(StorageEnum.TOKEN, token);
      this.userChange.next(token)
    }
  }

  private handleAuthError(error: any) {
    let errMessage = "An unknown error ocurred";
    if (!error.error) {
      return throwError(errMessage)
    }
    switch(error.error) {
      case "FAILED_LOGIN":
        errMessage = "Email or password are incoorrect";
        break;
      case "FAILED_SIGNUP":
        errMessage = "Faild to sign up";
        break;
      default:
        errMessage = "An unknown error ocurred";
        break;
    }
    return throwError(errMessage);
  }
}
