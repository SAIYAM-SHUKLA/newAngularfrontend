import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { Signup } from './pages/signup/signup';
import { Addproduct } from './pages/addproduct/addproduct';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile},
    {path: 'reg', component : Signup},
    {path: 'addpro', component : Addproduct}
];
