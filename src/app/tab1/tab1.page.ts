import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatabeseService } from './../providers/databese.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: any;
  form: any = {cep: ""};
  length = 8;
  addressValue: boolean = false;
  msg: string = "";
  address: any = {};
  address2: any = {};
  urlMaps: String;
  lat: any;
  lng: any;
  mapErro: boolean;

  constructor(private http: HttpClient, private db: DatabeseService) { }

  reset(): void {
    this.address = {};
    this.addressValue = false;
    document.getElementById("map").style.display = "none";
    this.lat = 0;
    this.lng = 0;
  }

  vvalidation(inf): void {
    if (inf.cep == null || inf.cep.length != this.length) {
      this.addressValue = true;
      this.msg = "O cep deve conter 8 númeos!";
    }
  }

  consultAddress( cep ): void {
    this.addressValue = false;
    this.form = cep.form.value;
    this.vvalidation(this.form);
    if ( this.addressValue == false) {
      var urlApi = `http://viacep.com.br/ws/${this.form.cep}/json/`;
      this.http.get(urlApi).subscribe(query => {
      this.address = query;
      this.insertDB(this.address);
      });
      if(!this.address.erro){
        this.initMap(this.form.cep);
      }
    } 
    this.form = " ";
  }

  initMap(cep): void {
    var urlApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyDGVrbRBBJ2lvV-CePbC2sBeFDwPTAGjAo`;
      this.http.get(urlApi).subscribe(query => {
        this.address2 = query;
        if(this.address2.status != "ZERO_RESULTS"){
          this.lat = this.address2.results[0].geometry.location.lat;
          this.lng = this.address2.results[0].geometry.location.lng;
          var uluru = {lat: this.lat, lng: this.lng};
          this.map = new google.maps.Map(document.getElementById("map"), {
          center: uluru,
          zoom: 17,
          });
          var marker = new google.maps.Marker({
          position: uluru,
          map: this.map
          });
          document.getElementById("map").style.display = "block";
        } else {
          document.getElementById("map").style.display = "none";
          this.mapErro = true;
        }
      });
  }

  insertDB(value: any): void{
    var endereco = JSON.stringify(value);
    this.db.getBD().then((db: SQLiteObject) => {
      let sql = 'insert into endereco(end) values (?)';
      let end = [endereco];
      db.executeSql(sql, end).then(() => {
      }).catch(e => {
        console.error(e);
      })
    });
  }

}

