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

  navToggleOnClick() {
    this.navBarToggle = !this.navBarToggle
  }

  closeMobileNav() {
    if(innerWidth < 600) {
      this.navBarToggle = false;
    }
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
