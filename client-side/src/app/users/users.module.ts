import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersService } from './shared/users.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  providers: [UsersService],
})
export class UsersModule { }
