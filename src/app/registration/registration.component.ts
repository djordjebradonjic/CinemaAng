import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequestDTO } from '../model/registerDto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterResponse } from '../model/registerResponse';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  forbiddenUsernames: String[] = ["Djordje", "Ivana", "Admin"];

  registerDto!: UserRequestDTO;
  newUser!: UserRequestDTO;

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) {
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, this.checkUsername.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(5),]],
    });
  }
  get email() {
    return this.registerForm.get('email');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get surname() {
    return this.registerForm.get('surname');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }

  checkUsername(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { "forbiddenUsername": true };
    }
    return null;
  }

  onSubmit() {
    console.log(this.registerForm);
    this.registerDto = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid) {

      this.authService.register(this.registerDto)
        .subscribe({
          next: (value: RegisterResponse) => {
            console.log(value);
            this.toastrService.success("Successfully registrated,please login");
            this.router.navigate(['/login']);
          }
          , error: (error: any) => {
            this.toastrService.error("Registration failed,try again"); 
            console.log(error);
          }
    
    });
    }
  }
}


