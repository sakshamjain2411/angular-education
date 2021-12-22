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

  postCoordinatorData(coordinatorData:any) {
    return this._http.post<any>("http://localhost:3000/coordinatorData", coordinatorData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postInstituteExamData(instituteExamData:any) {
    return this._http.post<any>("http://localhost:3000/institueExamsData", instituteExamData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postTestimonialData(testimonialData:any) {
    return this._http.post<any>("http://localhost:3000/testimonials", testimonialData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postNewsLetterData(newsletterData:any) {
    return this._http.post<any>("http://localhost:3000/newsletter", newsletterData)
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

  getOlympiadScheduleData() {
    return this._http.get<any>("http://localhost:3000/olympiadSchedule")
      .pipe(map(response => {
        return response
      }))
  }

  getTestimonialsData(sort:string = "date", order:string = "desc", category:string = "", page:number = 1, limit:number = 3) {
    if(category != "") {
      return this._http.get<any>("http://localhost:3000/testimonials?_sort="+sort+"&reviewCategory="+category+"&_page="+page+"&_limit="+limit+"&_order="+order)
      .pipe(map(response => {
        return response
      }))
    }
    return this._http.get<any>("http://localhost:3000/testimonials?_sort="+sort+"&_order="+order+"&_page="+page+"&_limit="+limit)
      .pipe(map(response => {
        return response
      }))
  }

  getTesimonialDataWithAdminApproval() {
    return this._http.get<any>("http://localhost:3000/testimonials?adminRating=10")
    .pipe(map(response => {
      return response
    }))
  }
}
