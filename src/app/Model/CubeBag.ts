import { Cube } from "./Cube";

export class CubeBag{

    id:number
    titleCn:string
    titleDe:string
    cubes: Cube[]
    icon: string

    constructor(id:number, titleCn:string, titleDe:string, cubes:Cube[], icon:string){
        this.id = id
        this.titleCn = titleCn
        this.titleDe =titleDe
        this.cubes = cubes
        this.icon = icon
    }
}