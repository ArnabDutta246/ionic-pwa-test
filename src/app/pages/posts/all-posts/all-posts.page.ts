import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/shared/db/db.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit,OnDestroy {
  // observables
  posts$:Subscription;
  // variables
  posts:any = [];
  constructor(private db:DbService) { }

  ngOnInit() {
  this.getAllPosts();
  }
  ngOnDestroy(){
    this.posts$.unsubscribe()
  }
  // get all posts
  getAllPosts(){
    this.posts$ = this.db.getPosts().subscribe(
      (res)=>{
        console.log("api res",res);
        this.posts = res;
      },
      (err)=>{throw err}
    )
  }     c   
  
}
// in position grab the breakdown        