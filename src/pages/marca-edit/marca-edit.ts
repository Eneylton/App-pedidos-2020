import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-marca-edit',
  templateUrl: 'marca-edit.html',
})
export class MarcaEditPage {

  id:             number;
  descricao:      string ="";

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}



ionViewDidLoad() {

  this.id         = this.navParams.get('id');
  this.descricao  = this.navParams.get('descricao');
}

editar(){

  let body ={
    id:        this.id,
    descricao: this.descricao,
    crud: 'editar'
  };

  this.serve.postData(body, 'marca.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });
}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Seu Registro foi Atualizado',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('MarcaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}

