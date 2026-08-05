import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  ContactService
} from '../../services/contact';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetail
implements OnInit {

  contact: any;

  constructor(
    private route: ActivatedRoute,
    private contactService:
      ContactService
  ) {}

  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot
          .paramMap.get('id')
      );

    this.contactService
      .getById(id)
      .subscribe(data => {

        this.contact = data;

      });

  }

}