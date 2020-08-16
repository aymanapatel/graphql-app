const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require("../db");

  
  exports.handler = async (event) => {
  
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

          console.log(event);
          const {name, pass} = basicAuth(event);  
          const user = await User.findOne( {
            where: {
              email: {
                [Sequelize.Op.iLike]: name
              },
            }
          });

          if(user) {
            const passwordMatch = await bcrypt.compare(pass, user.password);
            if(passwordMatch) {

              
              
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email
                  
                },
                "JWT_SECRET" // TODO process.env.JWT_+STRING was giving error. Try to reploy and see.
              )
              return {
                statusCode: 200,
                body: token
              }
            }
          }

          return {
            statusCode: 401,
            body: "Unauthorized"
          }
      } catch(err) {
          return {
              statusCode: 400,
              body: `Error message: ${err.message} `
          };   
      }
  
  };