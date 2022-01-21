import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CoordinatorRegistrationModel } from './coordinator-resistration.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-coordinator-registration-page',
  templateUrl: './coordinator-registration-page.component.html',
  styleUrls: ['./coordinator-registration-page.component.css']
})
export class CoordinatorRegistrationPageComponent implements OnInit {

  coordinatorForm!: FormGroup
  coordinatorDataObject: CoordinatorRegistrationModel = new CoordinatorRegistrationModel()
  OTPHash:any
  secretKey:string = "ASECRET"
  invalidOTP:boolean = false
  invalidOTPCount:number = 0
  otpSent:boolean = false
  resendOTP:boolean = false
  siteKey: any
  constructor(private formBuilder:FormBuilder, private api:ApiService, private route:Router) { }

  ngOnInit(): void {
    this.coordinatorForm = this.formBuilder.group({
      "name": ['', Validators.required],
      "phone": ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      "otp": ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(6), Validators.minLength(4)]],
      "email": ['', [Validators.required, Validators.email]],
      "address": ['', Validators.required],
      "pincode": ['', [Validators.required, Validators.minLength(6),Validators.maxLength(6)] ],
      "state": ['', Validators.required],
      "city": ['', Validators.required],
      "recaptcha" : ['', Validators.required]
    })

    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT"
  }

  get name() {
    return this.coordinatorForm.get('name')
  }
  get phone() {
    return this.coordinatorForm.get('phone')
  }
  get otp() {
    return this.coordinatorForm.get('otp')
  }
  get address() {
    return this.coordinatorForm.get('address')
  }
  get email() {
    return this.coordinatorForm.get('email')
  }
  get pincode() {
    return this.coordinatorForm.get('pincode')
  }
  get city() {
    return this.coordinatorForm.get('city')
  }
  get state() {
    return this.coordinatorForm.get('state')
  }

  sendOTP() {
    let phone = {
      phone: this.coordinatorForm.value.phone
    }
    
    this.api.getOTPHash(phone)
    .subscribe(res => {
      this.OTPHash = res.pre
      this.enableResendOTP()
      this.otpSent = true
    })
  }

  enableResendOTP() {
    setTimeout(() => {
      this.resendOTP = true;
    }, 30000);
  }

  validateOTP() {
    let decipherText = CryptoJS.AES.decrypt(this.OTPHash, "ASECRET").toString(CryptoJS.enc.Utf8)
    if(decipherText == this.coordinatorForm.value.otp) {
      return true
    }
    else {
      return false
    }
  }

  getCityAndState() {
    if (this.coordinatorForm.value.pincode.length == 6) {
      let pincode = this.coordinatorForm.value.pincode
      this.api.getStateFromPinCode(pincode)
        .subscribe(res => {
          this.coordinatorForm.patchValue({
            city: res[0].City,
            state: res[0].State
          })
        })
    }
  }

  onCoordinatorFormSubmit() {
    if(this.coordinatorForm.status == "VALID") {
      if(this.validateOTP()) {
        this.postCoordinatorData()
      }
      else {
        this.invalidOTP = true
        this.invalidOTPCount++
        this.coordinatorForm.patchValue({
          otp: ""
        })
        if(this.invalidOTPCount == 3) {
          this.coordinatorForm.reset()
          this.OTPHash = "";
        }
      }
    }
  }

  postCoordinatorData() {
    this.coordinatorDataObject.coordinatorName = this.coordinatorForm.value.name
    this.coordinatorDataObject.address = this.coordinatorForm.value.address
    this.coordinatorDataObject.city = this.coordinatorForm.value.city
    this.coordinatorDataObject.email = this.coordinatorForm.value.email
    this.coordinatorDataObject.phone = this.coordinatorForm.value.phone
    this.coordinatorDataObject.pincode = this.coordinatorForm.value.pincode
    this.coordinatorDataObject.state = this.coordinatorForm.value.state
    console.log(this.coordinatorDataObject);
    
    this.api.postCoordinatorData(this.coordinatorDataObject)
      .subscribe(() => {
        this.route.navigate(['/thank-you'])
      })
  }

}
