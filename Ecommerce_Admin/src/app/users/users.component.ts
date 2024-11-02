import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QueryService } from '../query.service';

export interface User {
  name: string;
  email: string;
  mobileNumber: number;
  isUserConfirmed: boolean
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private service: QueryService) {}
  data: User[] = []
  displayedColumns: string[] = ['email','mobileNumber','name','isUserConfirmed']

  getUsers() {
    this.service.getUsers().subscribe((data:any)=>{ this.data = data.data;})
  }

  ngOnInit() {
    this.getUsers()
  }

  change(email:string, isUserConfirmed:boolean, name:string) {
    this.service.toggleUser(email,isUserConfirmed).subscribe((data)=>{
      this.service.snackBar(`User: ${name} access is ${!isUserConfirmed ? 'restored 🎉' : 'revoked ⛔'}`)
      this.getUsers()
    })
  }
}
