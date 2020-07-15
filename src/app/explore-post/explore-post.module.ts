import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePostPageRoutingModule } from './explore-post-routing.module';

import { ExplorePostPage } from './explore-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePostPageRoutingModule
  ],
  declarations: [ExplorePostPage]
})
export class ExplorePostPageModule {}
