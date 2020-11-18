import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { forkJoin } from "rxjs/observable/forkJoin";
import { map } from "rxjs/operators";
import { Post } from "./models/post.model";
import { Comment } from "./models/comment.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class PostsService {
  baseURL: string;
  posts: Post[] = [];
  postsSub = new Subject<Post[]>();

  constructor(private http: HttpClient) {
    this.baseURL = "http://my-json-server.typicode.com/typicode/demo";
  }

  getAll(): Observable<Post[]> {
    return forkJoin([this.getAllPosts(), this.getAllComments()]).pipe(
      map((data: any[]) => {
        let posts: Post[] = data[0];
        let comments: Comment[] = data[1];
        let postsMap = this.postsMap(posts);

        comments.forEach((comment) => {
          let postComments = postsMap[comment.postId].comments || [];
          postsMap[comment.postId]["comments"] = [...postComments, comment];
        });
        this.posts = Object.values(postsMap);
        return this.posts;
      })
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseURL}/posts`);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/comments`);
  }

  addComment(comment: Comment) {
    return this.http.post(`${this.baseURL}/comments`, comment);
  }

  updateComment(comment: Comment) {
    return this.http.patch(`${this.baseURL}/comments/${comment.id}`, comment);
  }

  postsMap(posts: Post[]) {
    return posts.reduce((acc, el) => {
      return { ...acc, [el.id]: el };
    }, {});
  }

  onAddComment(comment: Comment) {
    this.posts = this.posts.map((post) => {
      if (post.id === comment.postId) {
        post.comments = post.comments ? [...post.comments, comment] : [comment];
      }
      return post;
    });
    this.postsSub.next(this.posts);
  }

  onUpdateComment(comment: Comment) {
    const postIdx = this.posts.findIndex((post) => post.id === comment.postId);
    if (postIdx === -1) return;
    this.posts[postIdx].comments = this.posts[postIdx].comments.map((com) => {
      if (com.id === comment.id) {
        return comment;
      }
      return com;
    });
    this.postsSub.next(this.posts);
  }
}
