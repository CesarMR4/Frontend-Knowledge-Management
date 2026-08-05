import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,Router,
  RouterModule
} from '@angular/router';
import { CategoryService } from '../../services/category';

import { KnowledgeService } from '../../services/knowledge';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-knowledge-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './knowledge-form.html',
  styleUrl: './knowledge-form.css'
})
export class KnowledgeForm implements OnInit {

  isEditMode = false;

  knowledgeId = 0;

  showCodeInfo = false;
  categories: any[] = [];

  knowledge = {
    code: '',
    title: '',
    category: '',
    solution: ''
  };

  constructor(
    private knowledgeService: KnowledgeService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
this.categoryService
  .getAll()
  .subscribe({

    next: (data) => {

      this.categories = data;

    }

  });
    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.knowledgeId = Number(id);

      this.knowledgeService
        .getById(this.knowledgeId)
        .subscribe({

          next: (data) => {

            console.log('EDIT DATA:', data);

            this.knowledge = data;

            this.cdr.detectChanges();

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

  showCodeMessage() {

    this.showCodeInfo = true;

  }

  hideCodeMessage() {

    this.showCodeInfo = false;

  }

  saveKnowledge() {

  if (this.isEditMode) {

    this.knowledgeService
      .update(
        this.knowledgeId,
        this.knowledge
      )
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Solución actualizada',
            text: 'Los cambios fueron guardados correctamente.',
            confirmButtonColor: '#2563eb'
          }).then(() => {

            this.router.navigate(
              ['/knowledge']
            );

          });

        },

        error: (err) => {

          console.error(err);

        }

      });

    return;

  }

  this.knowledgeService
    .create(this.knowledge)
    .subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Solución registrada',
          text: 'La solución fue creada correctamente.',
          confirmButtonColor: '#2563eb'
        }).then(() => {

          this.router.navigate(
            ['/knowledge']
          );

        });

      },

      error: (err) => {

        console.error(err);

      }

    });

}
  onCategoryChange() {

  const selectedCategory =
    this.categories.find(
      category =>
        category.name ===
        this.knowledge.category
    );

  if (selectedCategory) {

    this.knowledge.code =
      selectedCategory.code;

  }

}

}