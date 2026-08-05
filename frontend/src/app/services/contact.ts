import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = 'http://localhost:3000/api/contacts';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<any[]>(
      this.apiUrl
    );
  }

  getById(id: number) {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  update(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}