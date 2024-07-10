# DevBook

 Envision a unified platform that brings together developers from across various disciplines, streamlining the diverse experiences currently scattered across multiple applications like GitHub, Medium, LinkedIn groups, and Facebook groups. Our goal is to create a singular hub where developers can seamlessly advance their careers, enhance learning opportunities, and collaborate on transformative projects. By consolidating these resources into one comprehensive application, we aim to foster innovation not just for ourselves but for the broader community, catalyzing a future where collective creativity drives meaningful change.

With DevBook, you can:

- Post and Share Insights: Whether it's a thought-provoking idea or a technical tutorial, your voice matters. Share your knowledge and learn from others in our vibrant community.
- Showcase Projects: From coding challenges to full-scale applications, highlight your creations with detailed project pages. Get feedback, iterate, and watch your projects evolve.
- Favorite Projects: Discover inspiring projects from fellow developers and engineers. Bookmark your favorites and curate your personalized "Favorite Page" for quick access and inspiration.
- Profile Customization: Your profile is your digital identity. Update your skills, showcase your achievements, and connect with like-minded professionals. It's your space to shine.


https://medium.com/@fdejesus95/mastering-full-stack-development-tips-and-insights-c82f703cc025

## Setup

### `server/`

The `server/` directory contains all of your backend code.

`app.py` is your Flask application. You'll want to use Flask to build a simple
API backend like we have in previous modules. You should use Flask-RESTful for
your routes. You should be familiar with `models.py` and `seed.py` by now, but
remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and
SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

The project contains a default `Pipfile` with some basic dependencies. You may
adapt the `Pipfile` if there are additional dependencies you want to add for
your project.

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

Check that your server serves the default route `http://localhost:5555`. You
should see a web page with the heading "Project Server".

### `client/`

The `client/` directory contains all of your frontend code. The file
`package.json` has been configured with common React application dependencies,
include `react-router-dom`. The file also sets the `proxy` field to forward
requests to `"http://localhost:5555". Feel free to change this to another port-
just remember to configure your Flask app to use another port as well!

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost:3000`. You should see a web page with the heading "Project
Client".

---
