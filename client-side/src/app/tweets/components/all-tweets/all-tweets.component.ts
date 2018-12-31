import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../../shared/tweets.service';
import { ITweet } from 'src/app/interfaces/tweet.interface';
import { AuthenticationService } from 'src/app/authentication/shared/authentication.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.css']
})
export class AllTweetsComponent implements OnInit {

  tweets: ITweet[];
  user: IUser;
  Editor = ClassicEditor;
  data = "";

  constructor(private tweetsService:TweetsService, private authenticationService: AuthenticationService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {

    this.tweetsService.getAll().subscribe((tweets) => {
      this.tweets = <Array<ITweet>> tweets;
      this.tweets.sort((t1, t2) => {
        if(t1.creationDate > t2.creationDate){
          return -1;
        }
        else {
          return 1;
        }
      })
    });

    this.authenticationService.getLoggedUser().subscribe(user => {
      this.user = <IUser>user;
    },
    err => {
      this.authenticationService.logOut();
    });

  }

  loggedIn() {
    return this.authenticationService.loggedIn();
  }

  isLiked(tweet: ITweet){
    if(!this.user)
      return false;
    const fTweet = this.user.likedTweets.find(t=>t.id===tweet.id);
    return !!fTweet;
  }

 presslike(tweet:ITweet){
   if(!this.loggedIn()){
    const modalRef = this.modalService.open(LoginComponent, {size: 'sm'});
    return;
   }
   this.tweetsService.like(tweet.id, this.user.id).subscribe(
     res=>{
      if(this.isLiked(tweet)){
        const index = tweet.likes.findIndex(u => u.id == this.user.id);
        tweet.likes.splice(index, 1);
        const index2 = this.user.likedTweets.findIndex(t => t.id == tweet.id);
        this.user.likedTweets.splice(index2, 1);
      }else {
        tweet.likes.push(this.user);
        this.user.likedTweets.push(tweet);
      }
    },
    err=>console.log(err));
 }

 addTweet() {
   let tweet = {title: "test tweet", content: this.data, user: this.user, creationDate: new Date()};
   this.tweetsService.addTweet(tweet).subscribe(res => {
      this.router.navigate(['/users/'+this.user.id]);
   }, err => {
     console.log(err);
   })
 }

 onChange({ editor }: ChangeEvent){
  this.data = editor.getData();
 }

}
