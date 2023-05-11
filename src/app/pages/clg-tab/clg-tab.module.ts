import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClgTabPageRoutingModule } from './clg-tab-routing.module';

import { ClgTabPage } from './clg-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClgTabPageRoutingModule
  ],
  declarations: [ClgTabPage]
})
export class ClgTabPageModule {}
