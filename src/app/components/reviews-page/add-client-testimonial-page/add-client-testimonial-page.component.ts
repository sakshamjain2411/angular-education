import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ClientTestimonialModel } from './add-client-testimonial.model';

@Component({
  selector: 'app-add-client-testimonial-page',
  templateUrl: './add-client-testimonial-page.component.html',
  styleUrls: ['./add-client-testimonial-page.component.css']
})
export class AddClientTestimonialPageComponent implements OnInit {

  siteKey:any
  today!:string
  date = new Date()
  successAlert:boolean = false
  testimonailForm!:FormGroup
  testimonialDataObject:ClientTestimonialModel = new ClientTestimonialModel()
  constructor(private formBuilder:FormBuilder, private api:ApiService, private route:Router) { }

  ngOnInit(): void {
    this.testimonailForm = this.formBuilder.group({
      clientName: ["", Validators.required],
      review: ["", Validators.required],
      rating: [5, Validators.required],
      reviewerType: ["", Validators.required],
      reviewCategory: ["", Validators.required],
      recaptcha: ["", Validators.required]
    })

    this.siteKey = "6LdPt2QdAAAAAKzEQ8FFDOwIqnUzdFXsQHATjbHT"
    this.today =  this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDate()
    
  }

  onTestimonialFormSubmit() {
    console.log("Called");
    
    if(this.testimonailForm.valid) {
      this.postClientTestimonial()
    }
  }

  postClientTestimonial() {
    this.testimonialDataObject.clientName = this.testimonailForm.value.clientName
    this.testimonialDataObject.review = this.testimonailForm.value.review
    this.testimonialDataObject.rating = this.testimonailForm.value.rating
    this.testimonialDataObject.reviewerType = this.testimonailForm.value.reviewerType
    this.testimonialDataObject.reviewCategory = this.testimonailForm.value.reviewCategory
    this.testimonialDataObject.reviewDate = this.today

    this.api.postTestimonialData(this.testimonialDataObject)
    .subscribe(res => {
      this.successAlert = true
      this.testimonailForm.reset()
      setTimeout(() => {
        this.route.navigate(['/reviews'])
      }, 3000);
    })
  }

}
