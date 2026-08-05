import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl =
    'http://localhost:3000/api/categories';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }
  create(data: any) {

  return this.http.post(
    this.apiUrl,
    data
  );

}
getById(id: number) {

  return this.http.get<any>(
    `${this.apiUrl}/${id}`
  );

}

update(
  id: number,
  data: any
) {

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