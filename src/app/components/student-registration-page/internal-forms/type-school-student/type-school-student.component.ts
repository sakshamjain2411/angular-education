import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-type-school-student',
  templateUrl: './type-school-student.component.html',
  styleUrls: ['./type-school-student.component.css']
})
export class TypeSchoolStudentComponent implements OnInit {

  schoolStudentForm!: FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.schoolStudentForm = this.formBuilder.group({
      schoolName: [""],
      schoolAddress: "",
      schoolPincode: "",
      schoolPhone: "",
      currentClass: "",
      sico: "",
      simo: ""
    })

    this.schoolStudentForm.valueChanges
    .subscribe(res => {
      console.log(res);
      
    })
  }

}
