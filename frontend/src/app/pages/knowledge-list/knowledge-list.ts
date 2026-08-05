import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { KnowledgeService } from '../../services/knowledge';

@Component({
  selector: 'app-knowledge-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './knowledge-list.html',
  styleUrl: './knowledge-list.css'
})
export class KnowledgeList implements OnInit {

  knowledgeList: any[] = [];

  currentPage = 1;

  itemsPerPage = 7;
  searchText = '';

  constructor(
    private knowledgeService: KnowledgeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.knowledgeService.getAll()
      .subscribe({
        next: (data) => {

          this.knowledgeList = [...data].reverse();

          this.cdr.detectChanges();

        },
        error: (err) => {

          console.error(err);

        }
      });

  }

  get paginatedKnowledge() {

    const start =
      (this.currentPage - 1) * this.itemsPerPage;

    const end =
      start + this.itemsPerPage;

    return this.filteredKnowledge.slice(start, end);

  }

  get totalPages() {

    return Math.ceil(
      this.filteredKnowledge.length /
      this.itemsPerPage
    );

  }
  get filteredKnowledge() {

  if (!this.searchText.trim()) {
    return this.knowledgeList;
  }

  return this.knowledgeList.filter(item =>
    item.title
      .toLowerCase()
      .includes(this.searchText.toLowerCase()) ||

    item.category
      .toLowerCase()
      .includes(this.searchText.toLowerCase()) ||

    item.code
      .toLowerCase()
      .includes(this.searchText.toLowerCase())
  );

}

  nextPage() {

    if (
      this.currentPage < this.totalPages
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
  deleteKnowledge(
  id: number,
  title: string
) {

  const confirmDelete = confirm(
    `¿Desea eliminar la solución "${title}"?`
  );

  if (!confirmDelete) {
    return;
  }

  this.knowledgeService
    .delete(id)
    .subscribe({

      next: () => {

        this.knowledgeList =
          this.knowledgeList.filter(
            item => item.id !== id
          );

        alert(
          'Solución eliminada correctamente'
        );

      },

      error: (err) => {

        console.error(err);

      }

    });

}
  

}