import {
  Component,
  OnInit,
  ChangeDetectorRef
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

import {
  NoteService
} from '../../services/note';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css'
})
export class NoteForm implements OnInit {

  isEditMode = false;

  noteId = 0;

  note = {
    content: ''
  };

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log(
  'ID NOTE:',
  this.route.snapshot.paramMap.get('id')
);
    const id =
      this.route.snapshot
      .paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.noteId = Number(id);

      this.noteService
  .getById(this.noteId)
 .subscribe(data => {

  console.log(
    'NOTA RECIBIDA:',
    data
  );

  this.note = {
    ...data
  };
  this.cdr.detectChanges();

});

    }

  }

  saveNote() {

    if (this.isEditMode) {

      this.noteService
        .update(
          this.noteId,
          this.note
        )
        .subscribe(() => {

          Swal.fire({
  icon: 'success',
  title: 'Nota actualizada',
  text: 'Los cambios fueron guardados correctamente.',
  confirmButtonColor: '#2563eb'
}).then(() => {

  this.router.navigate(
    ['/notes']
  );

});
        });

      return;

    }

    this.noteService
      .create(this.note)
      .subscribe(() => {

        Swal.fire({
  icon: 'success',
  title: 'Nota Creada',
  text: 'Se creó la nota correctamente.',
  confirmButtonColor: '#2563eb'
}).then(() => {

  this.router.navigate(
    ['/notes']
  );

});

        this.router.navigate(
          ['/notes']
        );

      });

  }

}