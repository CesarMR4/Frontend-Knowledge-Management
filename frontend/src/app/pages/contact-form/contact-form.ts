import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import { ContactService }
from '../../services/contact';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm
implements OnInit {

  isEditMode = false;

  contactId = 0;

  contact = {
    name: '',
    area: '',
    notes: ''
  };

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot
      .paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.contactId =
        Number(id);

      this.contactService
        .getById(this.contactId)
        .subscribe(data => {

          this.contact = {
            ...data
          };

        });

    }

  }

  saveContact() {

  console.log('CONTACTO:', this.contact);

 this.contactService
  .create(this.contact)
  .subscribe(() => {

    Swal.fire({
      icon: 'success',
      title: 'Contacto Creado',
      text: 'El contacto fue registrado correctamente.',
      confirmButtonColor: '#2563eb'
    }).then(() => {

      this.router.navigate(
        ['/contacts']
      );

    });

  });

}

}