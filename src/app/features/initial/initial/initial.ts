import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-initial',
  imports: [Navbar, Footer],
  templateUrl: './initial.html',
  styleUrl: './initial.scss'
})
export class Initial {

}
