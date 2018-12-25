import { Card } from './Card'

export class CardStack {

    id: number
    titleCn: string
    titleDe: string
    cards: Card[] = []
    icon: string //TODO: change to date: establish CardStack date
    progress: number

    constructor(id: number,
        titleCn: string,
        titleDe: string,
        cards: Card[],
        icon: string,
        progress: number) {

        this.id = id
        this.titleCn = titleCn
        this.titleDe = titleDe
        this.cards = cards
        this.icon = icon
        this.progress = progress

    }
}