export class Game {
    _id:string
    title:string
    developer:string
    publisher:string
    tags:string[]
    year:number

    constructor(_id='', title='', developer='', publisher='', tags=[], year=1990){
        this._id = _id
        this.title = title
        this.developer = developer
        this.publisher = publisher
        this.tags = tags
        this.year = year
    }
}