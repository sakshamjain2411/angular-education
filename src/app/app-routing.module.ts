import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { FaqPageComponent } from './components/faq-page/faq-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InvalidPageComponent } from './components/invalid-page/invalid-page.component';
import { OlympiadsPageComponent } from './components/olympiads-page/olympiads-page.component';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { StudentRegistrationPageComponent } from './components/student-registration-page/student-registration-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'faqs', component: FaqPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'reviews', component: ReviewsPageComponent},
  {path: 'student-registration', component: StudentRegistrationPageComponent},
  {path: 'olympiad/:name', component: OlympiadsPageComponent},
  {path: '404', component: InvalidPageComponent},
  {path: '**', redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
