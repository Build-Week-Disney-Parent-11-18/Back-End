exports.const = comments = [
  {
    user_id: 1,
    request_id: 1,
    comment:  `I'll be there!`
  },
  {
    user_id: 2,
    request_id: 3,
    comment:  `I will be! See you then.`
  }
]

exports.seed = function(knex) {
  return knex('comments')
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert(comments);
    });
};
