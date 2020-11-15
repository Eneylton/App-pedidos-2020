import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoCadastroPage } from './produto-cadastro';

@NgModule({
  declarations: [
    ProdutoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoCadastroPage),
  ],
})
export class ProdutoCadastroPageModule {}
