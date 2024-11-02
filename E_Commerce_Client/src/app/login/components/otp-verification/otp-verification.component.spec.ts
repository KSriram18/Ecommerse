import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OtpVerificationComponent } from './otp-verification.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('OtpVerificationComponent', () => {
  let component: OtpVerificationComponent;
  let fixture: ComponentFixture<OtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpVerificationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check disablesubmit', () => {
    expect(component.disableSubmit).toBe(false);
  })
});
