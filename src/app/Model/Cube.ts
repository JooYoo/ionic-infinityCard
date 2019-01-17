export class Cube {

    id: number
    cubeStackId: number
    date: string
    titleCn: string
    titleDe: string
    cubeSide1: string
    cubeSide2: string
    cubeSide3: string
    cubeSide4: string
 

    constructor(id: number, cubeStackId: number, date: string, titleCn: string, 
                titleDe: string, cubeSide1: string, cubeSide2: string,
                cubeSide3:string, cubeSide4:string) {
        this.id = id
        this.cubeStackId = cubeStackId
        this.date = date
        this.titleCn = titleCn
        this.titleDe = titleDe
        this.cubeSide1 = cubeSide1
        this.cubeSide2 = cubeSide2
        this.cubeSide3 = cubeSide3
        this.cubeSide4 = cubeSide4
    }
}