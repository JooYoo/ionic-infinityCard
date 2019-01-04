import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SqlStorageProvider } from '../sql-storage/sql-storage';

const win: any = window;
@Injectable()
export class StorageServiceProvider {
  private sqlMode: boolean = false;

  constructor(private storage: Storage, private sql: SqlStorageProvider) {
    if (win.sqlitePlugin) {
      this.sqlMode = true
    } else {
      console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.')
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
          console.log('***inside foreach', data)
          cardStacks.push(JSON.parse(data))
        })
        return resolve( cardStacks)
      })
    }
    // let cardStacks = []
    // this.storage.forEach(data => {
    //   console.log('***inside foreach', data)
    //   cardStacks.push(JSON.parse(data))
    // })
    // return cardStacks
  }
  storageAddCardStack(cardStack) {
    if (this.sqlMode) {
      this.sql.set((cardStack.id ).toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set((cardStack.id ).toString(), JSON.stringify(cardStack))
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
      this.sql.set((cardStack.id + 1).toString(), JSON.stringify(cardStack))
    } else {
      this.storage.set((cardStack.id + 1).toString(), JSON.stringify(cardStack))
    }
  }

  // Card
  storageAddCard(cardStack) {
    this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
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
    this.storage.set(cardStack.id, JSON.stringify(cardStack))
  }
  storageEditCard(cardStack) {
    this.storage.set(cardStack.id.toString(), JSON.stringify(cardStack))
  }


  // initialize
  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.initializeDatabase()
    } else {
      return new Promise(resolve => resolve())
    }
  }




}
