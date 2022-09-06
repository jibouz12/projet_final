import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMsg!: string;

  constructor(private formBuilder : FormBuilder,
              private auth : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      signupEmail: [null, [Validators.required, Validators.email]],
      signupPassword: [null, Validators.required],
    })
  }

/////////////////////
/// s'inscrire (créer nouvel utilisateur)
/// --> + fonction connection
/// --> redirection vers feed
  signUp() {
    const email = this.signupForm.get('signupEmail')!.value;
    const password = this.signupForm.get('signupPassword')!.value;
    this.auth.createUser(email, password).pipe(
      take(1),
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError(error => {
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }

}
