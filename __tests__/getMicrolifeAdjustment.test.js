/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const getMicrolifeAdjustment = require('../controllers/getMicrolifeAdjustment');

describe('getMicrolifeAdjustment', () => {
  it('gets the user\'s microlife adjustment for the day', (done) => {
    expect.assertions(2);

    const user = {
      profile: {
        activities: [{
          activityId: 'walk',
          quantity: 1,
        }, {
          activityId: 'meat',
          quantity: 2,
        }, {
          activityId: 'tv',
          quantity: 1,
        }],
      },
    };

    const filePath = path.join(__dirname, '../controllers', 'user.json');

    fs.writeFile(filePath, JSON.stringify(user), () => {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/profile/adjustment',
      });
      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      getMicrolifeAdjustment(request, response);

      response.on('end', () => {
        expect(response.statusCode).toEqual(200);
        expect(response._getData()).toEqual(expect.objectContaining({ dayTotal: 47 }));

        done();
      });
    });
  });

  afterEach(() => {
    const filePath = path.join(__dirname, '../controllers', 'user.json');
    fs.writeFileSync(filePath, '{"profile":{"activities":[]}}');
  });
});
