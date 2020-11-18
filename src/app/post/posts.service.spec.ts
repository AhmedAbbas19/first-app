import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";
import { Comment } from "./models/comment.model";
import { of } from "rxjs/observable/of";

describe("PostsService", () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  let dummyComment: Comment = { id: 1, body: "test", postId: 1 };
  let dummyPost: Post = { id: 1, title: "test" };
  let dummyCommentListResponse: Comment[] = [dummyComment];
  let dummyPostListWithComments: Post[] = [
    { ...dummyPost, comments: [dummyComment] },
  ];

  let dummyPostListResponse: Post[] = [dummyPost];
  let dummyPostsMap = { 1: { id: 1, title: "test" } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.get(PostsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it("should return posts with commentsList", () => {
    spyOn(service, "getAllPosts").and.returnValue(of(dummyPostListResponse));
    spyOn(service, "getAllComments").and.returnValue(
      of(dummyCommentListResponse)
    );

    service.getAll().subscribe((res) => {
      expect(res).toEqual(dummyPostListWithComments);
    });
  });

  it("should return posts from the server", () => {
    service.getAllPosts().subscribe((res) => {
      expect(res).toEqual(dummyPostListResponse);
    });

    const req = httpMock.expectOne(`${service.baseURL}/posts`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyPostListResponse);
  });

  it("should return comments from the server", () => {
    service.getAllComments().subscribe((res) => {
      expect(res).toEqual(dummyCommentListResponse);
    });

    const req = httpMock.expectOne(`${service.baseURL}/comments`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyCommentListResponse);
  });

  it("should create comment correctly", () => {
    service.addComment(dummyComment).subscribe((res) => {
      expect(res).toEqual({ status: 201 });
    });

    const req = httpMock.expectOne(`${service.baseURL}/comments`);
    expect(req.request.method).toBe("POST");
    req.flush({ status: 201 });
  });

  it("should update comment correctly", () => {
    service.updateComment(dummyComment).subscribe((res) => {
      expect(res).toEqual({ status: 200 });
    });

    const req = httpMock.expectOne(
      `${service.baseURL}/comments/${dummyComment.id}`
    );
    expect(req.request.method).toBe("PATCH");
    req.flush({ status: 200 });
  });

  it("it should map posts to postsMap", () => {
    let dummyPostListResponse: Post[] = [{ id: 1, title: "test" }];
    expect(service.postsMap(dummyPostListResponse)).toEqual(dummyPostsMap);
  });

  it("should emmit new posts list with added comment", () => {
    service.posts = dummyPostListWithComments;
    let addedComment: Comment = { id: 2, body: "hi", postId: 1 };

    let spy = spyOn(service.postsSub, "next");

    service.onAddComment(addedComment);

    expect(spy).toHaveBeenCalled();
  });

  it("should emmit same posts list if added-comment postID NOT_EXIST ", () => {
    service.posts = dummyPostListWithComments;
    let addedComment: Comment = { id: 2, body: "hi", postId: 5 };

    let spy = spyOn(service.postsSub, "next");

    service.onAddComment(addedComment);

    expect(spy).toHaveBeenCalledWith(dummyPostListWithComments);
  });

  it("should emmit new posts list with updated comment", () => {
    service.posts = dummyPostListWithComments;
    let updatedComment: Comment = { id: 2, body: "hi", postId: 1 };

    let spy = spyOn(service.postsSub, "next");

    service.onUpdateComment(updatedComment);

    expect(spy).toHaveBeenCalled();
  });
});
