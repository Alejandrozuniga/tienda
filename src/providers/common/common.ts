import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonProvider {

  static alert = null;
  loader: Loading;

  constructor(
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    alertCtrl.create();
    CommonProvider.alert = alertCtrl;

    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
  }

  basicAlert(titulo: string, mensaje: string, idMensaje?: number) {
    return new Promise((resolve, reject) => {
      let alert = CommonProvider.alert.create({
        title: titulo,
        enableBackdropDismiss: false,
        message: mensaje,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              resolve(true);

            }
          }
        ]
      });
      alert.present().then(res => {
        console.log(res);
        if (res && idMensaje) {
          let alertMessages = document.getElementsByClassName("alert-head");
          if (alertMessages[0]) {
            alertMessages[0].setAttribute("style", "padding-bottom: 0px;");
            let svg = this.crearIconoSVG(idMensaje);
            svg.style.height = "60px";
            alertMessages[0].appendChild(svg);

          }
        }
      });
    });
  }

  confirmAlert(titulo: string, mensaje: string) {
    return new Promise((resolve, reject) => {
      let alert = CommonProvider.alert.create({
        title: titulo,
        enableBackdropDismiss: false,
        message: mensaje,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              reject("dio clic en boton cancelar");
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              resolve("");
            }
          }
        ]
      });
      alert.present();
    });
  }

  /**
   *  Muestra el  indicador de carga
   */
  presentLoading(mensaje?: string) {
    let loader = this.loadingCtrl.create({
      content: mensaje || "Cargando..."
    });
    loader.present();
    return loader;
  }

  /**
   *  Oculta el  indicador de carga
   */
  dismissLoading(p) {
    //todo buscar que existe la pagina, sino existe no se hace el dismiss
    p.dismiss()
  }

  crearIconoSVG(id: number): HTMLImageElement {
    let svgElement = document.createElement("img");
    switch (id) {
      case 1:
      case 2:
        svgElement.src = "assets/imgs/popup_pin" + id + ".svg";
        break;
      default:
        break;
    }
    return svgElement;
  }
}
