import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HomeComponent } from './home/home.component';
import { ProjectModule } from './project/project.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }
      // { path: '', redirectTo: 'projects', pathMatch: 'full' },
      // { path: '**', redirectTo: 'projects', pathMatch: 'full' }
    ]),
    ProjectModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
