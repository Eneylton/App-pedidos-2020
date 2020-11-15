import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  limit: number = 10;
  start: number = 0;

  produtos: any = [];
  
  url:string;
  todos: Array<{id:any, ref: string, cat: string, marca: string, modelo:string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.listarProdutos();
  this.produtos = [];
  this.start = 0;
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
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarProdutos() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-produtos'
    }
    this.serve.postData(body, 'produto.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.produtos.push({
              id:          data.result[i]["id"],
              ref:         data.result[i]["ref"],
              cat:         data.result[i]["cat"],
              marca:       data.result[i]["marca"],
              fab:         data.result[i]["fab"],
              foto:        data.result[i]["foto"],
              modelo:      data.result[i]["modelo"],
              cat_id:      data.result[i]["cat_id"],
              marca_id:    data.result[i]["marca_id"],
              fab_id:      data.result[i]["fab_id"],
              mod_id:      data.result[i]["mod_id"]
         
        });

      }

      })

      this.todos = this.produtos;

      resolve(true);

    });

}

getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((produto) => {
      return (produto.ref.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (produto.cat.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (produto.marca.toLowerCase().indexOf(val.toLowerCase()) > -1)
             || (produto.modelo.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.produtos = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('ProdutoCadastroPage');
}

editar( id,
        ref,
        cat,
        marca,
        fab,
        foto,
        modelo,
        cat_id,
        marca_id,
        fab_id,
        mod_id){

  this.navCtrl.push('ProdutoEditarPage', {
   
        id:              id,
        ref:             ref,
        cat:             cat,
        marca:           marca,
        fab:             fab,
        foto:            foto,
        modelo:          modelo,
        cat_id:          cat_id,
        marca_id:        marca_id,
        fab_id:          fab_id,
        mod_id:          mod_id

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'produto.php').subscribe(data =>{
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
          this.navCtrl.setRoot('HomePage')
        }
      }
    ]
  });
  alert.present();
}

}


