import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabriEditPage } from './fabri-edit';

@NgModule({
  declarations: [
    FabriEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FabriEditPage),
  ],
})
export class FabriEditPageModule {}
