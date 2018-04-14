const fs = require('fs');
const path = require('path');

const deleteActivity = (req, res) => {
  const profileActivityId = req.params.profileActivityId;
  const userJsonPath = path.join(__dirname, 'user.json');

  fs.readFile(userJsonPath, 'utf8', (userErr, userJson) => {
    const user = JSON.parse(userJson);
    const userActivities = user.profile.activities;
    const matchingActivity = userActivities.find(activity => activity._id === profileActivityId);
    const matchingActivityIndex = userActivities.indexOf(matchingActivity);

    userActivities.splice(matchingActivityIndex, 1);

    fs.writeFile(userJsonPath, JSON.stringify(user), (err) => {
      if (err) throw err;

      res.status(200).send({ success: true });
    });
  });
};

module.exports = deleteActivity;
