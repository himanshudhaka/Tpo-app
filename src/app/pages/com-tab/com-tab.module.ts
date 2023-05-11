import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComTabPageRoutingModule } from './com-tab-routing.module';

import { ComTabPage } from './com-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComTabPageRoutingModule
  ],
  declarations: [ComTabPage]
})
export class ComTabPageModule {}
