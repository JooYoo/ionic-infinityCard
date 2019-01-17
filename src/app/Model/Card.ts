import { CardStatus } from "./CardStatus"

export class Card {

    id: number
    cardStackId:number
    textCn: string
    textDe: string
    date: string
    status: CardStatus


    constructor(id: number, cardStackId: number, date: string, textCn: string, textDe: string, status: CardStatus) {
        this.id = id
        this.cardStackId = cardStackId
        this.date = date
        this.textCn = textCn
        this.textDe = textDe
        this.status = status
    }
}


