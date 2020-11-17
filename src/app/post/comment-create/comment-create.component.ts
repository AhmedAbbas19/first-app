import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PostsService } from "./../posts.service";

import { Comment } from "./../models/comment.model";

@Component({
  selector: "app-comment-create",
  templateUrl: "./comment-create.component.html",
  styleUrls: ["./comment-create.component.css"],
})
export class CommentCreateComponent implements OnInit {
  postId: number;
  commentId: number;
  editMode = false;

  commentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.commentForm = new FormGroup({
      body: new FormControl(null, Validators.required),
      postId: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.postId = +params.postId;
      this.commentForm.get("postId").setValue(this.postId);
      this.commentId = +params.commentId;
      this.editMode = !!this.commentId;
    });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }

    let comment = this.commentForm.value;

    if (this.editMode) {
      comment["id"] = this.commentId;
      this.postsService
        .updateComment(comment)
        .subscribe((res: Comment) => this.postsService.onUpdateComment(res));
    } else {
      this.postsService
        .addComment(comment)
        .subscribe((res: Comment) => this.postsService.onAddComment(res));
    }
  }
}
