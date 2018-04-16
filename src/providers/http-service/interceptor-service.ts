import { Http, Request, RequestOptionsArgs, Response, ResponseOptions, RequestOptions, ConnectionBackend } from '@angular/http';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { CommonProvider } from '../common/Common';



export class InterceptorHttp extends Http {

    cont: number;
    loader: any;


    constructor(
        protected app: App,
        public backend: ConnectionBackend,
        public defaultOptions: RequestOptions,
        public common: CommonProvider
    ) {
        super(backend, defaultOptions);
        this.cont = 0;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options))
        /*.timeout(
            CONSTANTS.TIMEOUT_REQUEST
        )
            .catch((err: Response) => {

                return Observable.throw(new Response(new ResponseOptions({ status: 999 })));
            })*/
        );
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)))
        /*
        .timeout(
            CONSTANTS.TIMEOUT_REQUEST
        )
            .catch((err: Response) => {

                return Observable.throw(new Response(new ResponseOptions({ status: 999 })));
            })
        );*/
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }


    intercept(observable: Observable<Response>): Observable<Response> {
        console.log("Paso por interceptor");
        
        if (this.cont++ == 0) {
            this.loader = this.common.presentLoading();
        }
        let manejador = new Observable<Response>(obs => {
            observable.subscribe((data: Response) => {
                if (--this.cont <= 0) {
                    this.cont = 0;
                    this.common.dismissLoading(this.loader);
                }
                obs.next(data);
                obs.complete();
            }, (err) => {
                if (--this.cont <= 0) {
                    this.cont = 0;
                    this.common.dismissLoading(this.loader);
                }

                if (err.status == 0 || err.status == 502) {
                    obs.error(err);
                    obs.complete();
                    return;
                }
                let response;
                try {
                    response = JSON.parse(err._body);
                } catch (tryerr) {
                    obs.error(err);
                    obs.complete();
                    return;
                }

                if (err.status == 999) {
                    this.common.basicAlert('QR App', 'Tiempo de espera de la operación agotado, intente nuevamente.')
                        .then(data => {
                            //this.app.getRootNav().setRoot();
                        });
                } else {
                    obs.error(err);
                }
                obs.complete();
            });
        });
        return manejador;
    }
}
