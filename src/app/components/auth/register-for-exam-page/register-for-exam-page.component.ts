import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-for-exam-page',
  templateUrl: './register-for-exam-page.component.html',
  styleUrls: ['./register-for-exam-page.component.css']
})
export class RegisterForExamPageComponent implements OnInit {

  successAlert: boolean = false
  instituteEmail:any
  constructor() { }

  ngOnInit(): void {
    this.instituteEmail = localStorage.getItem("instituteEmail");
  }

  

}
