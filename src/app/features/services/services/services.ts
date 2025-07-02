import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";
import { ServicesTop } from "../services-top/services-top";
import { ServicesBottom } from "../services-bottom/services-bottom";

@Component({
  selector: 'app-services',
  imports: [Navbar, Footer, ServicesTop, ServicesBottom],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {

}
