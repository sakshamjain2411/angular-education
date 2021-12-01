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
        }
        break;
      case "simo":
        this.olympiadName = "Springfield International Maths Olympiad"
        this.olympiadShortName = "SIMO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[2].price
          this.olympiadDate = this.olympiadsData[2].date
        }
        break;
      case "sieo":
        this.olympiadName = "Springfield International English Olympiad"
        this.olympiadShortName = "SIEO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[3].price
          this.olympiadDate = this.olympiadsData[3].date
        }
        break;
      case "sico":
        this.olympiadName = "Springfield International Cyber Olympiad"
        this.olympiadShortName = "SICO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[4].price
          this.olympiadDate = this.olympiadsData[4].date
        }
        break;
      case "grads-olympiad":
        this.olympiadName = "Springfield Grads Olympiad"
        this.olympiadShortName = "SGO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[5].price
          this.olympiadDate = this.olympiadsData[5].date
        }
        break;
      case "finance-olympiad":
        this.olympiadName = "Springfield Finance Olympiad"
        this.olympiadShortName = "SFO"
        if (this.olympiadsData) {
          this.olympiadPrice = this.olympiadsData[6].price
          this.olympiadDate = this.olympiadsData[6].date
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
