import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JsPreloaderComponent } from './components/js-preloader/js-preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturesComponent } from './components/features/features.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { SupportComponent } from './components/support/support.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        JsPreloaderComponent,
        HeaderComponent,
        FooterComponent,
        FeaturesComponent,
        ConfigurationComponent,
        SupportComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
    ],
    providers: [
        AuthGuardService,
        PathLocationStrategy,
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }