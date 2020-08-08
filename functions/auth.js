const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');


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
          /*
          await sequelize.sync({force: true}); // create tables that does not sync
  
        
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync('password', salt);
          const user = await User.create({

            email: "aym@man.com",
            password: hash
          });
          

          const count = await User.count();
          */
          return {
              statusCode: 200,
              body: `DB Succesful! Username: ${user.email}! Count: ${count} `
  
          };   
      } catch(err) {
          return {
              statusCode: 400,
              body: `DB Failed: ${err.message} `
          };   
      }
  
  };