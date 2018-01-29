
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', age: 30},
        {username: 'user2', age: 31},
        {username: 'user3', age: 32},
        {username: 'user4', age: 33}
      ]).then(console.log)

    })
}
