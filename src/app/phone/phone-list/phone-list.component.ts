import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { Phone } from '../phone.model';
import { PhoneService } from '../../services/phone.service';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    PaginationComponent,
    RouterModule,
    ReactiveFormsModule
  ],
})

export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];
  filteredPhones: Phone[] = [];
  searchControl = new FormControl(''); 

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.loadPhones();
    this.searchControl.valueChanges.subscribe(() => this.applySearch()); 
  }

  loadPhones(): void {
    this.phones = this.phoneService.getPhones();
    this.filteredPhones = [...this.phones];
  }

  applySearch(): void {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    this.filteredPhones = this.phones.filter(phone =>
      phone.value.toLowerCase().includes(searchTerm)
    );
  }

  deletePhone(id: number): void {
    this.phoneService.deletePhone(id);
    this.loadPhones();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
