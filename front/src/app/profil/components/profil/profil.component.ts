import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  post$! : Observable<Post[]>;

  constructor(private postService : PostService,
              private auth : AuthService) { }

///////////////////////////////
/// récupérer l'id de l'utilisateur
/// --> récupérer les posts en passant cet id
  ngOnInit(): void {
    let user = this.auth.getUserId();
    this.post$ = this.postService.getPostsByUserId(user);
  }

}
