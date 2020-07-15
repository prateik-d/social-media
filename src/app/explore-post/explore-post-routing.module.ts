import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePostPage } from './explore-post.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePostPageRoutingModule {}
