import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  pageTitle:String = "About";
  constructor(private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
