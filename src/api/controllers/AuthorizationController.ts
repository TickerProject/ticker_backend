import {JsonController, Get} from 'routing-controllers';
import {BaseRepository} from "../repositories/api/BaseRepository";
import {User} from "../model/User";
import {Logger} from "../../utils/Utils";
import {Service} from "typedi";
import {RepoFactory} from "../repositories/impl/RepoFactory";

@JsonController('/auth')
@Service()
export class AuthorizationController {
    private userRepo: BaseRepository<User>;

    constructor() {
        Logger.info('UserController created');

        this.userRepo = RepoFactory.getInstance();
    }

    @Get('/callback')
    public ping() {
        throw new Error('Not implemented yet');
    }

}