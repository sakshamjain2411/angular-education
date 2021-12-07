import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent implements OnInit {

  testimonialsData:any
  filterForm!: FormGroup
  pagination:number = 1
  limit:number = 10
  filterFormData:object = []
  constructor(private api:ApiService, private formBuilder:FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.api.getTestimonialsData()
    .subscribe(res => {
      this.testimonialsData = res
    })

    this.filterForm = this.formBuilder.group({
      sortBy: [],
      order: [""],
      category: [""],
      page: [1],
      limit:[this.limit]
    })

    this.filterForm.valueChanges
    .subscribe(res => {
      console.log(res);
      this.filterFormData = res
      this.getTestimonialsData(res.sortBy,res.order,res.category,res.page,res.limit)
    })
  }

  getTestimonialsData(sort:string, order:string, category:string, page:number, limit:number) {
    this.api.getTestimonialsData(sort,order,category,page)
    .subscribe(res => {
      this.testimonialsData = res
    })
  }

  onNextClick() {
    this.pagination++
    this.filterForm.value.page = this.pagination
    this.getTestimonialsData(this.filterForm.value.sortBy, this.filterForm.value.order, this.filterForm.value.category, this.filterForm.value.page, this.filterForm.value.limit)
    // this.getTestimonialsData(this.filterFormData, this.filterFormData['order'],this.filterFormData['category'],this.pagination)
  }

  onPrevClick() {
    this.pagination--
    this.filterForm.value.page = this.pagination
    this.getTestimonialsData(this.filterForm.value.sortBy, this.filterForm.value.order, this.filterForm.value.category, this.filterForm.value.page, this.filterForm.value.limit)
  }

  addReview() {
    this.route.navigate(['/add-testimonial'])
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: false
  }

  getNumberArray(number:number) {
    let numberArray = []
    for(let i =1; i<=number; i++) {
      numberArray.push(i)
    }
    return numberArray
  }

  pageTitle:String = "Reviews"

}
