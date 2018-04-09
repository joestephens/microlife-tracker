const fs = require('fs');
const path = require('path');

const updateActivity = (req, res) => {
  const filename = req.params.filename
  const contents = JSON.stringify(req.body)

  fs.writeFile(path.join(__dirname, 'activities', filename), contents, (err) => {
    if (err) throw err;

    res.send({ filename: filename })
  })
}

module.exports = updateActivity
