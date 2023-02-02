import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './interceptors/user.interceptor';
import { StorageService } from './services/storage.service';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { TokenHeaderInterceptor } from './interceptors/token-header.interceptor';
import { LazyImgDirective } from './directives/lazy-img.directive';
import { PopupService } from './services/popup.service';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { EmbeddedComponent } from './components/embedded/embedded.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstallComponent } from './components/install/install.component';
import { LegacyViewComponent } from './components/legacy-view/legacy-view.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AppearanceComponent } from './components/templates/appearance/appearance.component';
import { LegacyComponent } from './components/templates/legacy/legacy.component';
import { ContactUsComponent } from './components/templates/contact-us/contact-us.component';
import { FAQPanel } from './components/templates/faq-panel/faq-panel.component';

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
        LazyImgDirective,
        TermsComponent,
        PrivacyPolicyComponent,
        SectionHeaderComponent,
        ScrollToTopComponent,
        EmbeddedComponent,
        DashboardComponent,
        InstallComponent,
        LegacyViewComponent,
        StatisticsComponent,
        AppearanceComponent,
        LegacyComponent,
        ContactUsComponent,
        FAQPanel
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        BrowserAnimationsModule,
        MatRippleModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSliderModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule,
        MatTabsModule,
        MatSortModule
    ],
    providers: [
        AuthGuardService,
        StorageService,
        LoaderService,
        PopupService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenHeaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }