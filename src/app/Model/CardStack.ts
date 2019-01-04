import { Card } from './Card'

export class CardStack {

    id: number
    titleCn: string
    titleDe: string
    cards: Card[] = []
    date: string //TODO: change to date: establish CardStack date
    progress: number

    constructor(id: number,
        titleCn: string,
        titleDe: string,
        cards: Card[],
        date: string,
        progress: number) {

        this.id = id
        this.titleCn = titleCn
        this.titleDe = titleDe
        this.cards = cards
        this.date = date
        this.progress = progress
    }
}