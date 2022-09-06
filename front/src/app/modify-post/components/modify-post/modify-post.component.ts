import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  @Input() post!: Post;
  post$! : Observable<Post>;
  postForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private postService : PostService,
              private route : ActivatedRoute,
              private router : Router) { }

///////////////////////////
/// récupérer postId --> dans l'url de la page
/// récupérer le post associé à ce postId
/// appeler le fonction initForm() avec les infos de ce post
  ngOnInit() {
    this.postForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      imageURL: [null, Validators.required],
    });
    const postId = this.route.snapshot.params["id"];
    this.route.params.pipe(
      switchMap(() => {
        return this.postService.getPostById(postId);
      }),
      take(1),
      tap(post => {
        this.post = post;
        this.initForm(post) 
      })
    ).subscribe();
  }

//////////////////////////////
/// initialiser le form avec les valeurs du post récupéré
  initForm(post : Post) {
    this.postForm = this.formBuilder.group({
      name: [post.name, Validators.required],
      description: [post.description],
      imageURL: [post.imageURL, Validators.required],
    });
  }

///////////////////////
/// récupérer l'image téléchargée 
/// modifier imageURL du post avec la nouvelle image
  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get('imageURL')!.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.post.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

////////////////////////////
// fonction modifier le post
  modifyPost() {
    this.postService.modifyPost(this.route.snapshot.params["id"], this.postForm.value, this.postForm.get("imageURL")?.value).pipe(
        tap(() => this.router.navigateByUrl(''))
    ).subscribe();
  }

}


