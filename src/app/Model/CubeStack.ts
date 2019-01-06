import { Cube } from "./Cube";

export class CubeStack{

    id:number
    titleCn:string
    titleDe:string
    cubes: Cube[]
    date: string
    progress: number

    constructor(id:number, titleCn:string, titleDe:string, cubes:Cube[], date:string, progress:number){
        this.id = id
        this.titleCn = titleCn
        this.titleDe =titleDe
        this.cubes = cubes
        this.date = date
        this.progress = progress
    }
}