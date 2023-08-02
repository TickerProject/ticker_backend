export class User {

    private readonly username_: string;
    private readonly password_: string;

    constructor(username: string, password: string) {
        this.username_ = username;
        this.password_ = password;
    }

    get username(): string {
        return this.username_;
    }

    get password(): string {
        return this.password_;
    }
}