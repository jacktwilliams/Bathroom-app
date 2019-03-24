* Running a server setup locally
  * Database
    1. Install mysql 8.0. Opt to use the legacy authentication method
    2. Run scripts from DB directory.
      1. create_db.sql
      2. add_test_data.sql
      3. Test with queries
  * Server
    1. Have npm installed.
    2. Install server packages
    ```bash
    $ cd Server
    $ npm install
    ``
    3. Add your password into the password.js file. This file is no longer tracked by git
    4. Run server.
       ```bash
       $ node start
       ``
    5. Test with browser. localhost:3000/