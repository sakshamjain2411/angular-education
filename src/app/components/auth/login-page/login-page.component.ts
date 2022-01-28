import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  errorAlert:boolean = false
  errorMessage:any
  siteKey: any;
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private route: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      recaptcha : ['', Validators.required]
    })
    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT"
  }

  ngAfterViewInit() {
    if(localStorage.getItem("auth") === "true") {
      this.route.navigate(['/institute-dashboard'])
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLoginFormSubmit() {
    if(this.loginForm.status == "VALID") {
      let auth = {
        "login-username" : this.loginForm.value.email,
        "login-password" : this.loginForm.value.password
      }
      this.api.postAuthData(auth)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem("auth","true")
        localStorage.setItem("instituteID", this.loginForm.value.email)
        localStorage.setItem("instituteEmail", this.loginForm.value.email)
        localStorage.setItem("authToken", Date.now().toString())
        this.route.navigate(['institute-dashboard'])
      },
      err => {
        this.errorAlert = true
        this.errorMessage = err.error.errors[0].msg
      })
    }
  }

}
