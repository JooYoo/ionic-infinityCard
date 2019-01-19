import { StackType } from "./StackType";

export class Study {

    id: number
    studyDailyId: number
    stackType: StackType
    stackId: number

    constructor(id: number, studyDailyId: number, stackType: StackType, stackId: number) {
        this.id = id
        this.studyDailyId = studyDailyId
        this.stackType=stackType
        this.stackId = stackId
    }
}