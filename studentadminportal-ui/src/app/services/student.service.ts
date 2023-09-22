import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudent } from '../models/api-models/istudent.model';
import { IUpdateStudentRequest } from '../models/api-models/iupdate-student-request.model';
import { ICreateStudentRequest } from '../models/api-models/icreate-student-request.model';

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
  // public addCategory(model: IAddCategoryRequest): Observable<void> {
  //   let dataURL: string = `${environment.apiBaseUrl}/api/categories?addAuth=true`;
  //   return this.http.post<void>(dataURL, model);
  // }

  // public updateCatagory(id: string, updateCategoryRequest: IUpdateCategoryRequest): Observable<ICategory> {
  //   let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
  //   return this.http.put<ICategory>(dataURL, updateCategoryRequest)
  // }

  // public deleteCatagory(id: string): Observable<ICategory> {
  //   let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
  //   return this.http.delete<ICategory>(dataURL);
  // }

  public getAllStudents():Observable<IStudent[]>{
    let dataURL: string = `${environment.apiBaseUrl}/api/students`;
    return this.http.get<IStudent[]>(dataURL);
  }
  public getStudentById(studentId:string):Observable<IStudent>{
    let dataURL: string = `${environment.apiBaseUrl}/api/students/${studentId}`;
    return this.http.get<IStudent>(dataURL);
  }
  //   public updateStudent(studentId: string, updateStudentRequest: IUpdateStudentRequest): Observable<IStudent> {
  //   let dataURL: string = `${environment.apiBaseUrl}/api/students/${studentId}`;
  //   return this.http.put<IStudent>(dataURL, updateStudentRequest)
  // }

  public updateStudent(studentId: string, studentRequest: IStudent): Observable<IStudent> {
    const updateStudentRequest:IUpdateStudentRequest={
     firstName:studentRequest.firstName,
     lastName:studentRequest.lastName,
     dateOfBirth:studentRequest.dateOfBirth,
     email:studentRequest.email,
     mobile:studentRequest.mobile,
     genderId:studentRequest.genderId,
     physicalAddress:studentRequest.address.physicalAddress,
     postalAddress:studentRequest.address.postalAddress
    }
    let dataURL: string = `${environment.apiBaseUrl}/api/students/${studentId}`;
    return this.http.put<IStudent>(dataURL, updateStudentRequest)
  }
   public deleteStudent(studentId: string): Observable<IStudent> {
    let dataURL: string = `${environment.apiBaseUrl}/api/students/${studentId}`;
    return this.http.delete<IStudent>(dataURL);
  }
   public createStudent(studentRequest: IStudent): Observable<IStudent> {
    const createStudentRequest:ICreateStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
     }
    let dataURL: string = `${environment.apiBaseUrl}/api/students`;
    return this.http.post<IStudent>(dataURL, createStudentRequest);
  }
}
