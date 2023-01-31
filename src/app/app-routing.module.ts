import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [{ path: 'callback', component: CallbackComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
