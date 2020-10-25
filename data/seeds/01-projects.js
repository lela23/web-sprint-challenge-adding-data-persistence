
exports.seed = async function(knex) {
  await knex('projects').insert([
     {name: 'Make a Web Page', description: 'In this project we make a web page.'},
     {name: 'Create a Resume', description: 'In this project we create a resume.'},
     {name: 'Learn another language', description: 'In this project we learn another language.'},
  ])
}