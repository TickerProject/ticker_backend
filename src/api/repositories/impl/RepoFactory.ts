import {InMemoryUserRepo} from "./InMemoryUserRepo";
import {BaseRepository} from "../api/BaseRepository";
import {User} from "../../model/User";

export class RepoFactory {
    private static userRepo: BaseRepository<User>;
    public static getInstance() : BaseRepository<User> {
        if (!this.userRepo) { // TODO ADD DB repo
            this.userRepo = new InMemoryUserRepo();
        }

        return this.userRepo;
    }
}