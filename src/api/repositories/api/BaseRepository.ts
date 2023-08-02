import {IWrite} from "./IWrite";
import {IRead} from "./IRead";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    create(item: T): Promise<boolean> {
        throw new Error(`Method not implemented. ${item}`);
    }
    update(id: string, item: T): Promise<boolean> {
        throw new Error(`Method not implemented. ${item}`);
    }
    delete(id: string): Promise<boolean> {
        throw new Error(`Method not implemented. ${id}`);
    }
    find(item: T): Promise<T[]> {
        throw new Error(`Method not implemented. ${item}`);
    }
    findOne(id: string): Promise<T> {
        throw new Error(`Method not implemented. ${id}`);
    }

}