import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTweetsComponent } from './tweets/components/all-tweets/all-tweets.component';
import { TopLikedComponent } from './tweets/components/top-liked/top-liked.component';
import { ProfileComponent } from './users/components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:'', redirectTo: '/newest-tweets', pathMatch: 'full'},
  {path:'newest-tweets', component:AllTweetsComponent},
  {path:'top-liked', component:TopLikedComponent},
  {path: 'users/:id', component:ProfileComponent},
  {path: '404', component:NotFoundComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
