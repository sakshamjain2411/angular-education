import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-registration-page',
  templateUrl: './student-registration-page.component.html',
  styleUrls: ['./student-registration-page.component.css']
})
export class StudentRegistrationPageComponent implements OnInit {

  routeParam: String = "";
  studentForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //URL Parameter
    this.routeParam = this.activeRoute.snapshot.params["referral"];
    this.studentForm = this.formBuilder.group({
      studentName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      country: ["India", Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      studentType: ["", Validators.required],
      referralCode: [this.routeParam, Validators.pattern('[a-zA-Z]*')],
      recaptcha: ['', Validators.required],
      schoolStudent: this.formBuilder.array([]),
      collegeStudent: this.formBuilder.array([])
    })
    console.log(this.studentForm);

    console.log(this.routeParam)

    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT";
    // this.studentForm.valueChanges.subscribe(console.log)
  }

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

  addSchoolField() {
    this.schoolStudent.push(this.formBuilder.control(''))
    console.log("School")
  }

  addCollegeField() {
    this.collegeStudent.push(this.formBuilder.control(''))
    console.log("College")
  }

  onStudentFormSubmit() {
    console.log(this.studentForm.value);
    
  }

  siteKey: any = "";

}
