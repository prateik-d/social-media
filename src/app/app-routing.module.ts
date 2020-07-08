import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);
const redirectLogin = redirectUnauthorizedTo(['login']);


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  
  { 
    path: 'dashboard', 
    ...canActivate(redirectLogin), 
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  
  // { path: 'reistration', loadChildren: './registration/registration.module#RegistrationPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'profile',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-settings',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./profile-settings/profile-settings.module').then( m => m.ProfileSettingsPageModule)
  },
  {
    path: 'upload',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'add-post',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./post/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit-post/:id',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./post/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'view-post/:id',
    ...canActivate(redirectLogin),
    loadChildren: () => import('./post/view/view.module').then( m => m.ViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }