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