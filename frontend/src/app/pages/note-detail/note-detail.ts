import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  NoteService
} from '../../services/note';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.css'
})
export class NoteDetail implements OnInit {

  note: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot
          .paramMap.get('id')
      );

    this.noteService
  .getById(id)
  .subscribe(data => {

    this.note = {
      ...data
    };

    this.cdr.detectChanges();

  });

  }

}