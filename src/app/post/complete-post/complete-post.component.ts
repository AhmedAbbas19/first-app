import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../models/post.model";

@Component({
  selector: "app-complete-post",
  templateUrl: "./complete-post.component.html",
  styleUrls: ["./complete-post.component.css"],
})
export class CompletePostComponent implements OnInit {
  @Input() post: Post;
  constructor() {}

  ngOnInit() {}
}
