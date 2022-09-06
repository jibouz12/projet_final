import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  imagePreview!: string;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private postService : PostService) { }

/////////////////////
/// imagePreview --> récupérer image dans dossier "images"
  ngOnInit(): void {
    this.imagePreview = "assets/images/image-preview.png";
    this.postForm = this.formBuilder.group({
      description: [null],
      imageURL: [null, Validators.required],
    });
  }

//////////////////////
/// récupérer l'image (de type File) ajoutée
/// --> l'afficher : imagePreview
  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get('imageURL')!.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

///////////////////////
/// fonction créer le post
/// + redirection vers page feed
  createNewPost() {
    this.postService.createPost(this.postForm.value, this.postForm.get("imageURL")?.value).pipe(
        tap(() => this.router.navigateByUrl(''))
    ).subscribe();
  }


}



