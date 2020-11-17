import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { CommentCreateComponent } from "./comment-create/comment-create.component";

const routes: Routes = [
  {
    path: "",
    component: PostsListComponent,
    children: [
      {
        path: ":postId/:commentId/comment-edit",
        component: CommentCreateComponent,
      },
      { path: ":postId/comment-create", component: CommentCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
