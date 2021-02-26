const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    // findById,
    findByUsername,
    getAll
}


function getAll() {
    return db('users')
}

// function findById(id) {
//     return db('users')
//     .select("id", "username", "password")
//     .where({ id })
//     .first()
// }

function findByUsername(username) {
    return db('users')
    .select("id", "username", "password")
    .where({ username });
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return db('users').where({ id }).first();
}