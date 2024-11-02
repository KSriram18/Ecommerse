import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  addProductForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.pattern(/^[0-9]+$/), Validators.required]],
    discountingPercentage: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.min(0),Validators.max(100)]],
    rating: ['', [Validators.pattern(/^[0-9]+$/), Validators.required,Validators.min(0),Validators.max(5)]],
    stock: ['', [Validators.pattern(/^[0-9]+$/), Validators.required]],
    brand: ['', [Validators.required]],
    category: ['', [Validators.required]],
    thumbnail: ['', [Validators.required]],
    images: ['', [Validators.required]],
    pngIcon: ['', [Validators.required]],
  })

  service = inject(QueryService)

  disableSubmit = false;

  constructor(private fb: FormBuilder) { }

  g() {
    return this.addProductForm.controls;
  }

  addproduct() {
    this.service.snackBar("Product is added to DB successfully", 'Close')
    this.addProductForm.reset()
  }
}