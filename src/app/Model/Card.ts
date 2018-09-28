import { CardStatus } from "./CardStatus"

export class Card {

    id: number
    date: string
    textCn: string
    textDe: string
    status: CardStatus


    constructor(id: number, date: string, textCn: string, textDe: string, status: CardStatus) {
        this.id = id
        this.date = date
        this.textCn = textCn
        this.textDe = textDe
        this.status = status
    }
}