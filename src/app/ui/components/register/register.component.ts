import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Entities/User';
import { Create_User } from 'src/app/contracts/Users/Create_User';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, 
    private userService: UserService, 
    private toastrService: CustomToastrService,) { }

  form: FormGroup;
  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      nameSurname : ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName : ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email : ["", [
        Validators.required,
        Validators.maxLength(70),
        Validators.email
      ]],
      password : ["", [
        Validators.required,
      ]],
      passwordConfirm : ["", [
        Validators.required,
      ]]
    },
    {
      validators: (group: AbstractControl): ValidationErrors | null => 
      {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component()
  {
    return this.form.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User)
  {
    this.submitted = true;
    
    if(this.form.invalid)
      return

    const result: Create_User = await this.userService.create(user);

    if(result.succeeded)
    {
      console.log("Bura2" + result.message);
      this.toastrService.message(result.message, 
      ToastrMessageType.Success
      )
    }
    else
    {
      console.log("Bura3" + result.message);
      this.toastrService.message(result.message,
          ToastrMessageType.Error
          )
    }
  }
}
