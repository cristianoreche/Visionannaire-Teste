import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Phone {
  id: number;
  value: string;
  monthlyPrice: string;
  setupPrice: string;
  currency: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phonesSubject = new BehaviorSubject<Phone[]>(this.loadPhones());
  phones$ = this.phonesSubject.asObservable();
  private nextId = this.getNextId();

  constructor() { }

  getPhones(): Phone[] {
    return this.phonesSubject.value;
  }

  savePhone(phone: Omit<Phone, 'id'>): void {
    const newPhone: Phone = { ...phone, id: this.nextId++ };
    const phones = [...this.getPhones(), newPhone];
    this.savePhones(phones);
  }

  updatePhone(updatedPhone: Phone): void {
    const phones = this.getPhones().map((phone) =>
      phone.id === updatedPhone.id ? updatedPhone : phone
    );
    this.savePhones(phones);
  }

  deletePhone(id: number): void {
    const phones = this.getPhones().filter((phone) => phone.id !== id);
    this.savePhones(phones);
  }

  private savePhones(phones: Phone[]): void {
    this.phonesSubject.next(phones);
    localStorage.setItem('phones', JSON.stringify(phones));
  }

  private loadPhones(): Phone[] {
    const phones = localStorage.getItem('phones');
    if (phones) {
      try {
        const parsedPhones: Phone[] = JSON.parse(phones);
        this.nextId = this.getNextId(parsedPhones);
        return parsedPhones;
      } catch (error) {
        // Remoção do console.error
        return [];
      }
    }
    return [];
  }

  private getNextId(phones: Phone[] = this.getPhones()): number {
    return phones.length > 0 ? Math.max(...phones.map((phone) => phone.id)) + 1 : 1;
  }
}