import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { InstituteExamRegistrationModel } from './register-for-exam.model';

@Component({
  selector: 'app-register-for-exam-page',
  templateUrl: './register-for-exam-page.component.html',
  styleUrls: ['./register-for-exam-page.component.css']
})
export class RegisterForExamPageComponent implements OnInit {

  instituteExamDataObject:InstituteExamRegistrationModel = new InstituteExamRegistrationModel
  registerForExamForm!: FormGroup;
  date = new Date()
  today!:string
  file!: any
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    this.registerForExamForm = this.formBuilder.group({
      email: [localStorage.getItem("instituteEmail"), [Validators.required, Validators.email]],
      studentType: ["School Student", Validators.required],
      paymentMode: ["Online Payment", Validators.required]
    })
    console.log(typeof(localStorage.getItem("instituteID")));

    this.today =  months[this.date.getMonth()]+" "+this.date.getDate()+", "+this.date.getFullYear()
  }

  get email() {
    return this.registerForExamForm.get("email");
  }
  get studentType() {
    return this.registerForExamForm.get("studentType");
  }

  onFileChange(event:any) {
    console.log(event);
    this.file = event.target.files[0]
  }

  onRegisterForExamFormSubmit() {

    this.instituteExamDataObject.instituteId = parseInt(localStorage['instituteID'])
    this.instituteExamDataObject.orderId = ""
    this.instituteExamDataObject.amount = 99
    this.instituteExamDataObject.paymentMode = this.registerForExamForm.value.paymentMode
    this.instituteExamDataObject.studentType = this.registerForExamForm.value.studentType
    this.instituteExamDataObject.registrationDate = this.today
    this.instituteExamDataObject.instituteEmail = this.registerForExamForm.value.email
    this.instituteExamDataObject.file = this.file

    this.api.postInstituteExamData(this.instituteExamDataObject)
      .subscribe(res => {
        console.log(res)
      })
  }



}
