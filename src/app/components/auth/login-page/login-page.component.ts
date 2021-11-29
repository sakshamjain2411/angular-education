import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  siteKey: any;
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
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
      this._http.get<any>("http://localhost:3000/instituteData")
        .subscribe(response=> {
          const user = response.find((userData:any)=> {
            return userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password
          })
          if(user) {
            console.log(user);
            localStorage.setItem("auth","true")
            localStorage.setItem("instituteID",user.id)
            localStorage.setItem("instituteEmail",user.email)
            localStorage.setItem("authToken", Date.now().toString())
            this.route.navigate(['institute-dashboard'])
          }else console.log("User Not Found");
          
        },error=> {
          alert("Something Went Wrong");
          console.log(error);
        })
    }
  }

}
