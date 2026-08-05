import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { KnowledgeService } from '../../services/knowledge';

@Component({
  selector: 'app-knowledge-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './knowledge-detail.html',
  styleUrl: './knowledge-detail.css'
})
export class KnowledgeDetail implements OnInit {

  knowledge: any = null;

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('ID:', id);

    this.knowledgeService
      .getById(id)
      .subscribe({
        next: (data) => {

          console.log('Detalle:', data);

          this.knowledge = data;

          this.cdr.detectChanges();

        },
        error: (err) => {

          console.error(
            'Error detalle:',
            err
          );

        }
      });

  }

}
