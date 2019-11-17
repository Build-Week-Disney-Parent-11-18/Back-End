exports.const = users = [
  {
    username: 'LCoffelt', // 1
    last_name:  'Coffelt',
    first_name: 'Lorraine',
    password: '$2y$10$zJK0mcAuGXVRQJupICZtm.4iFdbycMVHehNbby6sJ/t8mKtW6koYK', // Nu8aixag8V
    role: 'volunteer'
  },
  {
    username: 'JLopez', // 2
    last_name:  'Lopez',
    first_name: 'Jean',
    password: '$2y$10$8yycDwTRlI2XthLP0yRGaOWL4PCQZN4UETjecXCfLZhVSp4C1n8tK', // iTh9Ooci3
    role: 'volunteer'
  },
  {
    username: 'AReinhardt', // 3
    last_name:  'Reinhardt',
    first_name: 'Amie',
    password: '$2y$10$WmBhlCPVVcfLyfyLPsvv1Osuwxjjhu97T7f9B9G4pWEAsnBmoGvGu', // Daisei9ugoo
    role: 'parent'
  },
  {
    username: 'RMartin', // 4
    last_name:  'Martin',
    first_name: 'Roy',
    password: '$2y$10$VMSGKGD1j3gsyS6QB2YTc./IyseYN3QfC8fld.OfbUDEDLSAwlbO2', // Aen4xaeyo6m
    role: 'parent'
  },
  {
    username: 'HWaller', // 5
    last_name:  'Waller',
    first_name: 'Henry',
    password: '$2y$10$TvHtgca1UmNRXl88duPOkOj189xHmYCAgeWEce8K7KdLCfhF1hsDu', // oL4shish
    role: 'parent'
  },
]


exports.seed = function(knex) {
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};

