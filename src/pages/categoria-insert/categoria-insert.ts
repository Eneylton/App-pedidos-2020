import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-categoria-insert',
  templateUrl: 'categoria-insert.html',
})
export class CategoriaInsertPage {

  descricao: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  cadastrar() {

    if(this.descricao ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo nome é Obrigatório',  
      duration:3000
      });
      toast.present();
  
  }

  let body = {
    
    descricao: this.descricao,
    crud: 'adicionar'
  };

  this.serve.postData(body, 'categoria.php').subscribe(data => {

    this.showInsertOk();
  });

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
            this.navCtrl.setRoot('CategoriaListarPage')
          }
        }
      ]
    });
    alert.present();
  }

}
