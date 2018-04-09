const fs = require('fs');
const path = require('path');

const getActivities = (req, res) => {
  const filePath = path.join(__dirname, 'profile.json');

  fs.readFile(filePath, 'utf8', (readError, userJson) => {
    if (readError) throw readError;

    const user = JSON.parse(userJson);
    console.log(user);

    res.status(200).send(user.profile.activities);
  });
};

module.exports = getActivities;
