import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-marca-listar',
  templateUrl: 'marca-listar.html',
})
export class MarcaListarPage {

  limit: number = 10;
  start: number = 0;

  marcas: any = [];

  todos: Array<{id:any, descricao: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}

ionViewDidLoad() {
  this.marcas = [];
  this.start = 0;
  this.listarmarcas();
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
    this.listarmarcas().then(() => {
      event.complete();
    })
  }, 1000);
}

listarmarcas() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-marcas'
    };
    this.serve.postData(body, 'marca.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.marcas.push({
              id:            data.result[i]["id"],
              descricao:     data.result[i]["descricao"],

             
         
        });

      }

      })

      this.todos = this.marcas;

      resolve(true);

    });

}

getMarcas(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.marcas = this.todos.filter((marc) => {
      return (marc.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.marcas = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('MarcaInsertPage');
}

editar(id, descricao){

  this.navCtrl.push('MarcaEditPage', {
    id:         id,
    descricao:  descricao

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'fabricante.php').subscribe(data =>{
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
          this.navCtrl.setRoot('MarcaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}


