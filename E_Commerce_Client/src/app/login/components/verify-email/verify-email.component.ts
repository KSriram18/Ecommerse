import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from '../../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })

  uId: any;

  disableSubmit = false;

  menuItems: MenuItem[] = [
    { label: 'Verify Email', routerLink: '/user' }
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
    const email = this.loginForm.controls.email.value;
    this.disableSubmit = true;
    this.service.verifyEmail(email).subscribe((data1: any) => {
      this.loginForm.reset();
      // console.log(data1)
      if (data1.data) {
        this.service.generateOtp({ email: email, action: 'verifyemail' }).subscribe((data: any) => {
          this.showSuccess('OTP Generated', 500);
          this.loginForm.reset()
          this.service.uid = data.data.id;
          this.service.action = 'verifyemail';
          // localStorage.setItem('token', data1.token)
          // this.service.token = data1.token;
          this.showSuccess(data.message, 1500);
          // console.log(this.returnUrl)
          setTimeout(() => {
            this.router.navigate(['user/verifyOtp',], { queryParams: { returnUrl: this.returnUrl } })
          }, 1500);
        }, (err: any) => {
          this.showError(err.error.message)
          this.disableSubmit = false;
          this.loginForm.reset()
          if(err.status === 400){
            setTimeout(() => {
              this.router.navigate(['user/',], { queryParams: { returnUrl: this.returnUrl } })
            }, 500);
          }
        })

      }
    }, (err: any) => {
      this.showError(err.error.message)
      this.service.isLoggedIn.next(false);
      this.loginForm.reset()
      this.service.loggedIn = false;
      this.disableSubmit = false;
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
