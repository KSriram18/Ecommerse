import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { QueryService } from '../query.service';

export interface Query {
  name: string;
  email: string;
  mobileNumber: number;
  query: string;
  status: string;
  resolution: string;
}

@Component({
  selector: 'app-queries',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './queries.component.html',
  styleUrl: './queries.component.css'
})
export class QueriesComponent {

  data:Query[] = []
  // data: Query[] = [
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Resolved', resolution: 'We will get back to you shortly' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Resolved', resolution: 'We will get back to you shortly' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  //   { name: 'Lokesh', email: 'klokesh1999@gmail.com', mobileNumber: 8978527113, query: "Hi Admin, Please Check this issue", status: 'Pending', resolution: '' },
  // ]

  displayedColumns: string[] = [];

  constructor(private service:QueryService) { }

  ngOnInit() {
    this.getQueries();
  }

  getQueries() {
    this.service.getQueries().subscribe((data:any) => {
      this.data=data.data;
      this.displayedColumns=Object.keys(this.data[0]).slice(1,7);
    })
  }

  sendResolution(id:any,value:string,email:string) {
    if(!value) {
      this.service.snackBar("Please enter some resolution before sending an email")
      return
    }
    this.service.resolveQuery(id,value,email).subscribe((data)=>{
      this.service.snackBar(`${email}'s query is resolved`)
      if(data) this.getQueries();
    },(error)=>this.service.snackBar(error.message))
  }
}
