import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items!: MenuItem[];

  home!: MenuItem;

  ngOnInit() {

    this.home = { icon: 'pi pi-home', routerLink: '/' };

  }
}