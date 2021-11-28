import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ReactiveFormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqPageComponent } from './components/faq-page/faq-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { OlympiadsPageComponent } from './components/olympiads-page/olympiads-page.component';
import { InvalidPageComponent } from './components/invalid-page/invalid-page.component';
import { StudentRegistrationPageComponent } from './components/student-registration-page/student-registration-page.component';
import { InstituteRegistrationPageComponent } from './components/institute-registration-page/institute-registration-page.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { InstituteDashboardPageComponent } from './components/auth/institute-dashboard-page/institute-dashboard-page.component';
import { RegisterForExamPageComponent } from './components/auth/register-for-exam-page/register-for-exam-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroSectionComponent,
    FooterComponent,
    FaqPageComponent,
    HomePageComponent,
    ContactPageComponent,
    AboutPageComponent,
    ReviewsPageComponent,
    BreadcrumbsComponent,
    OlympiadsPageComponent,
    InvalidPageComponent,
    StudentRegistrationPageComponent,
    InstituteRegistrationPageComponent,
    LoginPageComponent,
    InstituteDashboardPageComponent,
    RegisterForExamPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
