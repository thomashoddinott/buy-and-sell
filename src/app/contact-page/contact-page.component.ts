import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  email: string = '';
  message: string = '';
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsSerivce: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsSerivce.getListingById(id!).subscribe((data) => {
      this.listing = data;
      this.message = `Hi, I am interested in your ${this.listing?.name.toLocaleLowerCase()}`;
    });
  }

  sendMessage(): void {
    alert(`Message sent`);
    this.router.navigateByUrl('/listings');
  }
}
