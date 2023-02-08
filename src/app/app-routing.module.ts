import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FeaturesComponent } from './components/pages/features/features.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { SupportComponent } from './components/pages/support/support.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { MenuName } from './enums/menu-name';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { StorageService } from './services/storage.service';

const routes: Routes = [
    { data: { menu: false, name: MenuName.None, icon: null }, title: 'Home', path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { data: { menu: true, name: MenuName.Navigation, icon: 'home' }, title: 'Home', path: 'home', component: HomeComponent }, 
    { data: { menu: true, name: MenuName.Navigation, icon: 'description' }, title: 'Features', path: 'features', component: FeaturesComponent },
    { data: { menu: true, name: MenuName.Navigation, icon: 'help' }, title: 'Help', path: 'support', component: SupportComponent },
    { data: { menu: !StorageService.HasAuth(), name: MenuName.Navigation, icon: 'login' }, title: 'Login', path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { data: { menu: StorageService.HasAuth(), name: MenuName.Profile, icon: 'settings' }, title: 'Configuration', path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuardService] },
    { data: { menu: StorageService.HasAuth(), name: MenuName.Profile, icon: 'editor' }, title: 'Dashboard', path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { data: { menu: StorageService.HasAuth(), name: MenuName.Profile, icon: 'analytics' }, title: 'Statistics', path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardService] },
    { data: { menu: false, name: MenuName.None, icon: null }, title: 'Privacy Policy', path: 'privacy-policy', component: PrivacyPolicyComponent },
    { data: { menu: false, name: MenuName.None, icon: null }, title: 'Terms and Conditions', path: 'terms-and-conditions', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
