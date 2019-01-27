import { StackType } from "./StackType";

export class Study {

    id: number
    studyDailyId: number
    stackTitle:string
    stackProgress: number

    constructor(id: number, studyDailyId: number, stackTitle: string, stackProgress: number) {
        this.id = id
        this.studyDailyId = studyDailyId
        this.stackTitle = stackTitle
        this.stackProgress = stackProgress
    }
}