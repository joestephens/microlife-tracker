/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const deleteActivity = require('../controllers/deleteActivity');

describe('deleteActivity', () => {
  it('updates a user activity quantity', (done) => {
    expect.assertions(2);

    const user = {
      profile: {
        activities: [{
          _id: 'abc123',
          activityId: 'walk',
          quantity: 1,
        }, {
          _id: 'def456',
          activityId: 'meat',
          quantity: 2,
        }],
      },
    };

    const filePath = path.join(__dirname, '../controllers', 'user.json');

    fs.writeFile(filePath, JSON.stringify(user), () => {
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/profile/activities/def456',
        params: {
          profileActivityId: 'def456',
        },
      });
      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      deleteActivity(request, response);

      response.on('end', () => {
        fs.readFile(filePath, 'utf8', (error, userJson) => {
          expect(response.statusCode).toEqual(200);

          const updatedUser = JSON.parse(userJson);
          const updatedActivities = updatedUser.profile.activities;

          const deletedActivity = user.profile.activities[1];
          expect(updatedActivities).not.toContainEqual(expect.objectContaining(deletedActivity));

          done();
        });
      });
    });
  });

  afterEach(() => {
    const filePath = path.join(__dirname, '../controllers', 'user.json');
    fs.writeFileSync(filePath, '{"profile":{"activities":[]}}');
  });
});
