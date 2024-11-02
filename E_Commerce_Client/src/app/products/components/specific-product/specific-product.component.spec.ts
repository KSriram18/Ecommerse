import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpecificProductComponent } from './specific-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('SpecificProductComponent', () => {
  let component: SpecificProductComponent;
  let fixture: ComponentFixture<SpecificProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecificProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SpecificProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
