import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  websiteCoreData: any;
  testimonialsData: any;
  websiteNews: any
  registeredInstitutes!: string;
  registeredIndividuals!: string;
  registeredCoordinators!: string;
  registerButtonStatus: any
  scheduleButtonStatus: any
  subHeading: any
  pageTitle: String = "Home"
  constructor(private api:ApiService) {
  }

  ngOnInit(): void {
    this.api.getWebsiteCoreData()
    .subscribe(response => {
      this.websiteCoreData = response
      this.registeredInstitutes = response.registeredInstitutes
      this.registeredIndividuals = response.registeredIndividuals
      this.registeredCoordinators = response.registeredCoordinators
      this.registerButtonStatus = response.registerButtonStatus
      this.scheduleButtonStatus = response.scheduleButtonStatus
      this.subHeading = response.headline
      this.websiteNews = response.news
    })

    this.api.getTesimonialDataWithAdminApproval()
    .subscribe(res => {
      this.testimonialsData = res
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
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
        items: 1
      }
    }
  }

  getNumberArray(number:number) {
    let numberArray = []
    for(let i =1; i<=number; i++) {
      numberArray.push(i)
    }
    return numberArray
  }
}
