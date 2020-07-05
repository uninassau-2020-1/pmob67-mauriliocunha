import { Component, OnInit } from '@angular/core';
import { DatabeseService } from '../providers/databese.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  enderecos: any = new Array<any>();
  endereco: any = {};

  constructor(private db: DatabeseService) { }

  ngOnInit() {
    this.consultaLista();
  }

  consultaLista(){
    this.db.selectDB().then((end: Array<any>) => {
      this.enderecos = end;
      
    }).catch(e => {
      console.error(e);
    })
  }

  getEndereco(item: any): string{
    var jsonString = JSON.stringify(item);
    return jsonString;
  }

  removeEnderecos(){
    this.db.deleteDBTotal().then(() => {
      this.consultaLista();
      alert("Banco de dados excluído!");
    }).catch(e => console.error(e));

  }

}
