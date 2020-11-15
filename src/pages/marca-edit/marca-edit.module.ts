import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcaEditPage } from './marca-edit';

@NgModule({
  declarations: [
    MarcaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcaEditPage),
  ],
})
export class MarcaEditPageModule {}
