import {JsonController, Param, Body, Get, Post} from 'routing-controllers';
import {BaseRepository} from "../repositories/api/BaseRepository";
import {User} from "../model/User";
import {Logger} from "../../utils/Utils";
import {Service} from "typedi";
import {RepoFactory} from "../repositories/impl/RepoFactory";

@JsonController('/users')
@Service()
export class UserController {
    private userRepo: BaseRepository<User>;

    constructor() {
        Logger.info('UserController created');

        this.userRepo = RepoFactory.getInstance();
    }

    @Get('/ping')
    public ping() {
        return 'OK';
    }

    @Get('/:id')
    public async find(@Param('id') id: string) {

        let user;
        try {
            user = await this.userRepo.findOne(id);
        } catch(er) {
            Logger.error(er);
        }

        return user;
    }

    @Post('/users')
    post(@Body() user: User) {
        return this.userRepo.create(user);
    }

}