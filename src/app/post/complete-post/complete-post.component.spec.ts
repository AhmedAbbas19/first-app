import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";

import { CompletePostComponent } from "./complete-post.component";

describe("CompletePostComponent", () => {
  let component: CompletePostComponent;
  let fixture: ComponentFixture<CompletePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletePostComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(CompletePostComponent);
    component = fixture.componentInstance;
  }));

  it("should render the @input post correctly", () => {
    component.post = { id: 1, title: "Hi" };
    let de: DebugElement = fixture.debugElement.query(By.css(".card-title"));
    let el: HTMLElement = de.nativeElement;

    fixture.detectChanges();

    expect(el.innerText).toBe(component.post.title);
  });
});
