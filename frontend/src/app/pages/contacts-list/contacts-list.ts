import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  ContactService
} from '../../services/contact';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl:
    './contacts-list.html',
  styleUrl:
    './contacts-list.css'
})
export class ContactsList
implements OnInit {

  contacts: any[] = [];

  filteredContacts: any[] = [];

  searchText = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadContacts();

  }

 loadContacts() {

  this.contactService
    .getAll()
    .subscribe(data => {

      console.log('CONTACTOS:', data);

      this.contacts = data;

      this.filteredContacts = [
        ...data
      ]
       this.cdr.detectChanges();

    });

}

  searchContacts() {

    const search =
      this.searchText
      .toLowerCase();

    this.filteredContacts =
      this.contacts.filter(contact =>

        contact.name
          ?.toLowerCase()
          .includes(search)

        ||

        contact.area
          ?.toLowerCase()
          .includes(search)

        ||

        contact.notes
          ?.toLowerCase()
          .includes(search)

      );

  }
  deleteContact(id: number) {

  const confirmDelete =
    confirm(
      '¿Desea eliminar este contacto?'
    );

  if (!confirmDelete) {
    return;
  }

  this.contactService
    .delete(id)
    .subscribe(() => {

      this.loadContacts();

    });

}


}