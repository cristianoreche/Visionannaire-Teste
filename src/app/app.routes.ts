import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'phones', pathMatch: 'full' },
  {
    path: 'phones',
    loadComponent: () =>
      import('./phone/phone-list/phone-list.component').then(
        (m) => m.PhoneListComponent
      ),
  },
  {
    path: 'phones/new',
    loadComponent: () =>
      import('./phone/phone-form/phone-form.component').then(
        (m) => m.PhoneFormComponent
      ),
  },
  {
    path: 'phones/edit/:id',
    loadComponent: () =>
      import('./phone/phone-form/phone-form.component').then(
        (m) => m.PhoneFormComponent
      ),
  },
];