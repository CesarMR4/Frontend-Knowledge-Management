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
  NoteService
} from '../../services/note';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css'
})
export class NotesList implements OnInit {

  notes: any[] = [];;
  filteredNotes: any[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 7;

  constructor(
    private noteService: NoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadNotes();

  }

  loadNotes() {

  this.noteService
    .getAll()
    .subscribe(data => {

      console.log('NOTAS:', data);

      this.notes = [...data];
      this.filteredNotes = [...data]
      this.cdr.detectChanges();

    });

}

  deleteNote(
    id: number,
    title: string
  ) {

    const confirmDelete =
      confirm(
        `¿Desea eliminar la nota "${title}"?`
      );

    if (!confirmDelete) {
      return;
    }

    this.noteService
      .delete(id)
      .subscribe(() => {

        this.loadNotes();

      });

  }
  filterNotes() {

  this.currentPage = 1;
  const search =
    this.searchText
      .toLowerCase()
      .trim();

  if (!search) {

    this.filteredNotes = [
      ...this.notes
    ];

    return;

  }

  this.filteredNotes =
    this.notes.filter(note =>

      note.content
        ?.toLowerCase()
        .includes(search)

    );

}
get paginatedNotes() {

  const startIndex =
    (this.currentPage - 1)
    * this.itemsPerPage;

  const endIndex =
    startIndex + this.itemsPerPage;

  return this.filteredNotes.slice(
    startIndex,
    endIndex
  );

}
get totalPages() {

  return Math.ceil(
    this.filteredNotes.length /
    this.itemsPerPage
  );

}
nextPage() {

  if (
    this.currentPage <
    this.totalPages
  ) {

    this.currentPage++;

  }

}
previousPage() {

  if (
    this.currentPage > 1
  ) {

    this.currentPage--;

  }

}


}