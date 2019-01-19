import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Platform } from "ionic-angular";

const DB_NAME: string = 'infinityDB';
const win: any = window;
export enum TABLES { CardStack, Card, CubeStack, Cube, StudyDaily, Study };

@Injectable()
export class DbServiceProvider {
  private _dbPromise: Promise<any>;

  constructor(public platform: Platform) {

    this._dbPromise = new Promise((resolve, reject) => {
      try {
        let _db: any;
        this.platform.ready().then(() => {
          if (this.platform.is('cordova') && win.sqlitePlugin) {
            //FOR MOBILE DEVICE
            _db = win.sqlitePlugin.openDatabase({
              name: DB_NAME,
              location: 'default'
            });
          } else {
            //FOR WEBSQL
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            _db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
          }
          resolve(_db);
        });
      } catch (err) {
        reject({ err: err });
      }
    });
    this._tryInit();
  }

  _tryInit(drop = false) {
    if (drop) {
      this.dropTable(TABLES.CardStack);
      this.dropTable(TABLES.Cube);
    }
    this.createCardStackTable()
    this.createCardTable()
    this.createCubeStackTable()
    this.createCubeTable()
    this.createStudyDailyTable()
    this.createStudyTable()
  }
  private dropTable(table: TABLES) {
    this.query("DROP TABLE " + TABLES[table]
    ).catch(err => {
      console.error('Storage: Unable to create initial storage User table', err.tx, err.err);
    });
  }

  // create Tables
  private createCardStackTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.CardStack] + ` (
                        id integer primary key,
                        titleCn text,
                        titleDe text,
                        date text,
                        cards text,
                        progress varchar
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Card table', err.tx, err.err);
    });
  }
  private createCardTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.Card] + ` (
                        id integer primary key,
                        cardStackId integer,
                        textCn text,
                        textDe text,
                        date text,
                        status text,
                        FOREIGN KEY(cardStackId) REFERENCES CardStack(id)
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Card table', err.tx, err.err);
    });
  }
  private createCubeStackTable() {
    this.query(`
    CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.CubeStack] + ` (
                        id integer primary key,
                        titleCn text,
                        titleDe text,
                        cubes text,
                        date text,
                        progress varchar
                   )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
    });
  }
  private createCubeTable() {
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.Cube] + ` (
                      id integer primary key,
                      cubeStackId integer,
                      date text,
                      titleCn text,
                      titleDe text,
                      cubeSide1 text,
                      cubeSide2 text,
                      cubeSide3 text,
                      cubeSide4 text,
                      FOREIGN KEY(cubeStackId) REFERENCES CubeStack(id)
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
    });
  }
  private createStudyDailyTable(){
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.StudyDaily] + ` (
                      id integer primary key,
                      studys text,
                      date text,
                      planAmount integer,
                      actualAmount integer
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
    });
  }
  private createStudyTable(){
    this.query(`
      CREATE TABLE IF NOT EXISTS ` + TABLES[TABLES.Study] + ` (
                      id integer primary key,
                      studyDailyId integer,
                      stackType text,
                      stackId integer,
                      FOREIGN KEY(studyDailyId) REFERENCES StudyDaily(id)
                     )
    `).catch(err => {
      console.error('Storage: Unable to create initial storage Cube table', err.tx, err.err);
    });
  }
  


  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._dbPromise.then(db => {
          db.transaction((tx: any) => {
            tx.executeSql(query, params,
              (tx: any, res: any) => resolve({ tx: tx, res: res }),
              (tx: any, err: any) => reject({ tx: tx, err: err }));
          },
            (err: any) => reject({ err: err }));
        });
      } catch (err) {
        reject({ err: err });
      }
    });
  }

  // Get All items 
  list(table: TABLES): Promise<any> {
    return this.query('SELECT * FROM ' + TABLES[table]).then(data => {
      let result = [];

      if (data.res.rows.length > 0) {
        console.log('Rows found.');
        if (this.platform.is('cordova') && win.sqlitePlugin) {
          for (let i = 0; i < data.res.rows.length; i++) {
            var row = data.res.rows.item(i);
            result.push(row);
          }
          return result;
        } else {
          for (let i = 0; i < data.res.rows.length; i++) {
            var row = data.res.rows.item(i);
            result.push(row);
          }
          // return data.res.rows;
          return result;
        }
      }
    });
  }

  // Add Item
  insert(newObject, table: TABLES): Promise<any> {
    return this.query('INSERT INTO ' + TABLES[table] + ' (' + this.getFieldNamesStr(newObject)
      + ') VALUES (' + this.getFieldValuesStr(newObject) + ")", []);
  }

  // Edit Item
  update(object, table: TABLES): Promise<any> {
    return this.query('UPDATE ' + TABLES[table] + ' SET ' + this.getFieldSetNamesStr(object) + ' WHERE id=?',
      this.getFieldValuesArray(object));
  }

  // Remove Item
  delete(table: TABLES, object): Promise<any> {
    let query = "DELETE FROM " + TABLES[table] + " WHERE id=?";
    return this.query(query, [object.id]);
  }


  // columne data
  private getFieldNamesStr(newObject) {
    let fields = '';
    for (let f in newObject) {
      if (f !== "id") fields += f + ',';
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }
  private getFieldValuesStr(object) {
    let fields = '';
    for (let f in object) {
      if (f !== "id") fields += '\"' + object[f] + '\",';
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }
  private getFieldSetNamesStr(object) {
    let fields = '';
    for (let f in object) {
      if (f !== "id") fields += f + "=? ,";
    }
    fields = fields.substr(0, fields.length - 1);
    return fields;
  }
  private getFieldValuesArray(object) {
    let fields = [];
    for (let f in object) {
      if (f !== "id") fields.push(object[f]);
    }
    fields.push(object.id);
    return fields;
  }
}
