import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterCanActiveFilterService } from './handers/router-can-active-filter.service';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserComponent } from './user/user.component';
import { ROLE } from './utils/biz-constant';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'home', component: NavigationComponent,
    children: [
      {path: '', component: WelcomeComponent},
      {path: 'user', component: UserComponent,canActivate: [ RouterCanActiveFilterService ], 
      data: {
        roles: [ROLE.ADMIN]
      }},
    ]
  },

  {
    path: 'login', component: LoginComponent,
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
