import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { API_URL, UR_PRODUCTO } from '../../utils/common';


/*
  Generated class for the ApiqrProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiqrProvider {

  

  constructor(public http: Http) {
    
  }

  getProductById(id:number){    
    return this.http.get(API_URL+UR_PRODUCTO+id);
  }
}
