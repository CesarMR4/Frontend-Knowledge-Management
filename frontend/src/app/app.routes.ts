import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { KnowledgeList } from './pages/knowledge-list/knowledge-list';
import { KnowledgeForm } from './pages/knowledge-form/knowledge-form';
import { KnowledgeDetail } from './pages/knowledge-detail/knowledge-detail';
import { Categories } from './pages/categories/categories';
import { CategoryForm } from './pages/category-form/category-form';
import { NotesList } from './pages/notes-list/notes-list';
import { NoteForm } from './pages/note-form/note-form';
import { NoteDetail } from './pages/note-detail/note-detail';
import { GlobalSearch } from './pages/global-search/global-search';
import { ContactDetail } from './pages/contact-detail/contact-detail';
import { ContactForm } from './pages/contact-form/contact-form';
import { ContactsList } from './pages/contacts-list/contacts-list';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'knowledge',
    component: KnowledgeList
  },
  {
    path: 'new-kb',
    component: KnowledgeForm
  },
  {
    path: 'categories',
    component: Categories
  },
  {
  path: 'knowledge/:id',
  component: KnowledgeDetail
},
{
  path: 'knowledge/edit/:id',
  component: KnowledgeForm
},
{
  path: 'categories/new',
  component: CategoryForm
},
{
  path: 'categories/edit/:id',
  component: CategoryForm
},
{
  path: 'notes',
  component: NotesList
},
{
  path: 'notes/new',
  component: NoteForm
},
{
  path: 'notes/edit/:id',
  component: NoteForm
},
{
  path: 'notes/:id',
  component: NoteDetail
},
{
  path: 'global-search',
  component: GlobalSearch
},
{
  path: 'contacts',
  component: ContactsList
},
{
  path: 'contacts/new',
  component: ContactForm
},
{
  path: 'contacts/edit/:id',
  component: ContactForm
},
{
  path: 'contacts/:id',
  component: ContactDetail
}

];