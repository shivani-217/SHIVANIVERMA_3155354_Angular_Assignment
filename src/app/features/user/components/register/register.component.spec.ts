import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesModule } from './../../../features.module';
import { SharedModule } from './../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [UserService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`form should be invalid`, async () => {
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['password'].setValue('');
    component.registrationForm.controls['confirmPassword'].setValue('');
    expect(component.registrationForm.valid).toBeFalsy();
  })

  it(`form should be valid`, async () => {
    component.registrationForm.controls['email'].setValue('testuser@gmail.com');
    component.registrationForm.controls['name'].setValue('Test User');
    component.registrationForm.controls['password'].setValue('test123');
    component.registrationForm.controls['confirmPassword'].setValue('test123');
    expect(component.registrationForm.valid).toBeTruthy();
  });
});
