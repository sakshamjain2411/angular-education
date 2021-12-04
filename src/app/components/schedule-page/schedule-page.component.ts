import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  olympiadSchedule:any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getOlympiadScheduleData()
      .subscribe(res => {
        console.log(res)
        this.olympiadSchedule = res
      })
  }

}
