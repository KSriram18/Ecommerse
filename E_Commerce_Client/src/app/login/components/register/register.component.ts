import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {

  menuItems: MenuItem[] = [
    { label: 'Registration', routerLink: '/user/register' }
  ];

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator, Validators.minLength(6)]],
    mobileNumber: ['', [Validators.pattern(/^[0-9]{10}$/), Validators.required]],
  })

  disableSubmit = false;

  constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private messageService: MessageService) { }

  g() {
    return this.registrationForm.controls;
  }

  passwordValidator(c: FormControl) {
    const value = c.value;
    if (!value) {
      return null;
    }
    const upperCase = /[A-Z]+/.test(value);
    const lowerCase = /[a-z]+/.test(value);
    const numbers = /[0-9]+/.test(value);
    const spchar = /[\W]+/.test(value);

    const valid = upperCase && lowerCase && numbers && spchar;
    return !valid ? { passwordStrength: true } : null;
  }

  register() {
    const email = this.registrationForm.value['email'];
    this.disableSubmit = true;
    this.service.register(this.registrationForm.value).subscribe((data: any) => {
      this.registrationForm.reset();
      if (data.data) {
        this.showSuccess('Registration Success Please Verify Mail', 1000);
        this.service.generateOtp({ email: email, action: 'register' }).subscribe((data: any) => {
          this.showSuccess('OTP Generated', 500);
          this.registrationForm.reset()
          this.service.uid = data.data.id;
          this.showSuccess(data.message, 1500);
          setTimeout(() => {
            this.router.navigate(['user/verifyOtp'])
          }, 1500);
        }, (err: any) => {
          this.showError(err.error.message)
          this.disableSubmit = false;
          this.registrationForm.reset()
        })

      }
    }, (err: any) => {
      this.showError(err.error.message)
      this.registrationForm.reset()
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
