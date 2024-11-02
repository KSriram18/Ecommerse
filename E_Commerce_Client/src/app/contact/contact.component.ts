import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent {
  menuItems: MenuItem[] = [
    { label: 'Contact', routerLink: '/contact' }
  ];

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', [Validators.pattern(/^[0-9]{10}$/), Validators.required]],
    query:['',[Validators.required]],
  })

  disableSubmit = false;

  constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private messageService: MessageService) { }

  g() {
    return this.contactForm.controls;
  }

  contact(){
    this.disableSubmit=true;
    this.service.sendQuery(this.contactForm.value).subscribe((data:any)=> {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.data, life: 1500 });
      setTimeout(()=>this.router.navigateByUrl('/'),1500)
      this.contactForm.reset()
    },
    (error)=>{
      this.showError(error);
      this.disableSubmit=false;
    })
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 1500 });
  }

}
