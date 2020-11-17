import { NgModule } from "@angular/core";
import { PostRoutingModule } from "./post-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { CompletePostComponent } from "./complete-post/complete-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";

import { PostsService } from "./posts.service";
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    CompletePostComponent,
    PostsListComponent,
    CommentCreateComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PostsService],
})
export class PostModule {}
