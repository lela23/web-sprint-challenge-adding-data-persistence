const express = require('express');
const router = express.Router();

const db = require('../../data/dbConfig');

// Returns all projects in the database
router.get('/projects', async (req, res) => {
	try {
		const projects  = await db('projects');
		res.json(projects);
	} catch (err) {
		next(err);
	}
})

//Returns all resources for a project
router.get("/projects/:id/resources", async (req, res, next) => {
	try {
	  const resources = await findResources(req.params.id);
	  res.json(resources);
	} catch (err) {
	  next(err);
	}
  });
  
  function findResources(id) {
	return db("project_resources as pr")
	  .innerJoin("projects as p", "p.id", "pr.project_id")
	  .innerJoin("resources as r", "r.id", "pr.resource_id")
	  .where("p.id", id)
	  .select("r.id", "r.name");
  }
  

//Returns all projects by ID
router.get('/projects/:id', async (req, res, next) => {
	try {
		const projects = await db('projects').where('id', req.params.id).limit(1)
		res.json(projects);
	} catch (err) {
		next(err)
	}
})

	
// Returns all resources
router.get('/resources', async (req, res) => {
	try {
		const resources  = await db('resources');
		res.json(resources);
	} catch (err) {
		next(err);
	}
})

// Creates a new project
router.post('/projects', async (req, res, next) => {

	try {
		const payload = {
			name: req.body.name,
			description: req.body.description,
			completed: req.body.completed
		}

		const [projectID] = await db('projects').insert(payload);
		const project = await db.first('*').from('projects').where('id', projectID);

		res.status(201).json(project);
	} catch (err) {
		next(err);
	}
})

// Creates a new resource
router.post('/resources', async (req, res, next) => {

	try {
		const payload = {
			name: req.body.name,
			description: req.body.description
		}

		const [resourceID] = await db('resources').insert(payload);
		const resource = await db('resources').where('id', resourceID).first();

		res.status(201).json(resource);
	} catch (err) {
		next(err);
	}
})


// Creates a new task
router.post('/projects/:id/tasks', async (req, res, next) => {

	try {
		const payload = {
			project_id: req.params.id,
			description: req.body.description,
			notes: req.body.notes,
			completed: req.body.completed
		}

		const [id] = await db('tasks').insert({ ...payload })
		const task = await db('tasks').where({ id }).first();

		res.status(201).json(task);
	} catch (err) {
		next(err);
	}
})

// Returns all tasks
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await db('tasks').join('projects', 'tasks.project_id', '=', 'projects.id')
		.select('tasks.id as task_id', 'projects.name as project_name', 'projects.description as project_description',
			'tasks.description as task_description', 'tasks.notes as task_notes','tasks.completed as task_completed');
		res.json(tasks);
	} catch (err) {
		next(err);
	}
})


module.exports = router;