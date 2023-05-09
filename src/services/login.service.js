import containerMongoDB from "../dao/indexMongooseDao.js";
import {usersCollection, usersSchema} from '../dao/models/users.models.js';

const userModel = new containerMongoDB(usersCollection, usersSchema);

const registerUser = async (newUser) => {
    let result = await userModel.registerUser(newUser);
    return result
}

const loginUser = async (email) => {
    const search = {email};
    let result = await userModel.searchUser(search);
    return result
}

const getUserId = async (userId) => {
    let result = await userModel.getUserId(userId);
    return result
}

export {registerUser, loginUser, getUserId};