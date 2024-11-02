import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  uId: any;

  disableSubmit = false;

  menuItems: MenuItem[] = [
    { label: 'Login', routerLink: '/user' }
  ];

  returnUrl !: string;
  constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private messageService: MessageService, private ar: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.ar.snapshot)
    this.returnUrl = this.ar.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl)
  }

  g() {
    return this.loginForm.controls;
  }

  login() {
    const email = this.loginForm.value['email'];
    this.disableSubmit = true;
    this.service.login(this.loginForm.value).subscribe((data1: any) => {
      this.loginForm.reset();
      // console.log(data1)
      if (data1.data) {
        this.showSuccess('Authentication Success', 1000);
        this.service.generateOtp({ email: email, action: 'login' }).subscribe((data: any) => {
          this.showSuccess('OTP Generated', 500);
          this.loginForm.reset()
          this.service.uid = data.data.id;
          this.service.action = 'login';
          // localStorage.setItem('token', data1.token)
          this.service.token = data1.token;
          this.showSuccess(data.message, 1500);
          // console.log(this.returnUrl)
          setTimeout(() => {
            this.router.navigate(['user/verifyOtp',], { queryParams: { returnUrl: this.returnUrl } })
          }, 1500);
        }, (err: any) => {
          this.showError(err.error.message)
          this.disableSubmit = false;
          this.loginForm.reset()
        })

      }
    }, (err: any) => {
      this.showError(err.error.message)
      this.service.isLoggedIn.next(false);
      this.loginForm.reset()
      this.service.loggedIn = false;
      this.disableSubmit = false;
      if(err.status === 404){
        setTimeout(() => {
          this.router.navigate(['user/register',], { queryParams: { returnUrl: this.returnUrl } })
        }, 500);
      }
      if(err.status === 402){
        setTimeout(() => {
          this.router.navigate(['user/verifyemail',], { queryParams: { returnUrl: this.returnUrl } })
        }, 500);
      }
    }
    )
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 1500 });
  }
  showSuccess(message: string, life: number) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: life });
  }
}