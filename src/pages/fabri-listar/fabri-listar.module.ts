import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabriListarPage } from './fabri-listar';

@NgModule({
  declarations: [
    FabriListarPage,
  ],
  imports: [
    IonicPageModule.forChild(FabriListarPage),
  ],
})
export class FabriListarPageModule {}
