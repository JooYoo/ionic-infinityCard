export class Cube {

    id: number
    date: string
    titleCn: string
    titleDe: string
    cubeTexts: string[]

    constructor(id: number, date: string, titleCn: string, titleDe: string, cubeTexts: string[]) {
        this.id = id
        this.date = date
        this.titleCn = titleCn
        this.titleDe = titleDe
        this.cubeTexts = cubeTexts
    }
}