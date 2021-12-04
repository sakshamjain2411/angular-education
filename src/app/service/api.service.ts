import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  postInstituteData(instituteData:any) {
    return this._http.post<any>("http://localhost:3000/instituteData", instituteData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postStudentData(studentData:any) {
    return this._http.post<any>("http://localhost:3000/studentData", studentData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  getInstituteData() {
    return this._http.get<any>("http://localhost:3000/instituteData")
      .pipe(map((res:any)=>{
        return res
      }))
  }

  getInstituteDataById(id:any) {
    return this._http.get<any>("http://localhost:3000/instituteData/"+id)
      .pipe(map((response:any) => {
        return response
      }))
  }

  getExamDataByInstituteID(id:any) {
    return this._http.get<any>("http://localhost:3000/institueExamsData?instituteId="+id)
      .pipe(map((response:any) => {
        return response
      }))
  }

  getWebsiteCoreData() {
    return this._http.get<any>("http://localhost:3000/websiteCoreData")
      .pipe(map((response) => {
        return response
      }))
  }

  getOlympiadData() {
    return this._http.get<any>("http://localhost:3000/olympiadData")
      .pipe(map(response => {
        return response
      }))
  }
}
