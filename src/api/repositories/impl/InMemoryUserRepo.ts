import {BaseRepository} from "../api/BaseRepository";
import { User } from "../../model/User";
import {Logger} from "../../../utils/Utils";

export class InMemoryUserRepo extends BaseRepository<User> {
    private users: Map<string, User>;

    constructor() {
        super();
        this.users = new Map<string, User>();
        const testUser: User = new User('test', 'test');
        this.users.set(testUser.username, testUser);
    }

    find(user: User): Promise<User[]> {
        return new Promise(() => this.users.get(user.username));
    }

    findOne(id: string): Promise<User> {
        return new Promise((resolve) => {
           const user: User =  this.users.get(id);
           resolve(user);
        });
    }

    async create(user: User): Promise<boolean> {

        Logger.info(user);

        return true;
    }
}