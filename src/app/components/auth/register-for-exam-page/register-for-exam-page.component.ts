import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-for-exam-page',
  templateUrl: './register-for-exam-page.component.html',
  styleUrls: ['./register-for-exam-page.component.css']
})
export class RegisterForExamPageComponent implements OnInit {

  registerForExamForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForExamForm = this.formBuilder.group({
      email: [localStorage.getItem("instituteEmail"), [Validators.required, Validators.email]],
      studentType: ["School Student", Validators.required],
      paymentMode: ["Online Payment", Validators.required]
    })
  }

  get email() {
    return this.registerForExamForm.get("email");
  }
  get studentType() {
    return this.registerForExamForm.get("studentType");
  }

  onRegisterForExamFormSubmit() {

  }

}
