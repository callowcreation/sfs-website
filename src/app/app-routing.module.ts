import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { SupportComponent } from './components/support/support.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { data: { menu: false }, title: 'Home', path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { data: { menu: true }, title: 'Home', path: 'home', component: HomeComponent }, 
    { data: { menu: true }, title: 'Features', path: 'features', component: FeaturesComponent },
    { data: { menu: true }, title: 'Help', path: 'support', component: SupportComponent },
    { data: { menu: false }, title: 'Configuration', path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
