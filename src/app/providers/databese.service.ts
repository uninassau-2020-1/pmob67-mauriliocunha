import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DatabeseService {

  constructor(private sqlite: SQLite) { }
  
  public getBD() {
    return this.sqlite.create({
      name: 'dbapp.db',
      location: 'default'
    });
  }

  public createBD() {
    return this.getBD()
    .then((db: SQLiteObject) => {
      this.createTable(db);
    })
    .catch(e => console.error(e));
  }

  private createTable(db: SQLiteObject) {
    return db.sqlBatch(
     ['CREATE TABLE IF NOT EXISTS endereco(id INTEGER PRIMARY KEY, end VARCHAR);'] 
    ).then(() => {
      console.log("Deu certo")
    }).catch(e => {
      console.error(e);
    });
  }

  public selectDB(){
    return this.getBD().then((db: SQLiteObject) => {
      let sql = 'select * from endereco';
      let end: any[];
      return db.executeSql(sql, end).then((end: any) => {
        let enderecos = new Array<any>();
        if(end.rows.length > 0){
          for (var i=0; i<end.rows.length; i++){
            let temp = end.rows.item(i);
            enderecos.push(temp);
          }
          return enderecos;
        }else{
          return new Array<any>();
        }
        
      }).catch(e => {
        console.error(e);
      })
    }).catch(e => {
      console.error(e);
    });
  }

  deleteDBTotal(){
    return this.getBD().then((db: SQLiteObject) => {
      let sql = 'delete from endereco';
      let end: any[];
      return db.executeSql(sql, end).then(() => {
        console.log("endereço excluido")
      }).catch(e => console.error(e));
    }).catch(e => console.error(e));
  }
}
