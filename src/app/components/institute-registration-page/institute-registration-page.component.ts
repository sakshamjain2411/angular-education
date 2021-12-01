import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { InstituteRegistrationModel } from './institute-registration.model';

@Component({
  selector: 'app-institute-registration-page',
  templateUrl: './institute-registration-page.component.html',
  styleUrls: ['./institute-registration-page.component.css']
})
export class InstituteRegistrationPageComponent implements OnInit {

  instituteFrom!: FormGroup
  routeParam:any
  instituteDataObject: InstituteRegistrationModel = new InstituteRegistrationModel()
  constructor(private formBuilder: FormBuilder, private api:ApiService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.instituteFrom = this.formBuilder.group({
      instituteName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
      address: ["", Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      coordinatorName: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      recaptcha: ['', Validators.required]
    })

    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT";
  }

  get instituteName() {
    return this.instituteFrom.get('instituteName');
  }
  get email() {
    return this.instituteFrom.get('email');
  }
  get phone() {
    return this.instituteFrom.get('phone');
  }
  get address() {
    return this.instituteFrom.get('address');
  }
  get state() {
    return this.instituteFrom.get('state');
  }
  get city() {
    return this.instituteFrom.get('city');
  }
  get pincode() {
    return this.instituteFrom.get('pincode');
  }
  get coordinatorName() {
    return this.instituteFrom.get('coordinatorName');
  }
  get password() {
    return this.instituteFrom.get('password');
  }

  onInstituteFormSubmit() {
    if(this.instituteFrom.status == "VALID") {
      console.log(this.instituteFrom.value);
      this.postInstitueData()
    }
  }

  postInstitueData() {
    this.instituteDataObject.instituteName = this.instituteFrom.value.instituteName
    this.instituteDataObject.address = this.instituteFrom.value.address
    this.instituteDataObject.city = this.instituteFrom.value.city
    this.instituteDataObject.coordinatorName = this.instituteFrom.value.coordinatorName
    this.instituteDataObject.email = this.instituteFrom.value.email
    this.instituteDataObject.password = this.instituteFrom.value.password
    this.instituteDataObject.phone = this.instituteFrom.value.phone
    this.instituteDataObject.pincode = this.instituteFrom.value.pincode
    this.instituteDataObject.state = this.instituteFrom.value.state

    this.api.postInstituteData(this.instituteDataObject)
      .subscribe(res => {
        console.log(res);
      })
  }

  siteKey: any;

}
