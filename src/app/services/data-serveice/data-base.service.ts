import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }
}
