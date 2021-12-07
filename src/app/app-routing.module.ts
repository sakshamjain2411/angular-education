import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { InstituteDashboardPageComponent } from './components/auth/institute-dashboard-page/institute-dashboard-page.component';
import { LoginPageComponent } from './components/auth/login-page/login-page.component';
import { RegisterForExamPageComponent } from './components/auth/register-for-exam-page/register-for-exam-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { CoordinatorRegistrationPageComponent } from './components/coordinator-registration-page/coordinator-registration-page.component';
import { FaqPageComponent } from './components/faq-page/faq-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InstituteRegistrationPageComponent } from './components/institute-registration-page/institute-registration-page.component';
import { InvalidPageComponent } from './components/invalid-page/invalid-page.component';
import { OlympiadsPageComponent } from './components/olympiads-page/olympiads-page.component';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { StudentRegistrationDiscountPageComponent } from './components/student-registration-discount-page/student-registration-discount-page.component';
import { StudentRegistrationPageComponent } from './components/student-registration-page/student-registration-page.component';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'faqs', component: FaqPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'reviews', component: ReviewsPageComponent},
  {path: 'schedule', component: SchedulePageComponent},
  {path: 'student-registration', component: StudentRegistrationPageComponent},
  {path: 'student-registration/:referral', component: StudentRegistrationPageComponent},
  {path: 'redeem', component: StudentRegistrationDiscountPageComponent},
  {path: 'institute-registration', component: InstituteRegistrationPageComponent},
  {path: 'coordinator-registration', component: CoordinatorRegistrationPageComponent},
  {path: 'olympiad/:name', component: OlympiadsPageComponent},
  {path: 'institute-login', component: LoginPageComponent},
  {path: 'institute-dashboard', component: InstituteDashboardPageComponent},
  {path: 'register-for-exam', component: RegisterForExamPageComponent},
  {path: 'thank-you', component: ThankYouPageComponent},
  {path: '404', component: InvalidPageComponent},
  {path: '**', redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
