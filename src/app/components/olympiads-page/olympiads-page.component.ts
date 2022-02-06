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
  olympiadsData: any;
  olympiadPrice: any;
  olympiadDate: any;
  olympiadEligibility: any;
  olympiadDescription: any;
  olympiadSyllabus: any;
  olympiadMode: any;
  benifitOne: any;
  benifitTwo: any;
  benifitThree: any;
  olympiadDuration: any;
  olympiadQuestionCount: any;
  air1Reward: any;
  air2Reward: any;
  air3Reward: any;
  sr1Reward: any;
  sr2Reward: any;
  sr3Reward: any;

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
          this.processOlympiadData(0)
        }
        break;
      case "simo":
        this.olympiadName = "Springfield International Maths Olympiad"
        this.olympiadShortName = "SIMO"
        if (this.olympiadsData) {
          this.processOlympiadData(1)
        }
        break;
      case "sieo":
        this.olympiadName = "Springfield International English Olympiad"
        this.olympiadShortName = "SIEO"
        if (this.olympiadsData) {
          this.processOlympiadData(2)
        }
        break;
      case "sico":
        this.olympiadName = "Springfield International Cyber Olympiad"
        this.olympiadShortName = "SICO"
        if (this.olympiadsData) {
          this.processOlympiadData(3)
        }
        break;
      case "grads-olympiad":
        this.olympiadName = "Grads Olympiad"
        this.olympiadShortName = "SGO"
        if (this.olympiadsData) {
          this.processOlympiadData(4)
        }
        break;
      case "finance-olympiad":
        this.olympiadName = "Finance Olympiad"
        this.olympiadShortName = "SFO"
        if (this.olympiadsData) {
          this.processOlympiadData(5)
        }
        break;

      default:
        this.route.navigateByUrl('**');
        break;
    }
  }

  processOlympiadData(ID:any) {
    this.olympiadPrice = this.olympiadsData[ID].price
    this.olympiadDate = this.olympiadsData[ID].examDate
    this.olympiadEligibility = this.olympiadsData[ID].eligibility
    this.olympiadDescription = this.olympiadsData[ID].description
    this.olympiadSyllabus = this.olympiadsData[ID].syllabus
    this.olympiadMode = this.olympiadsData[ID].modeOfOlympiad
    this.benifitOne = this.olympiadsData[ID].benefit1
    this.benifitTwo = this.olympiadsData[ID].benefit2
    this.benifitThree = this.olympiadsData[ID].benefit3
    this.olympiadDuration = this.olympiadsData[ID].duration
    this.olympiadQuestionCount = this.olympiadsData[ID].noOfQuestions
    this.air1Reward = this.olympiadsData[ID].AIR1
    this.air2Reward = this.olympiadsData[ID].AIR2
    this.air3Reward = this.olympiadsData[ID].AIR3
    this.sr1Reward = this.olympiadsData[ID].SR1
    this.sr2Reward = this.olympiadsData[ID].SR2
    this.sr3Reward = this.olympiadsData[ID].SR3
  }

  getOlympiadData() {
    this.api.getOlympiadData()
    .subscribe(response => {
      this.olympiadsData = response
    })
  }
}
