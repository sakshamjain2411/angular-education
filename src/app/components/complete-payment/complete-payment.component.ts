import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { WindowRefService } from 'src/app/service/window-ref.service';

@Component({
  selector: 'app-complete-payment',
  templateUrl: './complete-payment.component.html',
  styleUrls: ['./complete-payment.component.css']
})
export class CompletePaymentComponent implements OnInit {

  constructor(private route:Router ,private activeRoute:ActivatedRoute, private api:ApiService, private winRef: WindowRefService) { }

  orderId:any
  payeeName!: String
  payeeEmail!: String
  payeePhone!: number
  totalAmount!: number
  razorPayPaymentOptions!: any

  ngOnInit(): void {
    this.orderId = this.activeRoute.snapshot.params["orderId"];
    this.api.getStudentDataById(this.orderId)
    .subscribe(res => {
      this.payeeName = res[0].name
      this.payeeEmail = res[0].email
      this.payeePhone = res[0].phone
      this.totalAmount = res[0].amount/100
    })

  }

  completePayment(e:any) {
    e.preventDefault()
    this.razorPayPaymentOptions = {
      "key": "rzp_test_OVNJXawSkiGW2l", // Enter the Key ID generated from the Dashboard
      "amount": this.totalAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Springfield Olympiads",
      "description": "Test Transaction",
      "image": "/assets/img/logo.svg",
      // "order_id": "order_IiMJe418WAhnuG", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response:any) {
        alert('Transaction Successfull')
      },
      "prefill": {
        "name": this.payeeName,
        "email": this.payeeEmail,
        "contact": this.payeePhone
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      }
    };

    let razorPayObject = new this.winRef.nativeWindow.Razorpay(this.razorPayPaymentOptions)
    razorPayObject.open()
  }

  success() {
    this.route.navigate(['/thank-you'])
  }

}
