import { Component } from '@angular/core';
import { SignupContent } from "../signup-content/signup-content";
import { SignupForm } from '../signup-form/signup-form';


@Component({
  selector: 'app-signup',
  imports: [SignupForm, SignupContent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

}
