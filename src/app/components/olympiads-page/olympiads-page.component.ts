import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-olympiads-page',
  templateUrl: './olympiads-page.component.html',
  styleUrls: ['./olympiads-page.component.css']
})
export class OlympiadsPageComponent implements OnInit {
  routeParam: String = "";
  olympiadName: string = "";
  olympiadShortName: string = "";
  olympiadPrice: any;
  olympiadDate: any;
  olympiadsData: any;
  olympiadDescription: any;

  constructor(private activeRoute: ActivatedRoute, private route: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.getOlympiadData()
  }

  ngDoCheck() {
    this.routeParam = this.activeRoute.snapshot.params["name"];
    switch (this.routeParam) {
      case "siso":
        this.olympiadName = "Springfield International Science Olympiad"
        this.olympiadShortName = "SISO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[1].price
          this.olympiadDate = this.olympiadsData[1].date
          this.olympiadDescription = this.olympiadsData[1].description
        }
        break;
      case "simo":
        this.olympiadName = "Springfield International Maths Olympiad"
        this.olympiadShortName = "SIMO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[2].price
          this.olympiadDate = this.olympiadsData[2].date
          this.olympiadDescription = this.olympiadsData[2].description
        }
        break;
      case "sieo":
        this.olympiadName = "Springfield International English Olympiad"
        this.olympiadShortName = "SIEO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[3].price
          this.olympiadDate = this.olympiadsData[3].date
          this.olympiadDescription = this.olympiadsData[3].description
        }
        break;
      case "sico":
        this.olympiadName = "Springfield International Cyber Olympiad"
        this.olympiadShortName = "SICO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[4].price
          this.olympiadDate = this.olympiadsData[4].date
          this.olympiadDescription = this.olympiadsData[4].description
        }
        break;
      case "grads-olympiad":
        this.olympiadName = "Grads Olympiad"
        this.olympiadShortName = "SGO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[5].price
          this.olympiadDate = this.olympiadsData[5].date
          this.olympiadDescription = this.olympiadsData[5].description
        }
        break;
      case "finance-olympiad":
        this.olympiadName = "Finance Olympiad"
        this.olympiadShortName = "SFO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[6].price
          this.olympiadDate = this.olympiadsData[6].date
          this.olympiadDescription = this.olympiadsData[6].description
        }
        break;

      default:
        this.route.navigateByUrl('**');
        break;
    }
  }

  getOlympiadData() {
    this.api.getOlympiadData()
      .subscribe(response => {
        this.olympiadsData = response
      })
  }
}
