import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, Form, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { WindowRefService } from 'src/app/service/window-ref.service';
import { StudentRegistrationModel } from './student-registration.model';


@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.component.html',
  styleUrls: ['./student-registration-page.component.css']
})
export class StudentRegistrationPageComponent implements OnInit {

  successAlert: boolean = false
  isIndia: boolean = false
  routeParam: String = ""
  submitStatus!: String
  submitMessage!: String
  isFormValid: boolean = false
  countries: Array<any> = []
  olympiadPriceData: Array<any> = []
  razorPayPaymentOptions:any
  activeOlympiads: Array<any> = []

  //Form Groups
  studentForm!: FormGroup
  schoolStudentForm!: FormGroup
  otherTypeForm!: FormGroup
  collegeStudentForm!: FormGroup
  workingTypeForm!: FormGroup
  aspirantTypeForm!: FormGroup
  activeOlympiadForm!: FormGroup

  schoolDataObject: StudentRegistrationModel = new StudentRegistrationModel
  totalAmount: number = 0
  payeePhone!:Number
  orderId:any

  typeSchoolStudent: boolean = false
  typeOther: boolean = false
  typeCollegeStudent: boolean = false
  typeWorkingProsessional: boolean = false
  typeAspirant: boolean = false

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private api: ApiService, private route: Router, private winRef: WindowRefService) { }

  get name() {
    return this.studentForm.get('studentName');
  }
  get email() {
    return this.studentForm.get('email');
  }
  get phone() {
    return this.studentForm.get('phone');
  }
  get phoneIndia() {
    return this.studentForm.get('phoneIndia');
  }
  get country() {
    return this.studentForm.get('country');
  }
  get state() {
    return this.studentForm.get('state');
  }
  get city() {
    return this.studentForm.get('city');
  }
  get pincode() {
    return this.studentForm.get('pincode');
  }
  get referralCode() {
    return this.studentForm.get('referralCode');
  }
  get schoolStudent() {
    return this.studentForm.get('schoolStudent') as FormArray;
  }
  get collegeStudent() {
    return this.studentForm.get('collegeStudent') as FormArray;
  }

  ngOnInit(): void {
    //URL Parameter
    this.routeParam = this.activeRoute.snapshot.params["referral"];

    this.api.getOlympiadPriceData()
    .subscribe(res => {
      this.olympiadPriceData = res   
    })

    //Base Student Form
    this.studentForm = this.formBuilder.group({
      studentName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phoneIndia: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      phone: ["", [Validators.required]],
      country: ["", Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      studentType: ["", Validators.required],
      referralCode: [this.routeParam, Validators.pattern('[a-zA-Z]*')],
      recaptcha: ['', Validators.required]
    })

    this.activeOlympiadForm = this.formBuilder.group({
      // siso: [""],
      // simo: [""],
      // sico: [""],
      // sieo: [""],

    })

    this.activeOlympiadForm.valueChanges
      .subscribe(res => {
        this.updateTotal(res);
      })

    this.studentForm.valueChanges
      .subscribe(res => {
        if (res.country == "India") {
          if (this.isIndia == false) {
            this.isIndia = true
            this.studentForm.patchValue({
              phone: "000"
            })
          }
        } else {
          if (this.isIndia == true) {
            this.isIndia = false
          }
        }
      })

    this.api.getCountries()
      .subscribe(res => {
        this.countries = res
      })


    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT";
    // this.calculateTotalAmount()
  }

  getActiveOlympiad(type: any) {
    if (type == "School") {
      this.api.getWebsiteCoreData()
        .subscribe(res => {
          for (let key in res.activeOlympiadsForSchoolStudent) {
            if (res.activeOlympiadsForSchoolStudent[key] == true) {
              this.activeOlympiads.push(key)
              this.activeOlympiadForm.addControl(key, new FormControl(''))
            }
          }
        })
    } else if (type == "Others") {
      this.api.getWebsiteCoreData()
        .subscribe(res => {
          for (let key in res.activeOlympiadsForOthers) {
            if (res.activeOlympiadsForOthers[key] == true) {
              this.activeOlympiads.push(key)
              this.activeOlympiadForm.addControl(key, new FormControl(''))
            }
          }
        })
    }
  }


  addTypeSchoolStudentField() {
    this.resetOlympiadFormControlGroup();
    this.typeSchoolStudent = true
    this.typeOther = false
    this.schoolStudentForm = this.formBuilder.group({
      schoolName: ["", Validators.required],
      schoolAddress: "",
      schoolPincode: "",
      schoolPhone: "",
      currentClass: ""
    })
    this.getActiveOlympiad("School")
  }

  addTypeOtherField() {
    this.resetOlympiadFormControlGroup();
    this.typeSchoolStudent = false
    this.typeOther = true
    this.otherTypeForm = this.formBuilder.group({
      otherType: ["", Validators.required]
    })

    this.otherTypeForm.valueChanges
      .subscribe(res => {
        if (res.otherType == "Student") {
          this.addTypeCollegeStudentField()
        } else if (res.otherType == "Working Professional") {
          this.addTypeWorkingProffessionalField()
        } else if (res.otherType == "Aspirant") {
          this.addTypeAspirantField()
        }
      })

    this.getActiveOlympiad("Others")
  }

  resetOlympiadFormControlGroup() {
    let counter = this.activeOlympiads.length
    for (let i = 0; i < counter; i++) {
      this.activeOlympiadForm.removeControl(this.activeOlympiads[0])
      this.activeOlympiads.shift();
    }
  }

  addTypeCollegeStudentField() {
    this.typeCollegeStudent = true
    this.typeAspirant = false
    this.typeWorkingProsessional = false
    this.collegeStudentForm = this.formBuilder.group({
      collegeName: ["", Validators.required],
      collegeAddress: "",
      collegePincode: "",
      collegePhone: "",
      currentYear: ""
    })
  }

  addTypeWorkingProffessionalField() {
    this.typeWorkingProsessional = true
    this.typeAspirant = false
    this.typeCollegeStudent = false
    this.workingTypeForm = this.formBuilder.group({
      organisationName: "",
      organisationPincode: ""
    })
  }

  addTypeAspirantField() {
    this.typeAspirant = true
    this.typeWorkingProsessional = false
    this.typeCollegeStudent = false
    this.aspirantTypeForm = this.formBuilder.group({
      preparingFor: ""
    })
  }

  updateTotal(res: any) {
    let counter = 0
    for (let item in res) {
      if (res[item] == true) {
        counter++
      }
    }
    switch (counter) {
      case 0:
        this.totalAmount = 0
        break;
      case 1:
        this.totalAmount = this.olympiadPriceData[0].discountedPrice
        break;
      case 2:
        this.totalAmount = this.olympiadPriceData[1].discountedPrice
        break;
      case 3:
        this.totalAmount = this.olympiadPriceData[2].discountedPrice
        break;
      case 4:
        this.totalAmount = this.olympiadPriceData[3].discountedPrice
        break;
      default:
        break;
    }
  }

  onStudentFormSubmit() {
    this.postStudentData()
  }

  scrollToFormSection() {
    document.querySelector("#student-form")?.scrollIntoView()
  }

  getCityAndState() {
    if (this.studentForm.value.country == "India") {
      if (this.studentForm.value.pincode.length == 6) {
        let pincode = this.studentForm.value.pincode
        this.api.getStateFromPinCode(pincode)
          .subscribe(res => {
            this.studentForm.patchValue({
              city: res[0].City,
              state: res[0].State
            })
          })
      }
    }
  }

  postStudentData() {
    this.schoolDataObject.studentName = this.studentForm.value.studentName
    this.schoolDataObject.email = this.studentForm.value.email
    if (this.isIndia == true) {
      this.schoolDataObject.phone = this.payeePhone = this.studentForm.value.phoneIndia
    } else {
      this.schoolDataObject.phone = this.payeePhone = this.studentForm.value.phone
    }
    this.schoolDataObject.country = this.studentForm.value.country
    this.schoolDataObject.pincode = this.studentForm.value.pincode
    this.schoolDataObject.state = this.studentForm.value.state
    this.schoolDataObject.city = this.studentForm.value.city
    this.schoolDataObject.studentType = this.studentForm.value.studentType
    this.schoolDataObject.referralCode = this.studentForm.value.referralCode
    this.schoolDataObject.totalAmount = this.totalAmount
    if (this.typeSchoolStudent) {
      this.schoolDataObject.schoolStudent = this.schoolStudentForm.value
      this.schoolDataObject.other = { "null": "null" }
    }
    else if (this.typeOther) {
      this.schoolDataObject.schoolStudent = { "null": "null" }
      if (this.typeCollegeStudent) {
        this.schoolDataObject.other = this.collegeStudentForm.value
      } else if (this.typeWorkingProsessional) {
        this.schoolDataObject.other = this.workingTypeForm.value
      } else if (this.typeAspirant) {
        this.schoolDataObject.other = this.aspirantTypeForm.value
      }
    }
    this.schoolDataObject.siso = this.activeOlympiadForm.value.siso
    this.schoolDataObject.simo = this.activeOlympiadForm.value.simo
    this.schoolDataObject.sico = this.activeOlympiadForm.value.sico
    this.schoolDataObject.sieo = this.activeOlympiadForm.value.sieo
    this.schoolDataObject.grad = this.activeOlympiadForm.value.grad
    this.schoolDataObject.finance = this.activeOlympiadForm.value.finance

    
    this.api.postStudentData(this.schoolDataObject)
    .subscribe(res => {
        this.initPayment(res.orderId)
      })
  }

  initPayment(orderID:any) {
    this.razorPayPaymentOptions = {
      "key": "rzp_test_OVNJXawSkiGW2l", // Enter the Key ID generated from the Dashboard
      "amount": this.totalAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
        "name": this.studentForm.value.studentName,
        "email": this.studentForm.value.email,
        "contact": this.payeePhone
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      }
    };

    let razorPayObject = new this.winRef.nativeWindow.Razorpay(this.razorPayPaymentOptions)
    razorPayObject.open()
  }

  siteKey: any = ""; 

}
