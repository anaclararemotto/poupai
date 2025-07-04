import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";
import { SignupForm } from "../signup-form/signup-form";
import { SignupContent } from "../signup-content/signup-content";

@Component({
  selector: 'app-signup',
  imports: [Navbar, Footer, SignupForm, SignupContent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

}
