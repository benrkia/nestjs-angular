import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(public http:HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:4000/tweets');
  }

  getAllofUser(id: number) {
    return this.http.get('http://localhost:4000/tweets/user/'+Number(id));
  }

  like(tweetId:number, userId:number){
    return this.http.post("http://localhost:4000/tweets/like", {tweet: tweetId, user:userId});
  }

  addTweet(tweet) {
    return this.http.post("http://localhost:4000/tweets", tweet);
  }

}
