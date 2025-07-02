import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from "../../../shared/footer/footer";
import { Navbar } from "../../../shared/navbar/navbar";

@Component({
  selector: 'app-initial',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './initial.html',
  styleUrl: './initial.scss'
})
export class Initial {

}
