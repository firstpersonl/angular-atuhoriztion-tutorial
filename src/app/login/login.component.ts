import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });


  constructor(private fb: FormBuilder, private auth: AuthService) {}

  onSubmit(): void {
    if(this.addressForm.invalid) {
      return;
    }
    // alert('Thanks!');
    console.log(this.addressForm.value);

    this.auth.login(this.addressForm.value.username, this.addressForm.value.password);
  }

  loginWithGithub() {
  }
}
