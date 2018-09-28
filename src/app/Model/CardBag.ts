import { Card } from './Card'

export class CardBag {

    id:number
    title:string
    cards: Card[] = []
    icon: string

    constructor(id:number, title:string, cards: Card[],icon:string) {
        this.id = id
        this.title=title
        this.cards = cards
        this.icon = icon
    }
}