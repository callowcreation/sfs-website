import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

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

        provideFirebaseApp(() => initializeApp(environment.firebase)),
        
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase())
    ],
    providers: [AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule { }