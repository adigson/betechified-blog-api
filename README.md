# BeTechified Blog API

## Run locally

1. Install Node.js 18 or newer.
2. Set `MONGODB_URI` in `.env` to a valid MongoDB Atlas connection string. Use `.env.example` as a template; do not commit `.env`.
3. Install and start the API:

   ```powershell
   npm install
   npm start
   ```

4. In another terminal, create/update the two sample articles:

   ```powershell
   npm run seed
   ```

The API listens on `http://localhost:5000` by default. Import [the Postman collection](./postman/Blog_API.postman_collection.json) and run it in order; it contains eight requests and assertions.

## Routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/articles` | List articles |
| POST | `/articles` | Create article (Joi validated) |
| GET | `/articles/:id` | Get one article |
| PUT | `/articles/:id` | Replace article fields (Joi validated) |
| DELETE | `/articles/:id` | Delete article |
| GET | `/articles/search?q=keyword` | Search title/content using the MongoDB text index |

Article creation/update requires a title of 3-100 characters and content of at least 10 characters. `author` and `tags` are optional.

## Deploy to Render

1. Push this project to a GitHub repository. Ensure `.env` is not committed.
2. In Render, create a **Blueprint** from the repository; `render.yaml` defines the web service.
3. Set the service's `MONGODB_URI` environment variable to the Atlas connection string. In Atlas, allow the Render service to connect (network access and database user permissions).
4. Deploy, then use the assigned `https://<service>.onrender.com` URL as the Postman `baseUrl` and run the collection again against the live service.
5. To seed live articles, run `npm run seed` in an environment configured with the production `MONGODB_URI`; do not add database credentials to source control.
