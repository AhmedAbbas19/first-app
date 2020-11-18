import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs/observable/of";
import { Post } from "../models/post.model";
import { PostsService } from "../posts.service";
import { CompletePostComponent } from "./../complete-post/complete-post.component";

import { PostsListComponent } from "./posts-list.component";

describe("PostsListComponent", () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsListComponent, CompletePostComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [PostsService],
    });
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
  }));

  it("should load posts from the server", () => {
    let posts: Post[] = [{ id: 1, title: "Hi" }];
    let service = TestBed.get(PostsService);
    spyOn(service, "getAll").and.returnValue(of(posts));

    fixture.detectChanges();

    expect(component.posts).toBe(posts);
  });
});
