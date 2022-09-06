import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  post$! : Observable<Post[]>;

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.post$ = this.postService.getAllPost()
  }

}
