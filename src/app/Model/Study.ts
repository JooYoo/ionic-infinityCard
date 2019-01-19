
export class Study{
    id: number
    date: string
    planAmount: number
    actualAmount: number
    stackTitle: string
    stackProgress: number

    constructor(id: number, date:string, planAmount: number, actualAmount: number,
        stackTitle:string, stackProgress:number){
        this.id = id
        this.date = date
        this.planAmount = planAmount
        this.actualAmount = actualAmount
        this.stackTitle = stackTitle
        this.stackProgress = stackProgress
    }
}