import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import {
  CategoryService
} from '../../services/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm implements OnInit {

  isEditMode = false;

  categoryId = 0;

  category = {
    code: '',
    name: ''
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.categoryId = Number(id);

      this.categoryService
        .getById(this.categoryId)
        .subscribe(data => {

          this.category = data;

        });

    }

  }

  saveCategory() {

    if (this.isEditMode) {

      this.categoryService
        .update(
          this.categoryId,
          this.category
        )
        .subscribe(() => {

          Swal.fire({
            icon: 'success',
            title: 'Categoría actualizada',
            text: 'Los cambios fueron guardados correctamente.',
            confirmButtonColor: '#2563eb'
          }).then(() => {

            this.router.navigate(
              ['/categories']
            );

          });

        });

      return;

    }

    this.categoryService
      .create(this.category)
      .subscribe(() => {

        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La categoría fue registrada correctamente.',
          confirmButtonColor: '#2563eb'
        }).then(() => {

          this.router.navigate(
            ['/categories']
          );

        });

      });

  }

}
