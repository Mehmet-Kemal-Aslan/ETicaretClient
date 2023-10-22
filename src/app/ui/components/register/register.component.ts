import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Entities/User';

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
    },
    {
      validators: (group: AbstractControl): ValidationErrors | null => 
      {
        let sifre = group.get("sifre").value;
        let sifreTekrar = group.get("sifreTekrar").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component()
  {
    return this.form.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User)
  {
    this.submitted = true;
  }
}
