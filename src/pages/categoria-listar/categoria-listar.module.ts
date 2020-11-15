import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaListarPage } from './categoria-listar';

@NgModule({
  declarations: [
    CategoriaListarPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriaListarPage),
  ],
})
export class CategoriaListarPageModule {}
