import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTweetsComponent } from './components/all-tweets/all-tweets.component';

import { TopLikedComponent } from './components/top-liked/top-liked.component';
import { TweetsService } from './shared/tweets.service';
import { AppRoutingModule } from '../app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AllTweetsComponent, TopLikedComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    CKEditorModule

  ],
  providers: [TweetsService],
})
export class TweetsModule { }
