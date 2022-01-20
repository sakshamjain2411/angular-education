import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processing-data-page',
  templateUrl: './processing-data-page.component.html',
  styleUrls: ['./processing-data-page.component.css']
})
export class ProcessingDataPageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  backToDashboard() {
    this.route.navigate(['/institute-dashboard'])
  }

}
