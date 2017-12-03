import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// use either one below
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { ProjectModule } from './project/project.module';
import { ReviewModule } from './review/review.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
  // { path: '', redirectTo: 'projects', pathMatch: 'full' },
  // { path: '**', redirectTo: 'projects', pathMatch: 'full' }
];

@NgModule({
  // components
  declarations: [AppComponent, LoginComponent, HomeComponent],
  // module
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ProjectModule,
    ReviewModule
  ],
  // service
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
