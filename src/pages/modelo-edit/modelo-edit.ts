import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-modelo-edit',
  templateUrl: 'modelo-edit.html',
})
export class ModeloEditPage {

  id:             number;
  descricao:      string ="";
  marc_id:       any;
  marcas:         any = [];

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}



ionViewDidLoad() {

  this.id         = this.navParams.get('id');
  this.descricao  = this.navParams.get('descricao');
  this.marc_id  = this.navParams.get('marc_id');

  this.listarMarca();
  this.marcas = [];
}

listarMarca() {
    
  let body = {
    
    crud:'listar-marc'
  }

  this.serve.postData(body,'marca.php').subscribe((data:any)=>{

    for(let item of data.result){
        this.marcas.push({
        id:item.id,
        descricao:item.descricao
      })

      
    }
  })

}


editar(){

  let body ={
    id:        this.id,
    descricao: this.descricao,
    marca_id: this.marc_id,
    crud: 'editar'
  };

  this.serve.postData(body, 'modelo.php').subscribe((data:any) =>{
  
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
          this.navCtrl.setRoot('ModeloListarPage')
        }
      }
    ]
  });
  alert.present();
}

}

