const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(bandLeader) {
  const  [ id ]  = await db('bandleaders').insert(bandLeader, 'id')

  return db('bandleaders')
    .where({ id })
    .first();
}

async function update(id, changes) {
    return db("wineries")
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db("bandleaders")
      .where("id", id)
      .del();
  }

function getAll() {
  return db('bandleaders');
}

function findById(id) {
    return db('bandleaders').where({ id });
}
