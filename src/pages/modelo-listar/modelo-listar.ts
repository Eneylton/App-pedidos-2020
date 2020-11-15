import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-modelo-listar',
  templateUrl: 'modelo-listar.html',
})

export class ModeloListarPage {

  limit: number = 10;
  start: number = 0;

  modelos: any = [];

  todos: Array<{id:any, descricao: string, marca: string, marc_id: any}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}

ionViewDidLoad() {
  this.modelos = [];
  this.start = 0;
  this.listarmodelos();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarmodelos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarmodelos() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-modelos'
    };
    this.serve.postData(body, 'modelo.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.modelos.push({
              id:        data.result[i]["id"],
              descricao:   data.result[i]["veiculo"],
              marca:     data.result[i]["marca"],
              marc_id:     data.result[i]["marc_id"]

             
         
        });

      }

      })

      this.todos = this.modelos;

      resolve(true);

    });

}

getModelos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.modelos = this.todos.filter((model) => {
      return (model.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1)
      ||     (model.marca.toLowerCase().indexOf(val.toLowerCase()) > -1)
      ||     (model.marc_id.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.modelos = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('ModeloInsertPage');
}

editar(id,descricao,marc_id){

  this.navCtrl.push('ModeloEditPage', {
    id:            id,
    descricao:     descricao,
    marc_id:       marc_id

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'modelo.php').subscribe(data =>{
    this.showInsertOk();
  });

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
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


