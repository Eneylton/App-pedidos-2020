import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeloListarPage } from './modelo-listar';

@NgModule({
  declarations: [
    ModeloListarPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeloListarPage),
  ],
})
export class ModeloListarPageModule {}
