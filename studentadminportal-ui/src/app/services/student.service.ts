import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudent } from '../models/api-models/istudent.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  // public getAllCategories(): Observable<ICategory[]> {
  //   let dataURL: string = `${environment.apiBaseUrl}/api/categories`;
  //   return this.http.get<ICategory[]>(dataURL);
  // }

  public getAllStudents():Observable<IStudent[]>{
    let dataURL: string = `${environment.apiBaseUrl}/api/students`;
    return this.http.get<IStudent[]>(dataURL);
  }

}
