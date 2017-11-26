'use strict';

const express = require('express');
const router = express.Router();

const { projectList } = require('../data.js');

router.get('/', function(req, res) {
  res.json(projectList);
});

router.get('/:id', function(req, res) {
  let id = +req.params.id;
  const project = projectList.find((x) => x.id === id);
  if (project) {
    return res.json({ code: 1, project });
  } else {
    return res.json({
      code: 2,
      message: 'not found'
    });
  }
});

// // create
// router.post('/', function(req, res) {});

// // delete one
// router.delete('/:id', function(req, res) {
//   let id = req.params.id;
//   // Projects.remove({
//   //     _id: id
//   // }).then(() => {
//   //     res.send('success');
//   // });
// });

// router.put('/:id', function(req, res) {
//   let id = req.params.id;
//   // Projects.update({
//   //     _id: id
//   // }, {
//   //     name: req.body.name,
//   //     email: req.body.email,
//   //     number: req.body.number
//   // }).then(result => {
//   //     res.json(result);
//   // });
// });

module.exports = router;
