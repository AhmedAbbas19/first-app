import { Component, OnInit } from "@angular/core";
import { merge } from "rxjs/observable/merge";
import { map } from "rxjs/operator/map";
import { mergeMap, tap } from "rxjs/operators";
import { Post } from "../models/post.model";
import { PostsService } from "./../posts.service";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.css"],
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    merge(this.postsService.getAll(), this.postsService.postsSub).subscribe(
      (posts) => (this.posts = posts)
    );
  }
}
