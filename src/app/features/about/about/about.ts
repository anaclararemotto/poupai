import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";

@Component({
  selector: 'app-about',
  imports: [Navbar, Footer],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
