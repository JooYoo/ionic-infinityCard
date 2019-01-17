import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SqlStorageProvider } from '../sql-storage/sql-storage';
import { DbServiceProvider, TABLES } from '../db-service/db-service';

const win: any = window;
@Injectable()
export class StorageServiceProvider {
  public sqlMode: boolean = false;

  constructor(private storage: Storage, 
    private sql: SqlStorageProvider,
    private dbService: DbServiceProvider) {
    if (win.sqlitePlugin) {
      this.sqlMode = true
    } else {
      console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.')
    }
  }

  //CubeStack
  storageGetAllCubeStacks(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.cubeGetAll()
    }
  }
  storageAddCubeStack(cubeStack) {
    if (this.sqlMode) {
      this.sql.cubeSet((cubeStack.id).toString(), JSON.stringify(cubeStack))
    }
  }
  storageRemoveCubeStack(cubeStack) {
    if (this.sqlMode) {
      this.sql.cubeRemove(cubeStack.id.toString())
    }
  }
  storageEditCubeStack(cubeStack) {
    if (this.sqlMode) {
      this.sql.cubeSet((cubeStack.id).toString(), JSON.stringify(cubeStack))
    }
  }
  //Cube
  storageAddCube(cubeStack) {
    if (this.sqlMode) {
      this.sql.cubeSet(cubeStack.id.toString(), JSON.stringify(cubeStack))
    }
  }
  storageRemoveCube(cubeStack, cube) {
    // get all the data in this CubeStack
    let newCubeStack = this.storage.get(cubeStack.id.toString()).then(cubes => {
      let index = cubes.indexOf(cube)
      if (index > -1) {
        cubes.splice(index, 1)
      }
      cubeStack = newCubeStack
    })
    if (this.sqlMode) {
      // this.sql.cubeSet(cubeStack.id, JSON.stringify(cubeStack))
      this.dbService.update(cubeStack,TABLES.Cube)
    }
  }
  storageEditCube(cubeStack) {
    if (this.sqlMode) {
      this.sql.cubeSet(cubeStack.id.toString(), JSON.stringify(cubeStack))
    }
  }


  // CardStack
  storageGetAllCardStacks(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.getAll()
    } else {
      return new Promise(resolve => {
        let cardStacks = []
        this.storage.forEach(data => {
          console.log('***inside foreach cards', data)
          cardStacks.push(JSON.parse(data))
        })
        return resolve(cardStacks)
      })
    }
  }
  storageAddCardStack(cardStack) {
    if (this.sqlMode) {
      this.sql.set((cardStack.id).toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set((cardStack.id).toString(), JSON.stringify(cardStack))
    }
  }
  storageRemoveCardStack(cardStack) {
    if (this.sqlMode) {
      this.sql.remove(cardStack.id.toString())
    } else {
      this.storage.remove(cardStack.id.toString())
    }
  }
  storageEditCardStack(cardStack) {
    if (this.sqlMode) {
      this.sql.set((cardStack.id).toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set((cardStack.id).toString(), JSON.stringify(cardStack))
    }
  }
  // Card
  storageAddCard(cardStack) {
    //this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
    if (this.sqlMode) {
      this.sql.set(cardStack.id.toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
    }
  }
  storageRemoveCard(cardStack, card) {
    // get all the data in this CardStack
    let newCardStack = this.storage.get(cardStack.id.toString()).then(cards => {
      let index = cards.indexOf(card)
      if (index > -1) {
        cards.splice(index, 1)
      }
      cardStack = newCardStack
    })
    if (this.sqlMode) {
      this.sql.set(cardStack.id, JSON.stringify(cardStack))
    } else {
      this.storage.set(cardStack.id, JSON.stringify(cardStack))
    }
  }
  storageEditCard(cardStack) {
    if (this.sqlMode) {
      this.sql.set(cardStack.id.toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
    }
  }


  // initialize
  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.initializeDatabase()
    } else {
      return new Promise(resolve => resolve())
    }
  }
  cubeInitStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.cubeInitializeDatabase()
    }
  }

}
