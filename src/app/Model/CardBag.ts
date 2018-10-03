import { Card } from './Card'

export class CardBag {

    id:number
    titleCn:string
    titleDe:string
    cards: Card[] = []
    icon: string

    constructor(id:number, titleCn:string, titleDe:string, cards: Card[],icon:string) {
        this.id = id
        this.titleCn=titleCn
        this.titleDe = titleDe
        this.cards = cards
        this.icon = icon
    }
}