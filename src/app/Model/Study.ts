
export class Study{
    id: number
    date: string
    planAmount: number
    actualAmount: number

    Study(id: number, date:string, planAmount: number, actualAmount: number){
        this.id = id
        this.date = date
        this.planAmount = planAmount
        this.actualAmount = actualAmount
    }
}