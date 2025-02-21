import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PhoneService } from '../../services/phone.service';
import { Phone } from '../phone.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
  ],
})

export class PhoneFormComponent implements OnInit {
  phoneForm: FormGroup;
  isEdit = false;
  phoneId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private phoneService: PhoneService
  ) {
    this.phoneForm = this.fb.group({
      value: ['', [Validators.required]],
      monthlyPrice: ['', [Validators.required, Validators.min(0)]],
      setupPrice: ['', [Validators.required, Validators.min(0)]],
      currency: ['BRL', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.phoneId = +id;
  
      const phone = this.phoneService.getPhones().find((p) => p.id === this.phoneId);
      if (phone) {
        this.phoneForm.patchValue({
          value: phone.value,
          monthlyPrice: this.applyPriceMask(phone.monthlyPrice.toString(), phone.currency),
          setupPrice: this.applyPriceMask(phone.setupPrice.toString(), phone.currency),
          currency: phone.currency,
        });

        this.updatePriceDisplay('monthlyPrice', phone.currency);
        this.updatePriceDisplay('setupPrice', phone.currency);
      }
    }

    this.phoneForm.get('value')?.valueChanges.subscribe((value) => {
      const formatted = this.applyPhoneMask(value);
      if (value !== formatted) {
        this.phoneForm.get('value')?.setValue(formatted, { emitEvent: false });
      }
    });
  
    this.phoneForm.get('monthlyPrice')?.valueChanges.subscribe((value) => {
      const formatted = this.applyPriceMask(value, this.phoneForm.get('currency')?.value);
      if (value !== formatted) {
        this.phoneForm.get('monthlyPrice')?.setValue(formatted, { emitEvent: false });
      }
    });
  
    this.phoneForm.get('setupPrice')?.valueChanges.subscribe((value) => {
      const formatted = this.applyPriceMask(value, this.phoneForm.get('currency')?.value);
      if (value !== formatted) {
        this.phoneForm.get('setupPrice')?.setValue(formatted, { emitEvent: false });
      }
    });
  }

  onSubmit(): void {
    if (this.phoneForm.valid) {
      const phoneData = {
        ...this.phoneForm.value,
        id: this.phoneId || Date.now(),
        monthlyPrice: this.parsePrice(this.phoneForm.value.monthlyPrice),
        setupPrice: this.parsePrice(this.phoneForm.value.setupPrice),
      };
  
      if (this.isEdit) {
        this.phoneService.updatePhone(phoneData);
      } else {
        this.phoneService.savePhone(phoneData);
      }
  
      this.router.navigate(['/phones']);
    } else {
      console.error('Formulário inválido:', this.phoneForm.errors);
    }
  }

  getControl(name: string): any {
    return this.phoneForm.get(name);
  }

  applyPhoneMask(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    if (value.length <= 2) return `+${value}`;
    if (value.length <= 4) return `+${value.slice(0, 2)} ${value.slice(2)}`;
    if (value.length <= 9) return `+${value.slice(0, 2)} ${value.slice(2, 4)} ${value.slice(4)}`;
    return `+${value.slice(0, 2)} ${value.slice(2, 4)} ${value.slice(4, 9)}-${value.slice(9, 13)}`;
  }

  onCurrencyChange(event: Event): void {
    const selectedCurrency = (event.target as HTMLSelectElement).value;

    this.updatePriceDisplay('monthlyPrice', selectedCurrency);
    this.updatePriceDisplay('setupPrice', selectedCurrency);
  
    this.phoneForm.get('monthlyPrice')?.updateValueAndValidity();
    this.phoneForm.get('setupPrice')?.updateValueAndValidity();
  }

  updatePriceDisplay(controlName: string, currency: string): void {
    const rawValue = this.phoneForm.get(controlName)?.value;
    const numericValue = this.parsePrice(rawValue); 
    let formattedValue = '';
  
    if (currency === 'BRL') {
      formattedValue = this.applyBRLMask(numericValue.toString());
    } else if (currency === 'USD' || currency === 'EUR') {
      formattedValue = this.applyUSDMask(numericValue.toString());
    }
  
    this.phoneForm.get(controlName)?.setValue(formattedValue, { emitEvent: false });
  }

  applyPriceMask(value: string, currency: string): string {
    const numericValue = this.parsePrice(value);
    if (currency === 'BRL') {
      return this.applyBRLMask(numericValue.toString());
    } else if (currency === 'USD' || currency === 'EUR') {
      return this.applyUSDMask(numericValue.toString());
    }
    return value;
  }

  applyBRLMask(value: string): string {
    if (!value) return '';
    let numericValue = value.replace(/[^0-9]/g, '');
    numericValue = (parseFloat(numericValue) / 100).toFixed(2);
    return numericValue.replace('.', ',');
  }

  applyUSDMask(value: string): string {
    if (!value) return '';
    let numericValue = value.replace(/[^0-9]/g, '');
    numericValue = (parseFloat(numericValue) / 100).toFixed(2);
    return numericValue;
  }

  parsePrice(value: string): number {
    if (!value) return 0;
    return parseFloat(value.replace(',', '.').replace(/[^0-9.]/g, ''));
  }
}