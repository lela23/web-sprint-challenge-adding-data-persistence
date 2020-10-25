
exports.seed = async function(knex) {
  await knex('resources').insert([
     {name: 'internet', description: 'This resource is the internet.'},
     {name: 'library', description: 'This resource is the library.'},
     {name: 'person', description: 'This resource is a person.'}
  ])
}
