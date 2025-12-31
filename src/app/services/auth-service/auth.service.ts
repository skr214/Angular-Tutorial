import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }
}
