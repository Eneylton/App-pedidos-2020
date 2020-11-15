import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeloEditPage } from './modelo-edit';

@NgModule({
  declarations: [
    ModeloEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeloEditPage),
  ],
})
export class ModeloEditPageModule {}
