module.exports = (e) => {
    const {sqlMessage} = e.parent;
    return sqlMessage;
}