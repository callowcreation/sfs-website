import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase, connectDatabaseEmulator } from '@angular/fire/database';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard.service';
import { StorageService } from './services/storage.service';
import { LoaderService } from './services/loader.service';
import { PopupService } from './services/popup.service';

import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { TokenHeaderInterceptor } from './interceptors/token-header.interceptor';

import { LazyImgDirective } from './directives/lazy-img.directive';

import { JsPreloaderComponent } from './components/js-preloader/js-preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { EmbeddedComponent } from './components/embedded/embedded.component';
import { InstallComponent } from './components/install/install.component';
import { LegacyViewComponent } from './components/legacy-view/legacy-view.component';

import { AppearanceComponent } from './components/templates/appearance/appearance.component';
import { LegacyComponent } from './components/templates/legacy/legacy.component';
import { ContactUsComponent } from './components/templates/contact-us/contact-us.component';
import { FAQPanel } from './components/templates/faq-panel/faq-panel.component';

import { TermsComponent } from './components/pages/terms/terms.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FeaturesComponent } from './components/pages/features/features.component';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { SupportComponent } from './components/pages/support/support.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HelpPanelComponent } from './components/templates/help-panel/help-panel.component';

import { environment } from '../environments/environment';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotAuthorizedComponent } from './components/pages/not-authorized/not-authorized.component';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { DisplayNamePipe } from './pipes/display-name.pipe';

const matModules: (any[] | Type<any> | ModuleWithProviders<{}>) = [
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
    MatSortModule,
    MatDialogModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressBarModule
];

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
        FAQPanel,
        ConfirmDialogComponent,
        HelpPanelComponent,
        NotAuthorizedComponent,
        DisplayNamePipe
    ],
    entryComponents: [ConfirmDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),

        provideAuth(() => getAuth()),
        provideDatabase(() => {
            const db = getDatabase();
            if (environment.useEmulators === true) {
                connectDatabaseEmulator(db, 'localhost', 9001);
            }
            return db;
        }),
        BrowserAnimationsModule,
        matModules
    ],
    providers: [
        AuthGuardService,
        StorageService,
        LoaderService,
        PopupService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenHeaderInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }