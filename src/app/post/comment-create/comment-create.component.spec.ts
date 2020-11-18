import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { PostsService } from "../posts.service";

import { CommentCreateComponent } from "./comment-create.component";

class RouterStub {
  navigate(params) {}
}

class ActivatedRouteStub {
  params: Observable<any>;
}

describe("CommentCreateComponent", () => {
  let component: CommentCreateComponent;
  let fixture: ComponentFixture<CommentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentCreateComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        PostsService,
      ],
    });
    fixture = TestBed.createComponent(CommentCreateComponent);
    component = fixture.componentInstance;
  }));

  it("should turn editMode to true if commentId is passed", () => {
    let routeStub: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    routeStub.params = of({ commentId: 1 });

    fixture.detectChanges();
    expect(component.editMode).toBe(true);
  });

  it("should return if the form is invalid", () => {
    component.commentForm = new FormGroup({
      dummy: new FormControl(null, Validators.required),
    });
    expect(component.onSubmit()).toBeUndefined();
  });

  it("should call call addComment if editMode is false", () => {
    component.commentForm = new FormGroup({
      dummy: new FormControl("dummy", Validators.required),
    });

    let service = TestBed.get(PostsService);
    let spy = spyOn(service, "addComment").and.returnValue(of({}));

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });

  it("should call call updateComment if editMode is true", () => {
    component.editMode = true;
    component.commentForm = new FormGroup({
      dummy: new FormControl("dummy", Validators.required),
    });

    let service = TestBed.get(PostsService);
    let spy = spyOn(service, "updateComment").and.returnValue(of({}));

    component.onSubmit();

    expect(spy).toHaveBeenCalled();
  });
});
