import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { ForgotPasswordModel } from './forgot-password.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  siteKey:any;
  forgotPasswordForm!: FormGroup
  forgotPasswordDataObject:ForgotPasswordModel = new ForgotPasswordModel
  successAlert:boolean = false
  errorAlert:boolean = false
  constructor(private formbuilder:FormBuilder, private api:ApiService) { }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  ngOnInit(): void {
    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT";

    this.forgotPasswordForm = this.formbuilder.group({
      email: ["", [Validators.required, Validators.email]],
      recaptcha: ['', Validators.required]
    })
  }

  onForgotPasswordFormSubmit() {
    this.forgotPasswordDataObject.email = this.forgotPasswordForm.value.email
    let test = {
      "forgot-passsword-email": this.forgotPasswordForm.value.email
    }
    this.api.postFogotPasswordData(test)
      .subscribe(res => {
        this.successAlert = true;
      },
      err => {
        this.errorAlert = true;
      },
      )
  }

}
