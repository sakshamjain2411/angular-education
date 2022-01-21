import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  postInstituteData(instituteData:any) {
    return this._http.post<any>("https://sfoly.com/registerInstitute", instituteData)
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
    return this._http.post<any>("https://sfoly.com/registerCoordinator", coordinatorData)
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
    return this._http.post<any>("https://sfoly.com/subscribe", newsletterData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postAuthData(authData:any) {
    return this._http.post<any>("https://sfoly.com/login-institute", authData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postCouponCodeData(couponData:any) {
    return this._http.post<any>("https://sfoly.com/discountAfterCoupon", couponData)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  postFogotPasswordData(forgotPasswordData:any) {
    return this._http.post<any>("https://sfoly.com/recoverPassword", forgotPasswordData)
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
    return this._http.get<any>("https://sfoly.com/getRegisteredExams?name="+id)
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
    return this._http.get<any>("https://sfoly.com/websiteCoreData")
      .pipe(map((response) => {
        return response
      }))
  }

  getOlympiadData() {
    return this._http.get<any>("https://sfoly.com/olympiadDetails")
      .pipe(map(response => {
        return response
      }))
  }

  getOlympiadScheduleData() {
    return this._http.get<any>("https://sfoly.com/getSchedule")
      .pipe(map(response => {
        return response
      }))
  }

  getTestimonialsData(sort:string = "dateOfCreation", order:string = "desc", category:string = "", page:number = 0, limit:number = 9) {
    if(category != "") {
      return this._http.get<any>("https://sfoly.com/getReviews?sortBy="+sort+"&sortOrder="+order+"&offset="+page*limit+"&limit="+limit+"&olympiadName="+category)
      .pipe(map(response => {
        return response
      }))
    }
    return this._http.get<any>("https://sfoly.com/getReviews?sortBy="+sort+"&sortOrder="+order+"&offset="+page*limit+"&limit="+limit+"&olympiadName=")
      .pipe(map(response => {
        return response
      }))
  }

  getTesimonialDataWithAdminApproval() {
    return this._http.get<any>("https://sfoly.com/getReviews?homePage=true")
    .pipe(map(response => {
      return response
    }))
  }

  getCountries() {
    return this._http.get<any>("https://sfoly.com/countries")
    .pipe(map(response => {
      return response
    }))
  }

  getStateFromPinCode(pincode:number) {
    return this._http.get<any>("https://sfoly.com/getPincodeDetails?pincode="+pincode)
    .pipe(map(response => {
      return response
    }))
  }

  getStudentDataById(id:number) {
    return this._http.get<any>("https://sfoly.com/individualOrderDetails?orderId="+id)
    .pipe(map(response => {
      return response
    }))
  }

  getOTPHash(phone:Object) {
    return this._http.post<any>("https://sfoly.com/sendOtp", phone)
    .pipe(map(response => {
      return response
    }))
  }

  getOlympiadPriceData() {
    return this._http.get<any>("https://sfoly.com/prices")
    .pipe(map(response => {
      return response
    }))
  }

}
