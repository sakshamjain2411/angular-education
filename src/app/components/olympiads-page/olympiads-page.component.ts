import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-olympiads-page',
  templateUrl: './olympiads-page.component.html',
  styleUrls: ['./olympiads-page.component.css']
})
export class OlympiadsPageComponent implements OnInit {
  routeParam:String = "";
  olympiadName:string = "";
  olympiadShortName:string = "";

  constructor(private activeRoute: ActivatedRoute, private route: Router) { 

  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.routeParam = this.activeRoute.snapshot.params["name"];
    switch (this.routeParam) {
      case "siso":
        this.olympiadName = "Springfield International Science Olympiad"
        this.olympiadShortName = "SISO"
        break;
      case "simo":
        this.olympiadName = "Springfield International Maths Olympiad"
        this.olympiadShortName = "SIMO"
        break;
      case "sieo":
        this.olympiadName = "Springfield International English Olympiad"
        this.olympiadShortName = "SIEO"
        break;
      case "sico":
        this.olympiadName = "Springfield International Cyber Olympiad"
        this.olympiadShortName = "SICO"
        break;
      case "grads-olympiad":
        this.olympiadName = "Springfield Grads Olympiad"
        this.olympiadShortName = "SGO"
        break;
      case "finance-olympiad":
        this.olympiadName = "Springfield Finance Olympiad"
        this.olympiadShortName = "SFO"
        break;
    
      default:
        this.route.navigateByUrl('**');
        break;
    }
  }
}
