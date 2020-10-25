
exports.up = async function(knex) {
    await knex.schema.createTable('projects', tbl => {
       tbl.increments();
       tbl.text('name', 128).unique().notNullable();
       tbl.text('description');
       tbl.boolean('completed').defaultTo(false);
    })
    .createTable('resources', tbl => {
       tbl.increments();
       tbl.text('name', 128).unique().notNullable();
       tbl.text('description');
    })
    .createTable('tasks', tbl => {
       tbl.increments();
       tbl.integer('project_id')
       .unsigned()
       .notNullable()
       .references('id')
       .inTable('projects')
       .onUpdate('CASCADE')
       .onDelete('CASCADE');
       tbl.text('description').notNullable();
       tbl.text('notes');
       tbl.boolean('completed').defaultTo(false);
    })
 }
     
 exports.down = async function(knex) {
    await knex.schema
       .dropTableIfExists('tasks')
       .dropTableIfExists('resources')
       .dropTableIfExists('projects');
 }
   