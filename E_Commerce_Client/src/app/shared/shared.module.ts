import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog'

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SortPipe } from './pipes/sort.pipe';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BreadcrumbModule,
    BadgeModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    CardModule,
  ],
  exports: [
    BreadcrumbComponent, BadgeModule, CarouselModule, TagModule, ButtonModule, CardModule, ReactiveFormsModule,
    HttpClientModule, ToastModule, RatingModule, FormsModule, DataViewModule, DropdownModule,
    PanelModule, DialogModule, InputTextModule, RippleModule, SortPipe, ConfirmDialogModule, RouterModule
  ]
})
export class SharedModule { }
