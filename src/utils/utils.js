import bcrypt from "bcrypt";

const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

const isValidPassword = (password, passwordHash) => {
    let resultado = bcrypt.compareSync(password, passwordHash);
    return resultado;
} 

export { createHash, isValidPassword };