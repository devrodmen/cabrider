import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';

import { UserDataLogin } from '../../providers/user-data-login';
import { Data } from '../../providers/data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  /*tabBarElement: any;
  splash = true;*/

  username: string;
  dni: string;
  idpersona: string;
  nombrerol: string;
  estado: string;
  nombres: string;
  email: string;
  imagen: string;
  permiso: string;
  imageURI:any;
  imageFileName:any;
  public documento = "";

  constructor(
    public alertCtrl: AlertController,
    public nav: NavController,
    public userData: UserDataLogin,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public data: Data,
    private transfer: FileTransfer,
    private camera: Camera
  ) {

    //me.tabBarElement = document.querySelector('.tabbar');

    this.storage.get('documento').then((documento) => {
      this.documento = documento;
    });

    this.storage.get('idpersona').then((idpersona) => {
      this.idpersona = idpersona;
    });
  }

  /*ionViewDidLoad() {
    let me = this;
    me.tabBarElement.style.display = 'none';
    setTimeout(() => {
      me.splash = false;
      me.tabBarElement.style.display = 'flex';
    }, 4000);
  }*/

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let me = this;
    //console.log(me.documento);
    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://144.217.7.226/remisse21/apk/updatePhoto/' + me.idpersona + "/" + me.documento
    , options)
      .then((data) => {
      console.log(data);
      this.imageFileName = "http://144.217.7.226/remisse21/public/personal/imagenes/user.jpg"
      loader.dismiss();
      this.presentToast("Imagen cargada satisfactoriamente");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
  ngAfterViewInit() {
    this.getUsername();
    this.getDocumento();
    this.getEmail();
    this.getEstado();
    this.getIdpersona();
    this.getImagen();
    this.getNombres();
    this.getNomRol();
    this.getPermiso();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setString("username",data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getString("username").then((username) => {
      this.username = username;
    });
  }

  getNombres() {
    this.userData.getString("nombres").then((nombres) => {
      this.nombres = nombres;
    });
  }

  getDocumento() {
    this.userData.getString("documento").then((dni) => {
      this.dni = dni;
    });
  }

  getEmail() {
    this.userData.getString("email").then((email) => {
      this.email = email;
    });
  }

  getEstado() {
    this.userData.getInt("estado").then((estado) => {
      this.estado = estado;
    });
  }

  getIdpersona() {
    this.userData.getInt("idpersona").then((idpersona) => {
      this.idpersona = idpersona;
    });
  }

  getImagen() {
    this.userData.getString("imagen").then((imagen) => {
      this.imagen = imagen;
    });
  }

  getNomRol() {
    this.userData.getString("nom_rol").then((nombrerol) => {
      this.nombrerol = nombrerol;
    });
  }

  getPermiso() {
    this.userData.getString("permiso").then((permiso) => {
      this.permiso = permiso;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
