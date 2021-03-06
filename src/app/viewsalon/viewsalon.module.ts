import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewsalonPage } from './viewsalon.page';
import { StarRating } from 'ionic4-star-rating';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
const routes: Routes = [
  {
    path: '',
    component: ViewsalonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedmoduleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewsalonPage],

})
export class ViewsalonPageModule {}
