import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CoordinatorRegistrationModel } from './coordinator-resistration.model';

@Component({
  selector: 'app-coordinator-registration-page',
  templateUrl: './coordinator-registration-page.component.html',
  styleUrls: ['./coordinator-registration-page.component.css']
})
export class CoordinatorRegistrationPageComponent implements OnInit {

  coordinatorForm!: FormGroup
  coordinatorDataObject: CoordinatorRegistrationModel = new CoordinatorRegistrationModel()
  siteKey: any
  constructor(private formBuilder:FormBuilder, private api:ApiService, private route:Router) { }

  ngOnInit(): void {
    this.coordinatorForm = this.formBuilder.group({
      "name": ['', Validators.required],
      "phone": ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]],
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

  onCoordinatorFormSubmit() {
    if(this.coordinatorForm.status == "VALID") {
      this.postCoordinatorData()
    }
  }

  postCoordinatorData() {
    this.coordinatorDataObject.coordinatorName = this.coordinatorForm.value.coordinatorName
    this.coordinatorDataObject.address = this.coordinatorForm.value.address
    this.coordinatorDataObject.city = this.coordinatorForm.value.city
    this.coordinatorDataObject.email = this.coordinatorForm.value.email
    this.coordinatorDataObject.phone = this.coordinatorForm.value.phone
    this.coordinatorDataObject.pincode = this.coordinatorForm.value.pincode
    this.coordinatorDataObject.state = this.coordinatorForm.value.state

    this.api.postCoordinatorData(this.coordinatorDataObject)
      .subscribe(() => {
        this.route.navigate(['/thank-you'])
      })
  }

}
