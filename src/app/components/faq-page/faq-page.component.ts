import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  faqDataObject:any

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getFaqData()
    .subscribe(res => {
      this.faqDataObject = res
    })
  }

  pageTitle:string = "FAQs";
}
