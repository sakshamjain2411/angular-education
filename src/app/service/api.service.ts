import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  postInstituteData(instituteData:any) {
    return this._http.post<any>("https://olympiad.pw/registerInstitute", instituteData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postStudentData(studentData:any) {
    return this._http.post<any>("https://olympiad.pw/registerNewIndividual", studentData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postCoordinatorData(coordinatorData:any) {
    return this._http.post<any>("https://olympiad.pw/registerCoordinator", coordinatorData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postTestimonialData(testimonialData:any) {
    return this._http.post<any>("https://olympiad.pw/submitReview", testimonialData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postNewsLetterData(newsletterData:any) {
    return this._http.post<any>("https://olympiad.pw/subscribe", newsletterData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postAuthData(authData:any) {
    return this._http.post<any>("https://olympiad.pw/login-institute", authData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postCouponCodeData(couponData:any) {
    return this._http.post<any>("https://olympiad.pw/discountAfterCoupon", couponData)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  postFogotPasswordData(forgotPasswordData:any) {
    return this._http.post<any>("https://olympiad.pw/recoverPassword", forgotPasswordData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postResetPasswordData(resetPasswordData:any) {
    return this._http.post<any>("https://olympiad.pw/resetPassword", resetPasswordData)
      .pipe(map((res:any)=>{
        return res
      }))
  }

  postContactFormData(contactFormData:any) {
    return this._http.post<any>("https://olympiad.pw/saveContact", contactFormData)
      .pipe(map((res:any)=>{
        return res
      }))
  }


  getInstituteDataByEmail(email:any) {
    return this._http.get<any>("https://olympiad.pw/registeredExams?email="+email)
      .pipe(map((response:any) => {
        return response
      }))
  }

  getWebsiteCoreData() {
    return this._http.get<any>("https://olympiad.pw/websiteCoreData")
      .pipe(map((response) => {
        return response
      }))
  }

  getOlympiadData() {
    return this._http.get<any>("https://olympiad.pw/olympiadDetails")
      .pipe(map(response => {
        return response
      }))
  }

  getOlympiadScheduleData() {
    return this._http.get<any>("https://olympiad.pw/getSchedule")
      .pipe(map(response => {
        return response
      }))
  }

  getTestimonialsData(sort:string = "dateOfCreation", order:string = "desc", category:string = "", page:number = 0, limit:number = 9) {
    if(category != "") {
      return this._http.get<any>("https://olympiad.pw/getReviews?sortBy="+sort+"&sortOrder="+order+"&offset="+page*limit+"&limit="+limit+"&olympiadName="+category)
      .pipe(map(response => {
        return response
      }))
    }
    return this._http.get<any>("https://olympiad.pw/getReviews?sortBy="+sort+"&sortOrder="+order+"&offset="+page*limit+"&limit="+limit+"&olympiadName=")
      .pipe(map(response => {
        return response
      }))
  }

  getTesimonialDataWithAdminApproval() {
    return this._http.get<any>("https://olympiad.pw/getReviews?homePage=true")
    .pipe(map(response => {
      return response
    }))
  }

  getCountries() {
    return this._http.get<any>("https://olympiad.pw/countries")
    .pipe(map(response => {
      return response
    }))
  }

  getStateFromPinCode(pincode:number) {
    return this._http.get<any>("https://olympiad.pw/getPincodeDetails?pincode="+pincode)
    .pipe(map(response => {
      return response
    }))
  }

  getStudentDataById(id:number) {
    return this._http.get<any>("https://olympiad.pw/individualOrderDetails?orderId="+id)
    .pipe(map(response => {
      return response
    }))
  }

  getOTPHash(phone:Object) {
    return this._http.post<any>("https://olympiad.pw/sendOtp", phone)
    .pipe(map(response => {
      return response
    }))
  }

  getOlympiadPriceData() {
    return this._http.get<any>("https://olympiad.pw/prices")
    .pipe(map(response => {
      return response
    }))
  }

  getIndividualExamData(ID:any) {
    return this._http.get<any>("https://olympiad.pw/fetchRegisteredStudents?examId="+ID)
    .pipe(map(response => {
      return response
    }))
  }

  getFaqData() {
    return this._http.get<any>("https://olympiad.pw/getFAQs")
    .pipe(map(response => {
      return response
    }))
  }

}
