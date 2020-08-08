const Sequelize= require('sequelize');


const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
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

exports.handler = async () => {

    try {
        await sequelize.authenticate(); // By default , sync.
        await sequelize.sync(); // create tables that does not sync

        const count = await User.count();
        return {
            statusCode: 200,
            body: `DB Succesful! You have ${count} users`

        };   
    } catch(err) {
        return {
            statusCode: 400,
            body: `DB Failed: ${err.message} `
        };   
    }

};