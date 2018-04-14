/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const updateActivity = require('../controllers/updateActivity');

describe('updateActivity', () => {
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
        method: 'PUT',
        url: '/profile/activities/def456',
        params: {
          profileActivityId: 'def456',
        },
        body: {
          quantity: 1,
        },
      });
      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      updateActivity(request, response);

      response.on('end', () => {
        fs.readFile(filePath, 'utf8', (error, userJson) => {
          expect(response.statusCode).toEqual(200);

          const updatedActivity = Object.assign({}, user.profile.activities[1], { quantity: 1 });
          const updatedUser = JSON.parse(userJson);
          const updatedUserActivities = updatedUser.profile.activities;

          expect(updatedUserActivities).toContainEqual(expect.objectContaining(updatedActivity));

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
