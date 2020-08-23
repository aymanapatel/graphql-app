/*
sudo -i -u postgres
 
postgres@ayman:~$ createuser --interactive --pwprompt
Enter name of role to add: journey
Enter password for new role: root
Enter it again: 
Shall the new role be a superuser? (y/n) y
postgres@ayman:~$ createdb -O journey job_app

*/


const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require("../db");

  
async function insert() {
  
      try {
          await sequelize.authenticate(); // By default , sync.
          
          await sequelize.sync({force: true}); // create tables that does not sync
  
        
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync('password', salt);
          const user = await User.create({

            email: "aym@man.com",
            password: hash
          });

        } catch(err) {
          return {
              statusCode: 400,
              body: `Error message: ${err.message} `
          };   
      }
    }

insert();    

            
