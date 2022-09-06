import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {
  post$! : Observable<Post[]>;

  constructor(private postService : PostService,
              private route : ActivatedRoute,) { }

///////////////////////////////
/// récupérer l'id du propriétaire des posts dans l'url de la page
/// --> récupérer les posts en passant cet id
  ngOnInit(): void {
    let user = this.route.snapshot.params["id"];
    this.post$ = this.postService.getPostsByUserId(user);
  }

}
