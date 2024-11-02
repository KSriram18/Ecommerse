import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from '../../login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {

  emailValue = '';
  showEmailForm = true;
  menuItems: MenuItem[] = [
    { label: 'Login', routerLink: '/user' },
    { label: 'Forgot Password', routerLink: '/user/forgotPassword' }
  ]

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  })

  disableSubmit = false;

  constructor(private router: Router, private service: LoginService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.showEmailForm = true;
    this.disableSubmit = false;
  }

  ge() {
    return this.emailForm.controls;
  }

  gp() {
    return this.passwordForm.controls;
  }

  checkEmail() {
    this.disableSubmit = true;
    this.service.forgotPassword(this.emailForm.value).subscribe((data: any) => {
      if (data.data) {
        this.emailValue = (this.emailForm.controls['email'].value || '');
        this.showSuccess('Email is Valid', 500);
        this.showEmailForm = false;
        this.emailForm.reset();
        this.disableSubmit = false;
      }
    }, (err) => {
      this.emailForm.reset();
      this.showEmailForm = true;
      this.disableSubmit = false;
      this.showError(err.error.message);
    })
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 1500 });
  }
  showSuccess(message: string, life: number) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: life });
  }

  updatePassword() {
    this.service.forgotPasswordValue = (this.passwordForm.controls['password'].value || '');
    this.disableSubmit = true;
    this.service.generateOtp({ email: this.emailValue, action: 'forgotPassword' }).subscribe((data: any) => {
      this.showSuccess('OTP Generated', 500);
      this.passwordForm.reset()
      this.service.uid = data.data.id;
      this.service.action = 'forgotPassword';
      this.showSuccess(data.message, 1500);
      setTimeout(() => {
        this.router.navigate(['user/verifyOtp'])
      }, 1500);
    }, (err) => {
      this.showError(err.error.message)
      this.disableSubmit = false;
      this.passwordForm.reset()
      this.showEmailForm = true;
    })
  }
}
