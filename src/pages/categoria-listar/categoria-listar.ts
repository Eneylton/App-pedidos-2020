import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';



@IonicPage({})
@Component({
  selector: 'page-categoria-listar',
  templateUrl: 'categoria-listar.html',
})

export class CategoriaListarPage {

  limit: number = 10;
  start: number = 0;

  categorias: any = [];

  todos: Array<{id:any, descricao: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}

ionViewDidLoad() {
  this.categorias = [];
  this.start = 0;
  this.listarCategorias();
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
    this.listarCategorias().then(() => {
      event.complete();
    })
  }, 1000);
}

listarCategorias() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-categorias'
    };
    this.serve.postData(body, 'categoria.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.categorias.push({
              id:            data.result[i]["id"],
              descricao:     data.result[i]["descricao"],

             
         
        });

      }

      })

      this.todos = this.categorias;

      resolve(true);

    });

}

getCategorias(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.categorias = this.todos.filter((categoria) => {
      return (categoria.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.categorias = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('CategoriaInsertPage');
}

editar(id, descricao){

  this.navCtrl.push('CategoriaEditPage', {
    id:         id,
    descricao:  descricao

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'categoria.php').subscribe(data =>{
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
          this.navCtrl.setRoot('CategoriaListarPage')
        }
      }
    ]
  });
  alert.present();
}

}

