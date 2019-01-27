import { Study } from "./Study"

export class StudyDaily{
    id: number
    studys:Study[]
    date: string
    planAmount: number
    actualAmount: number

    constructor(id: number, studys:Study[], date:string, planAmount: number, actualAmount: number){
        this.id = id
        this.studys = studys
        this.date = date
        this.planAmount = planAmount
        this.actualAmount = actualAmount
    }
}