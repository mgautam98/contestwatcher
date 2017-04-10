const lowdb = require('lowdb');
const low = lowdb('db.json', {
  storage: require('lowdb/lib/storages/file-async')
})

module.exports = {low: low};

module.exports.user = (function () {
  var User = {};

  User.create = function (id) {
    console.log('Creating user ' + id);
    var user = low
      .get('users')
      .push({ id : id, notify: false, ignore: {'calendar': true} })
      .write();
    return low
      .get('users')
      .find({id : id});
  }

  User.get = function (id) {
    var user = low
      .get('users')
      .find({id : id});
    if (user.isUndefined().value())
      return module.exports.user.create(id);
    return user;
  }

  return User;
})();