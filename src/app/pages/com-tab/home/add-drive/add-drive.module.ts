import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDrivePageRoutingModule } from './add-drive-routing.module';

import { AddDrivePage } from './add-drive.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDrivePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddDrivePage],
})
export class AddDrivePageModule {}
