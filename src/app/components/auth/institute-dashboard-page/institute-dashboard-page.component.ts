import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { WindowRefService } from 'src/app/service/window-ref.service';
import { InstituteExamRegistrationModel } from '../../institute-registration-page/institute-exam-registration.model';
import { InstituteRegistrationModel } from '../../institute-registration-page/institute-registration.model';
import { environment } from 'src/environments/environment';

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
      this.api.getInstituteDataByEmail(this.instituteEmail)
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

  onPaymentSuccess(res:any, email:any) {
    let paymentSuccessDataObject = {
      "paymentId": res.razorpay_payment_id,
      "orderId": res.razorpay_order_id,
      "paymentSignature": res.razorpay_signature,
      "mail": email
    }

    fetch("https://sfoly.com/paymentSuccess/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(paymentSuccessDataObject)
    }).then(res => {
      if(res.status == 200) {
        window.location.href="http://localhost:4200/thank-you";
      }else if(res.status == 400) {
        console.log(res)
      }
    });
  }

  initPayment(amount:any, orderID:any, email:any, onSuccess:any) {
    if(environment.production == true) {
      this.razorPayPaymentOptions = {
        "key": environment.razorPaySecretKey, // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Springfield Olympiads",
        "description": "Test Transaction",
        "image": "/assets/img/logo.svg",
        "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (res:any) {
          onSuccess(res,email);
        },
        "prefill": {
          "email": email
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        }
      };
    }
    else {
      this.razorPayPaymentOptions = {
        "key": environment.razorPaySecretKey, // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Springfield Olympiads",
        "description": "Test Transaction",
        "image": "/assets/img/logo.svg",
        // "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (res:any) {
          onSuccess(res,email);
        },
        "prefill": {
          "email": email
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        }
      };
    }

    let razorPayObject = new this.winRef.nativeWindow.Razorpay(this.razorPayPaymentOptions)
    razorPayObject.open()
  }

}
