import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './login/login.service';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent }
      // { path: '', redirectTo: 'projects', pathMatch: 'full' },
      // { path: '**', redirectTo: 'projects', pathMatch: 'full' }
    ])
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
