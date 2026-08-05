import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { KnowledgeService } from '../../services/knowledge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  knowledgeList: any[] = [];
  totalCategories = 0;
  latestSolution: any = null;
  mostUsedCategory = '';

  constructor(
    private knowledgeService: KnowledgeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('Dashboard cargado');

    this.knowledgeService.getAll()
      .subscribe({
       next: (data) => {

  this.knowledgeList = [...data];

  this.totalCategories =
    new Set(
      data.map(item => item.category)
    ).size;

  if (data.length > 0) {

    this.latestSolution =
      data[data.length - 1];

  }

  const countMap: any = {};

  data.forEach(item => {

    countMap[item.category] =
      (countMap[item.category] || 0) + 1;

  });

  this.mostUsedCategory =
    Object.keys(countMap)
      .sort(
        (a, b) =>
          countMap[b] - countMap[a]
      )[0] || '';

  this.cdr.detectChanges();

},
        error: (err) => {
          console.error(err);
        }
      });

  }

}