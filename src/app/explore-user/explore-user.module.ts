import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreUserPageRoutingModule } from './explore-user-routing.module';

import { ExploreUserPage } from './explore-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreUserPageRoutingModule
  ],
  declarations: [ExploreUserPage]
})
export class ExploreUserPageModule {}
