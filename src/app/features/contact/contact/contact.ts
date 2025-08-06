import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { Footer } from "../../../shared/footer/footer";
import { ContactForm } from "../contact-form/contact-form";
import { ContactInfo } from "../contact-info/contact-info";

@Component({
  selector: 'app-contact',
  imports: [Navbar, Footer, ContactForm, ContactInfo],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

}
