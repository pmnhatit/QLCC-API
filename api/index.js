const express = require('express');
const router = express.Router();
const user = require('../components/user')
// import { Router } from 'express';
// import { version } from '../package.json';

router.use('/user', user);
// export default () => {
//     let api = Router();
//     // auth
//     api.use('/user', user);
//     // resources
//     api.use('/facets', requireAuth, facets.permissions(), facets.resource()); // using its api permissions
//     // No resource. Perhaps show API metadata
//     api.get('/', (req, res) => {
//       res.json({ version });
//     });
  
//     return api;
//   }
module.exports = router;