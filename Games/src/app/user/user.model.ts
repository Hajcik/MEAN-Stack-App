export class User {
    _id:string
    username:string
    email:string
    password:string
    roles:string[]

    constructor(_id='', username='', email='', password='', roles=[]) {
        this._id = _id
        this.username = username
        this.email = email
        this.password = password
        this.roles = roles
    }
}