import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  private apiUrl: string;
  private baseApiUrl: string = `${environment.baseApiUrl}`
  constructor(
      protected http: HttpClient,
      apiUrl: string) {
      this.apiUrl = `${this.baseApiUrl}${apiUrl}`
  }

  protected get<T>(endPointUrl: string, headers?: {headers: HttpHeaders}): Observable<T | null> {
      return this.http.get<T>(`${this.apiUrl}/${endPointUrl}`, headers)
  }

  protected post<Res, Req>(endPointUrl: string , entity: Req, options?: {headers: HttpHeaders}): Observable<Res | null> {
      return this.http.post<Res>(`${this.apiUrl}/${endPointUrl}`, entity, options)
  }

  protected put<T>(endPointUrl: string , entity: T, options?: {headers: HttpHeaders}): Observable<T | null> {
    return this.http.put<T>(`${this.apiUrl}/${endPointUrl}`, entity, options)
  }

  protected delete<Response>(endPointUrl: string, headers?: {headers: HttpHeaders}): Observable<Response | null> {
    return this.http.delete<Response>(`${this.apiUrl}/${endPointUrl}`, headers)
    }
}