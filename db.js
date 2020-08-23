const Sequelize = require("sequelize");
/* Production: Using env variable
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: "pg",
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: true,
  },
});
*/
// Local: Check local folder
const sequelize = new Sequelize("postgres://journey:root@localhost/job_app", {
  dialect: "pg",
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: false,
  },
});

class User extends Sequelize.Model {}
User.init(
  {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

class Listing extends Sequelize.Model {}
Listing.init(
  {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    url: Sequelize.STRING,
    notes: Sequelize.TEXT,
  },
  {
    sequelize,
    modelName: "listing",
  }
);

Listing.belongsTo(User);
User.hasMany(Listing);

exports.sequelize = sequelize;
exports.User = User;
exports.Listing = Listing;