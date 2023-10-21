import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      adSoyad : ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      kullaniciAdi : ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email : ["", [
        Validators.required,
        Validators.maxLength(70),
        Validators.email
      ]],
      sifre : ["", [
        Validators.required,
      ]],
      sifreTekrar : ["", [
        Validators.required,
      ]]
    })
  }

  get component()
  {
    return this.form.controls;
  }

  submitted: boolean = false;
  onSubmit(data: any)
  {
    this.submitted = true;
  }
}
