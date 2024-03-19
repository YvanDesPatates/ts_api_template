# Config file

To run the App you need to create a .env file at the root of the project.

Config should follow next example :
```.dotenv
PORT=number
```

# Launch the app with docker compose

Thanks to docker compose you can launch the app directly on the port cinfigured in the .env file with the following command :
```bash
sudo docker-compose up
```

# tests

Tests will use their own configuration file, you need to create a **.env.test** file at the root of the project.
Test config should follow the example of the [.env.example](../.env.exemple) file.

To run the tests you can use the following command :
```bash
npm run test
```

It will run tests and generate a coverage report in the coverage folder.

Tests are made with jest and supertest to easily tests the API endpoints and mock DAOs. Mocking DAOs allow us to unit test logic functions and to not push on a database if you have not set up tests database yet. (reminder : you cans use tests database thanks to the specific .env.test file)
