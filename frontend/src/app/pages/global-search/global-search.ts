import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  KnowledgeService
} from '../../services/knowledge';

import {
  NoteService
} from '../../services/note';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './global-search.html',
  styleUrl: './global-search.css'
})
export class GlobalSearch implements OnInit {

  searchText = '';

  knowledgeList: any[] = [];
  noteList: any[] = [];

  filteredKnowledge: any[] = [];
  filteredNotes: any[] = [];

  constructor(
    private knowledgeService: KnowledgeService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {

    this.knowledgeService
      .getAll()
      .subscribe(data => {

        this.knowledgeList = data;

      });

    this.noteService
      .getAll()
      .subscribe(data => {

        this.noteList = data;

      });

  }

  search() {

    const text =
      this.searchText
        .toLowerCase()
        .trim();

    if (!text) {

      this.filteredKnowledge = [];
      this.filteredNotes = [];

      return;

    }

    this.filteredKnowledge =
      this.knowledgeList.filter(item =>

        item.code?.toLowerCase().includes(text) ||

        item.title?.toLowerCase().includes(text) ||

        item.category?.toLowerCase().includes(text) ||

        item.solution?.toLowerCase().includes(text)

      );

    this.filteredNotes =
      this.noteList.filter(item =>

        item.content?.toLowerCase().includes(text)

      );

  }

}