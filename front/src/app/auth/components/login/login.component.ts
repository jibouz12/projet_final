import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, EMPTY, take, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    errorMsg!: String;

  constructor(private formBuilder : FormBuilder,
              private auth : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, Validators.required],
    })
  }

/////////////////////
/// connection utilisateur
/// --> redirection vers feed
  login() {
    const email = this.loginForm.get('loginEmail')!.value;
    const password = this.loginForm.get('loginPassword')!.value;
    this.auth.loginUser(email, password).pipe(
      take(1),
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError(error => {
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }

////////////////////
/// lien vers la page d'inscription
  goToSignup() {
    this.router.navigateByUrl("auth/signup");
  }


}
