import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { NewsLetterModel } from './footer-newsletter.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newsletterForm!: FormGroup
  newsletterDataObject: NewsLetterModel = new NewsLetterModel
  newsletterSubmited: boolean = false

  @Input()
    pageTitle: string | undefined; 
  
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.pageTitle = this.pageTitle?.toLowerCase();
    this.newsletterForm = this.formBuilder.group({
      name: [""],
      email: ["", [Validators.required, Validators.email]],
    })
  }

  onNewsLetterFormSubmit() {
    this.newsletterDataObject.name = this.newsletterForm.value.name
    this.newsletterDataObject.email = this.newsletterForm.value.email
    this.api.postNewsLetterData(this.newsletterDataObject)
    .subscribe(res => {
      this.newsletterForm.reset()
      this.newsletterSubmited = true
    })
  }
}
