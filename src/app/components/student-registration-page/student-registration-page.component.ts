import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StudentRegistrationModel } from './student-registration.model';


@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.component.html',
  styleUrls: ['./student-registration-page.component.css']
})
export class StudentRegistrationPageComponent implements OnInit {

  routeParam: String = ""
  submitStatus!: String
  submitMessage!: String
  studentForm!: FormGroup
  schoolDataObject: StudentRegistrationModel = new StudentRegistrationModel
  schoolStudentToggle: boolean = false
  collegeStudentToggle: boolean = false
  totalAmount: number = 0
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private api:ApiService) { }

  get name() {
    return this.studentForm.get('studentName');
  }
  get email() {
    return this.studentForm.get('email');
  }
  get phone() {
    return this.studentForm.get('phone');
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
    const schoolForm = this.formBuilder.group({
      name: [""],
      address: "",
      pincode: "",
      phone: "",
      currentClass: "",
      sico: "",
      simo: ""
    })
    const collegeForm = this.formBuilder.group({
      type: "",
      grad: "",
      finance: ""
    })
    //URL Parameter
    this.routeParam = this.activeRoute.snapshot.params["referral"];
    this.studentForm = this.formBuilder.group({
      studentName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      country: ["India", Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      studentType: ["", Validators.required],
      referralCode: [this.routeParam, Validators.pattern('[a-zA-Z]*')],
      recaptcha: ['', Validators.required],
      schoolStudent: schoolForm,
      collegeStudent: collegeForm
    })

    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT";
    // this.studentForm.valueChanges.subscribe(response => {
    //   console.log(response)
    // })

    this.calculateTotalAmount()
  }

  addSchoolField() {
    this.schoolStudentToggle = !this.schoolStudentToggle
    if (this.collegeStudentToggle) {
      this.collegeStudentToggle = !this.collegeStudentToggle
    }
  }

  addCollegeField() {
    this.collegeStudentToggle = !this.collegeStudentToggle
    if (this.schoolStudentToggle) {
      this.schoolStudentToggle = !this.schoolStudentToggle
    }
  }

  calculateTotalAmount() {
    this.studentForm.valueChanges
      .subscribe(response => {
        if(response.studentType == "School Student") {
          if(response.schoolStudent.simo && response.schoolStudent.sico) [
            this.totalAmount = 179
          ]
          else if(response.schoolStudent.simo || response.schoolStudent.sico) {
            this.totalAmount = 99
          }
          else this.totalAmount = 0
        }
        else if(response.studentType == "Graduate / Undergraduate / Working Professional") {
          if(response.collegeStudent.grad && response.collegeStudent.finance) [
            this.totalAmount = 179
          ]
          else if(response.collegeStudent.grad || response.collegeStudent.finance) {
            this.totalAmount = 99
          }
          else this.totalAmount = 0
        }
      })
  }

  onStudentFormSubmit() {
    this.postStudentData()
  }

  postStudentData() {
    this.schoolDataObject.studentName = this.studentForm.value.studentName
    this.schoolDataObject.email = this.studentForm.value.email
    this.schoolDataObject.phone = this.studentForm.value.phone
    this.schoolDataObject.country = this.studentForm.value.country
    this.schoolDataObject.pincode = this.studentForm.value.pincode
    this.schoolDataObject.state = this.studentForm.value.state
    this.schoolDataObject.city = this.studentForm.value.city
    this.schoolDataObject.studentType = this.studentForm.value.studentType
    this.schoolDataObject.referralCode = this.studentForm.value.referralCode
    this.schoolDataObject.totalAmount = this.totalAmount
    if(this.studentForm.value.studentType == "School Student") {
      this.schoolDataObject.schoolStudent = this.studentForm.value.schoolStudent
      this.schoolDataObject.collegeStudent = {"null":"null"}
    }
    else {
      this.schoolDataObject.schoolStudent = {"null":"null"}
      this.schoolDataObject.collegeStudent = this.studentForm.value.collegeStudent
    }
    
    this.api.postStudentData(this.schoolDataObject)
    this.studentForm.reset();
  }

  siteKey: any = "";

}
