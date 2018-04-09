const fs = require('fs');
const path = require('path');

const deleteActivity = (req, res) => {
  const filename = req.params.filename
  
  fs.unlink(path.join(__dirname, 'activities', filename), (err) => {
    if (err) throw err;

    res.send({ success: true })
  })
}

module.exports = deleteActivity
