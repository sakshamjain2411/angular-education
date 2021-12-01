import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  registerButtonStatus: any
  scheduleButtonStatus: any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getWebsiteCoreData()
      .subscribe(response => {
        this.registerButtonStatus = response.registerButtonStatus
        this.scheduleButtonStatus = response.scheduleButtonStatus
      })
  }

}
