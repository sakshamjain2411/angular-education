import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { WindowRefService } from 'src/app/service/window-ref.service';
import { InstituteExamRegistrationModel } from '../../institute-registration-page/institute-exam-registration.model';
import { InstituteRegistrationModel } from '../../institute-registration-page/institute-registration.model';

@Component({
  selector: 'app-institute-dashboard-page',
  templateUrl: './institute-dashboard-page.component.html',
  styleUrls: ['./institute-dashboard-page.component.css']
})
export class InstituteDashboardPageComponent implements OnInit {

  authStatus:any
  instituteID:any
  instituteEmail:any
  authToken:any
  instituteDataObject!: InstituteRegistrationModel
  instituteExamDatatObject: any
  razorPayPaymentOptions: any
  constructor(private route:Router, private _http:HttpClient, private api: ApiService, private winRef:WindowRefService) { }

  ngOnInit(): void {
    //LocalStorage
    this.authStatus = localStorage.getItem("auth")
    this.instituteID = localStorage.getItem("instituteID")
    this.instituteEmail = localStorage.getItem("instituteEmail")
    this.authToken = localStorage.getItem("authToken")
    
    if(this.authStatus === "true" && this.instituteID) {
      this.checkTokenValidity(this.authToken)
      this.tokenTimeout()

      //API Call
      this.api.getInstituteDataById(this.instituteID)
        .subscribe(respose => {
          this.instituteDataObject = respose
        })
      this.api.getExamDataByInstituteID(this.instituteID)
        .subscribe(response => {
          this.instituteExamDatatObject = response
        })
    }
    else {
      this.route.navigate(['institute-login'])
    }
  }

  onLogoutButtonClick() {
    localStorage.removeItem("auth")
    localStorage.removeItem("instituteID")
    localStorage.removeItem("instituteEmail")
    localStorage.removeItem("authToken")
    this.route.navigate(['institute-login'])
  }

  checkTokenValidity(authToken:String) {
    let now = Date.now();
    if(now - Number(authToken) > 7200000) {
      this.onLogoutButtonClick()
    }
  }

  tokenTimeout() {
    setTimeout(() => {
      alert("Token Expired Please Login Again")
      this.onLogoutButtonClick()
    }, 7200000);
  }

  initPayment(amount:any, orderID:any,) {
    this.razorPayPaymentOptions = {
      "key": "rzp_test_OVNJXawSkiGW2l", // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Springfield Olympiads",
      "description": "Test Transaction",
      "image": "/assets/img/logo.svg",
      // "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response:any) {
        setTimeout(() => {
          window.location.href="http://localhost:4200/thank-you";
        }, 2000);
      },
      "prefill": {
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      }
    };

    let razorPayObject = new this.winRef.nativeWindow.Razorpay(this.razorPayPaymentOptions)
    razorPayObject.open()
  }

}
