import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoryService } from '../../services/category';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {

  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('ENTRE A CATEGORIES');
    this.categoryService
      .getAll()
      .subscribe({

        next: (data) => {

          console.log('CATEGORIAS:', data);
          this.categories = data;
          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }
  deleteCategory(
  id: number,
  name: string
) {

  const confirmDelete = confirm(
    `¿Desea eliminar la categoría "${name}"?`
  );

  if (!confirmDelete) {
    return;
  }

  this.categoryService
    .delete(id)
    .subscribe({

      next: () => {

        this.categories =
          this.categories.filter(
            category =>
              category.id !== id
          );

        alert(
          'Categoría eliminada correctamente'
        );

      },

      error: (err) => {

        console.error(err);

      }

    });

}

}