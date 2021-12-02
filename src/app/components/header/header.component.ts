import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  navBarToggle:boolean = false
  navMobile:any
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.navBarToggle = document.querySelector(".mobile-nav-toggle")
    // this.navMobile = document.querySelector("#navbar")
    // on('click', '.mobile-nav-toggle', function (e) {
      //   select('#navbar').classList.toggle('navbar-mobile')
      //   this.classList.toggle('bi-list')
      //   this.classList.toggle('bi-x')
      //   console.log(this)
      // })
  }

  navToggleOnClick() {
    this.navBarToggle = !this.navBarToggle
  }

  drownDownToggleOnClick(event:any) {
    if(event.srcElement.tagName == "A") {
      event.srcElement.nextElementSibling.classList.toggle('dropdown-active')
    }
    else {
      event.srcElement.parentElement.nextElementSibling.classList.toggle('dropdown-active')
    }
  }

}
