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
  public getAllStudents():Observable<IStudent[]>{
    let dataURL: string = `${environment.apiBaseUrl}/api/students`;
    return this.http.get<IStudent[]>(dataURL);
  }
  public getStudentById(studentId:string):Observable<IStudent>{
    let dataURL: string = `${environment.apiBaseUrl}/api/students/${studentId}`;
    return this.http.get<IStudent>(dataURL);
  }

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
 
  public uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);
    let dataURL: string = `${environment.apiBaseUrl}/api/students/upload-image/${studentId}`;
    return this.http.post<any>(dataURL, formData);
  }
  public getImagePath(relativePath:string){
    return `${environment.apiBaseUrl}/${relativePath}`;
  }

}
