import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

let apiUrl = 'http://rfacturacion.djremisse21sac.com/apk_login/';


@Injectable()
export class UserDataLogin {
  responseData : any;
  err : any;
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username: string, password: string): void {
    var userData = (
      'usuario=' + username +
      '&clave=' + password
    );

    this.postData(userData, 'iniciarSesionCliente')
      .then((result) => {
        this.responseData = result;
        if(this.responseData != false) {
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.setString('username', username);
          this.setString('password', password);
          this.setString('documento',this.responseData.dni);
          this.setString('imagen',this.responseData.imagen);
          this.setString('nombres',this.responseData.nombapel);
          this.setString('email',this.responseData.email);
          this.setInt('idpersona',this.responseData.idpersona);
          this.setInt('idempresa',this.responseData.idempresa);
          this.setInt('estado',this.responseData.estado);
          this.setInt('idpermiso',this.responseData.permiso);
          this.setInt('idusuario',this.responseData.idusuario);
          this.setString('nom_rol',this.responseData.nom_rol);
          this.setString('permiso',this.responseData.permiso);
          this.events.publish('user:login');
        }
      }, (err) => {
        err = 0 ;
        /**
         * Conexón fallida
         */
      });
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setString(username, username);
    this.events.publish('user:signup');
  };

  logout(): void {
    let me = this;
    me.storage.remove(this.HAS_LOGGED_IN);
    me.storage.remove('username');
    me.storage.remove('password');
    me.storage.remove('documento');
    me.storage.remove('imagen');
    me.storage.remove('nombres');
    me.storage.remove('email');
    me.storage.remove('idpersona');
    me.storage.remove('idempresa');
    me.storage.remove('estado');
    me.storage.remove('nom_rol');
    me.storage.remove('permiso');
    me.events.publish('user:logout');
  };

  setString(campo, value: string): void {
    this.storage.set(campo, value);
  }

  setInt(campo, value: number): void {
    this.storage.set(campo, value);
  }

  getString(campo) {
    return this.storage.get(campo).then((value) => {
      return value;
    });
  }

  getInt(campo) {
    return this.storage.get(campo).then((value) => {
      return value;
    });
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };

  postData(data, type) {
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    });
    let options = new RequestOptions({
        headers: headers
    });

    return new Promise((resolve, reject) => {
        headers = new Headers();
        this.http.post(apiUrl + type, data, options)
            .subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
    });
  }

  /*private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
  }*/
}
