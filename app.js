const express = require('express');
const bodyParser = require('body-parser');
const createActivity = require('./controllers/createActivity');
const getActivities = require('./controllers/getActivities');
const getMicrolifeAdjustment = require('./controllers/getMicrolifeAdjustment');
const updateActivity = require('./controllers/updateActivity');
const deleteActivity = require('./controllers/deleteActivity');

const app = express();
app.use(bodyParser.json());

app.post('/profile/activities', createActivity);

app.get('/profile/activities', getActivities);

app.get('/profile/activities/:profileActivityId', getActivities);

app.get('/profile/adjustment', getMicrolifeAdjustment);

app.put('/profile/activites/:profileActivityId', updateActivity);

app.delete('/profile/activities/:profileActivityId', deleteActivity);

app.listen(3000, () => console.log('Listening on port 3000'));
