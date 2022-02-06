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

  dropDownToggleOnClick(event:any) {
    if(event.srcElement.className == "dropdownToggle") {
      event.srcElement.nextElementSibling.classList.toggle('dropdown-active')
    }
    else if(event.srcElement.tagName == "I") {
      event.srcElement.parentElement.nextElementSibling.classList.toggle('dropdown-active')
    }
  }

}
