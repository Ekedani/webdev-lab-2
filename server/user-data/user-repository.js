export class UserRepository {
    constructor() {
        this.table = new Map();
    }

    add(userIP, data) {
        this.table.set(userIP, data);
    }

    delete(userIP) {
        this.table.delete(userIP);
    }

    get(userIP) {
        return this.table.get(userIP);
    }
}
