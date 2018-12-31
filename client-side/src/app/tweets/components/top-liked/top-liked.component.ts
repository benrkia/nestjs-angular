import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { ITweet } from 'src/app/interfaces/tweet.interface';
import { TweetsService } from '../../shared/tweets.service';
import { AuthenticationService } from 'src/app/authentication/shared/authentication.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';

@Component({
  selector: 'app-top-liked',
  templateUrl: './top-liked.component.html',
  styleUrls: ['./top-liked.component.css']
})
export class TopLikedComponent implements OnInit {

  tweets: ITweet[];
  user: IUser;

  constructor(private tweetsService:TweetsService, private authenticationService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit() {

    this.tweetsService.getAll()
    .subscribe((tweets) => {
      this.tweets = (<Array<ITweet>>tweets).filter(tweet => tweet.likes.length !== 0);
      this.tweets.sort((t1, t2) => {
        if(t1.likes.length > t2.likes.length){
          return -1;
        }
        else if(t1.likes.length === t2.likes.length){
          if(t1.creationDate > t2.creationDate){
            return -1;
          }
          else {
            return 1;
          }
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

}
