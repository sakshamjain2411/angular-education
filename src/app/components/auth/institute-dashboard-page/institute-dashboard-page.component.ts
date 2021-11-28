import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-dashboard-page',
  templateUrl: './institute-dashboard-page.component.html',
  styleUrls: ['./institute-dashboard-page.component.css']
})
export class InstituteDashboardPageComponent implements OnInit {

  authStatus:any
  instituteID:any
  instituteEmail:any
  authToken:any
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.authStatus = localStorage.getItem("auth")
    this.instituteID = localStorage.getItem("instituteID")
    this.instituteID = localStorage.getItem("instituteEmail")
    this.authToken = localStorage.getItem("authToken")
    console.log(this.authStatus)
    if(this.authStatus === "true" && this.instituteID) {
      console.log(localStorage.getItem("instituteID"))
      this.checkTokenValidity(this.authToken)
      this.tokenTimeout()
    }
    else {
      this.route.navigate(['institute-login'])
    }
  }

  onLogoutButtonClick() {
    localStorage.removeItem("auth")
    localStorage.removeItem("instituteID")
    localStorage.removeItem("instituteEmail")
    localStorage.removeItem("authToken")
    this.route.navigate(['institute-login'])
  }

  checkTokenValidity(authToken:String) {
    let now = Date.now();
    if(now - Number(authToken) > 7200000) {
      alert("Token Expired");
      this.onLogoutButtonClick()
    }

  }

  tokenTimeout() {
    setTimeout(() => {
      alert("Token Expired Please Login Again")
      this.onLogoutButtonClick()
    }, 7200000);
  }

}
