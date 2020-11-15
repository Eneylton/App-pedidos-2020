import { Component } from '@angular/core';
import { Camera, CameraOptions   } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-cadastro',
  templateUrl: 'produto-cadastro.html',
})
export class ProdutoCadastroPage {

    referencia:     string = "";
    foto:           string = "";
    marca_id:       any = "";
    modelo_id:      any = "";
    categoria_id:   any = "";
    fabricante_id:  any = "";

    marcas: any = [];
    modelos: any = [];
    categorias: any = [];
    fabricantes: any = [];

    base64Image : string = "";
    cameraData: string;
   

  constructor(public navCtrl: NavController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

      
      
  }

  ionViewDidLoad() {
    this.listarMarca();
    this.listarFabricante();
    this.listarCategoria();

    this.marcas = [];
    this.modelos = [];
    this.fabricantes = [];
    this.categorias = [];
   
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

   listarModelo() {
    
     let body = {
       marca_id:this.marca_id,
       crud:'listar-model'
     }

     this.serve.postData(body,'modelo.php').subscribe((data:any)=>{

       for(let item of data.result){
           this.modelos.push({
           id:item.id,
           descricao:item.descricao
         })

      
       }
    })

   }

   listarFabricante() {
  
     let body = {
  
       crud:'listar-fabri'
     }
   this.serve.postData(body,'fabricante.php').subscribe((data:any)=>{
     for(let item of data.result){
           this.fabricantes.push({
           id:item.id,
           descricao:item.descricao
         })

       }
     })
 }


   listarCategoria() {
  
     let body = {
  
       crud:'listar-cate'
     }
   this.serve.postData(body,'categoria.php').subscribe((data:any)=>{
     for(let item of data.result){
           this.categorias.push({
           id:item.id,
           descricao:item.descricao
         })

       }
     })
 }


 presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Abrir Midia',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.abrirCamrera();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.abrirGaleria();
        }

      }
    ]
  });

  actionSheet.present();
}


abrirCamrera() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}


abrirGaleria() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}



  cadastrar() {

    if(this.referencia ==""){
      
      const toast = this.toastyCrtl.create({
      message: 'O campo Referência é Obrigatório',  
      duration:3000
      });
      toast.present();
  
  }

  let body = {
    
    referencia:      this.referencia,
    foto:            this.cameraData,
    marca_id:        this.marca_id,
    modelo_id:       this.modelo_id,
    categoria_id:    this.categoria_id,
    fabricante_id:   this.fabricante_id,

    crud: 'adicionar'
  };

  this.serve.postData(body, 'produto.php').subscribe(data => {

    this.showInsertOk();
  });

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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

