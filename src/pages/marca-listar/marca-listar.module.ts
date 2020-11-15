import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcaListarPage } from './marca-listar';

@NgModule({
  declarations: [
    MarcaListarPage,
  ],
  imports: [
    IonicPageModule.forChild(MarcaListarPage),
  ],
})
export class MarcaListarPageModule {}
