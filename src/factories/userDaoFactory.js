import UserMemoryDao from "../dao/indexMemoryDao.js";
import UserMongooseDao from "../dao/indexMongooseDao.js";

class UserDaoFactory
{
    static create(daoKey)
    {
        const daos = {
            memory: UserMemoryDao,
            mongoose: UserMongooseDao
        }

        return new daos[daoKey];
    }

}

export default UserDaoFactory;