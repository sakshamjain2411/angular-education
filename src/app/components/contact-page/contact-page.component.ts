import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contactForm!: FormGroup
  contactFormDataObject: any
  successAlert: boolean = false
  successMessage: any
  errorAlert: boolean = false
  errorMessage: any
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", Validators.required]
    })
  }

  onContactFormSubmit() {
    if(this.contactForm.valid) {
      this.contactFormDataObject = {
        "name": this.contactForm.value.name,
        "email": this.contactForm.value.email,
        "subject": this.contactForm.value.subject,
        "msg": this.contactForm.value.message
      }

      this.api.postContactFormData(this.contactFormDataObject)
      .subscribe(res => {
        this.successAlert = true
        this.successMessage = res.msg;
      },
      err => {
        this.errorAlert = true
        this.errorMessage = err.error.errors[0].msg
      })
    }
  }

  pageTitle:String = "Contact Us"

}
