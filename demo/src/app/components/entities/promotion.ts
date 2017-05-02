export class Promotion{
    constructor(
    public name:string='',
    public partner:string='',
    public status:string='',
    public type:string='',
    public description:string='',
    public startDate?:Date,
    public endDate?:Date
    ){

    }
}