import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ClientTestimonialModel } from './add-client-testimonial.model';
import { environment } from 'src/environments/environment';

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
  reviewerTypeStudent:boolean = true
  reviewerTypeOther:boolean = true
  testimonailForm!:FormGroup
  testimonialDataObject:ClientTestimonialModel = new ClientTestimonialModel()
  constructor(private formBuilder:FormBuilder, private api:ApiService, private route:Router) { }

  ngOnInit(): void {
    this.testimonailForm = this.formBuilder.group({
      clientName: ["", Validators.required],
      review: ["", Validators.required],
      rating: [5, Validators.required],
      reviewerType: ["", Validators.required],
      siso: [""],
      simo: [""],
      sieo: [""],
      sico: [""],
      grads: [""],
      finance: [""],
      recaptcha: ["", Validators.required]
    })

    this.testimonailForm.valueChanges
    .subscribe(res => {
      if(res.siso || res.simo || res.sieo || res.sico) {
        this.reviewerTypeStudent = true
        this.reviewerTypeOther = false
      } else if (res.grads || res.finance) {
        this.reviewerTypeStudent = false
        this.reviewerTypeOther = true
      }
      else {
        this.reviewerTypeStudent = true
        this.reviewerTypeOther = true
      }
    })

    this.siteKey = environment.reCaptchaSiteKey
    this.today =  this.date.getFullYear()+"-"+this.date.getMonth()+"-"+this.date.getDate()
    
  }

  onTestimonialFormSubmit() {
    if(this.testimonailForm.valid) {
      this.postClientTestimonial()
    }
  }

  getReviewCategory():string {
    let reviewCategory = ""
    if(this.testimonailForm.value.siso == true) {
      reviewCategory = reviewCategory+"'SISO,'";
    }
    if(this.testimonailForm.value.simo == true) {
      reviewCategory = reviewCategory+"'SIMO,'";
    }
    if(this.testimonailForm.value.sieo == true) {
      reviewCategory = reviewCategory+"'SIEO,'";
    }
    if(this.testimonailForm.value.sico == true) {
      reviewCategory = reviewCategory+"'SICO,'";
    }
    if(this.testimonailForm.value.grads == true) {
      reviewCategory = reviewCategory+"'GRADS,'";
    }
    if(this.testimonailForm.value.finance == true) {
      reviewCategory = reviewCategory+"'FINANCE,'";
    }
    return reviewCategory.trim();
  }

  postClientTestimonial() {
    this.testimonialDataObject.clientName = this.testimonailForm.value.clientName
    this.testimonialDataObject.review = this.testimonailForm.value.review
    this.testimonialDataObject.rating = this.testimonailForm.value.rating
    this.testimonialDataObject.reviewerType = this.testimonailForm.value.reviewerType
    this.testimonialDataObject.reviewCategory = this.getReviewCategory()
    this.testimonialDataObject.reviewDate = this.today

    let testimonialObject = {
      "name": this.testimonailForm.value.clientName,
      "type": this.testimonailForm.value.reviewerType,
      "review": this.testimonailForm.value.review,
      "rating": this.testimonailForm.value.rating,
      "forExams":[this.getReviewCategory()]
    }

    this.api.postTestimonialData(testimonialObject)
    .subscribe(res => {
      this.successAlert = true
      this.testimonailForm.reset()
      setTimeout(() => {
        this.route.navigate(['/reviews'])
      }, 3000);
    })
  }

}
