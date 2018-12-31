import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import { IUser } from 'src/app/interfaces/user.interface';
import { TweetsService } from 'src/app/tweets/shared/tweets.service';
import { ITweet } from 'src/app/interfaces/tweet.interface';
import { AuthenticationService } from 'src/app/authentication/shared/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tweets: ITweet[];
  user: IUser;

  constructor(private usersService: UsersService,
    private tweetsService: TweetsService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.usersService.getUser(id)
      .subscribe(user => {
        if(user ==  null)
          this.router.navigate(['404']);
      });
      
      this.tweetsService.getAllofUser(id).subscribe((tweets) => {
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
