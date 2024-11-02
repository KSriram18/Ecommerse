import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { adminLoggedIn } from '../app.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  disableSubmit = false;

  returnUrl !: string;
  constructor(private fb: FormBuilder, private router: Router, private ar: ActivatedRoute) {
    effect(() => {
      if (adminLoggedIn()) localStorage.setItem("adminLoggedIn", "true")
      else localStorage.removeItem("adminLoggedIn")
    })
  }

  ngOnInit() {
    // console.log(this.ar.snapshot)
    // this.returnUrl = this.ar.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl)
  }

  g() {
    return this.loginForm.controls;
  }

  adminLogin() {
    this.disableSubmit = true;
    if (this.loginForm.value) {
      if (this.loginForm.controls.email.value === "nvsriramk@gmail.com" && this.loginForm.controls.password.value === "admin") {
        adminLoggedIn.set(true)
        this.router.navigateByUrl('home')
      }
      else {
        adminLoggedIn.set(false)
      }
    }

  }

}
