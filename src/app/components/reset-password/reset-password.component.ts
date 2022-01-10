import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  successAlert:boolean = false
  errorAlert:boolean = false
  passwordResetId:any
  resetPasswordForm!:FormGroup
  resetPasswordDataObject!:Object
  constructor(private formBuilder:FormBuilder, private api:ApiService, private activeRoute: ActivatedRoute) { }

  get password() {
    return this.resetPasswordForm.get("password")
  }
  get confirmPassword() {
    return this.resetPasswordForm.get("confirmPassword")
  }

  ngOnInit(): void {
    this.passwordResetId = this.activeRoute.snapshot.params["passwordResetId"];

    this.resetPasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    })
  }

  onResetPasswordFormSubmit() {
    if(this.resetPasswordForm.value.password == this.resetPasswordForm.value.confirmPassword) {
      this.resetPasswordDataObject = {
        "id" : this.passwordResetId,
        "password" : this.resetPasswordForm.value.password,
        "confirmPassword" : this.resetPasswordForm.value.confirmPassword
      }
      console.log(this.resetPasswordDataObject);
      this.successAlert = true
      this.errorAlert = false
    }else {
      this.errorAlert = true;
    }
  }

}
