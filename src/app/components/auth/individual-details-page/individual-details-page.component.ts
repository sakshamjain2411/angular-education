import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-individual-details-page',
  templateUrl: './individual-details-page.component.html',
  styleUrls: ['./individual-details-page.component.css']
})
export class IndividualDetailsPageComponent implements OnInit {

  routeParam:any
  individualDetailsDataObject: any;

  constructor(private activeRoute:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.routeParam = this.activeRoute.snapshot.params['examId'];
    
    this.api.getIndividualExamData(this.routeParam)
    .subscribe(res => {
      this.individualDetailsDataObject = res
    })
  }

}
