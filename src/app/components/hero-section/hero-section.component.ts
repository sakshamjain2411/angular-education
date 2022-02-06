import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements OnInit {

  subHeading: any
  constructor(private api:ApiService) { }

  @Input()registerButtonStatus: any
  @Input()scheduleButtonStatus: any

  ngOnInit(): void {
  }

}
