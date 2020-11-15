import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-modelo-insert',
  templateUrl: 'modelo-insert.html',
})
export class ModeloInsertPage {

  descricao: string = "";
  marca_id: any;
  marcas: any = [];
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
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
    marca_id:  this.marca_id,
    crud: 'adicionar'
  };

  this.serve.postData(body, 'modelo.php').subscribe(data => {

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
            
            this.navCtrl.setRoot('ModeloListarPage')
          }
        }
      ]
    });
    alert.present();
  }

}
