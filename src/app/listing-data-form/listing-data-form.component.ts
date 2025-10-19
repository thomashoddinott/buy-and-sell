import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.css']
})
export class ListingDataFormComponent implements OnInit {
  @Input() buttonText: string = 'Submit';
  @Input() currentName: string = '';
  @Input() currentDescription: string = '';
  @Input() currentPrice: string = '';

  name: string = '';
  description: string = '';
  price: string = '';

  @Output() onSubmit = new EventEmitter<Listing>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      id: '',
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: 0
    });
  }
}
