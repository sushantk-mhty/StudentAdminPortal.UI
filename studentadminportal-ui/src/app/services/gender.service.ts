import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGender } from '../models/api-models/igender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  public getAllGenders():Observable<IGender[]>{
    let dataURL: string = `${environment.apiBaseUrl}/api/genders`;
    return this.http.get<IGender[]>(dataURL);
  }
}
