import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
