import { Component, ViewChildren, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  providers: [MessageService]
})
export class OtpVerificationComponent implements OnInit {

  disableSubmit = false;
  form!: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('formRow') rows: any;
  returnUrl!: string;

  constructor(private service: LoginService, private messageService: MessageService, private router: Router, private ar: ActivatedRoute) {
    this.form = this.toFormGroup(this.formInput);
  }

  ngOnInit() {
    this.disableSubmit = false;
    this.returnUrl = this.ar.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl)
  }

  toFormGroup(elements: any) {
    const group: any = {};

    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event: any, index: number) {
    let pos = index;

    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  onSubmit() {
    const otp = Object.values(this.form.value).join('')
    this.disableSubmit = true
    this.service.verifyOtp({ otp }).subscribe((data: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message, life: 1500 });
      if (this.service.action === 'login') {
        this.service.loggedIn = true;
        localStorage.setItem('token', this.service.token);
        this.service.isLoggedIn.next(true);
      }
      setTimeout(() => {
        this.router.navigateByUrl(this.returnUrl)
      }, 1500);
    },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 1500 });
        this.disableSubmit = false;
        this.service.loggedIn = false;
        this.form.reset()
      })
  }

}
