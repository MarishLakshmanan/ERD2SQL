# How to Use the ERD Interface

The ERD Interface is very simple and follows the notation taught in the **CS542** class at **WPI**. You can create **Attributes**, **Entities**, and **Relations** using the buttons, and connect them by **dragging edges (handles)** between the nodes.

You can delete a connection or a node by selecting it and simply pressing **Backspace**.

---

### What Happens When You Hit "Generate"?

When you click the **Generate** button, after performing basic validation, it returns the class objects of **Entities** and **Relations** as two separate objects.

#### 🔢 Entity Object Structure

Each **Entity** object contains:
- `id`
- `name`
- `attr`: an array of attributes
- `primary_key`: the primary key attribute ID
- `relations`: an array of relation references
- `type`: the type of entity (e.g., Normal, Weak)

#### 🔢 Relation Object Structure

Each **Relation** object contains:
- `id`
- `name`
- `attr`: an array of attributes
- `relation`: an array describing the constraint types (e.g., Many-to-Many, One-to-Many)
- `type`: the type of the relation (e.g., Normal, Weak)

---

### How to Load Saved ERDs

To load a saved ERD, pass the `id`, `savedNodes`, and `savedEdges` as props to the `ERD` component:

```jsx
<ERD id={"id"} savedNodes={[]} savedEdges={[]} />
```

To start fresh with a new diagram:

```jsx
<ERD />
```

Depending on whether you pass an ID or not, the component will automatically **create** or **update** the diagram.

---

### Raw Nodes and Edges Format for Saving

If you load the homepage right now, it displays a mock diagram. The data for that diagram is in the `mock.js` file.

⚠️ **Important:** When saving or loading, your `nodes` and `edges` must follow this format — not the custom class structure we created for logic.

---

#### 🗭 Node Format

```json
nodes: [
  {
    "id": "233f3d48-9198-41ce-9f42-4deb818043d3",
    "data": {
      "label": "department",
      "type": "Weak"
    },
    "type": "entity",
    "position": {
      "x": 389.97828486958934,
      "y": 247.4318702193848
    },
    "measured": {
      "width": 216,
      "height": 60
    },
    "selected": false,
    "dragging": false
  }
]
```

---

#### 🗾 Edge Format

```json
edges: [
  {
    "id": "233f3d48-9198-41ce-9f42-4deb818043d3-517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
    "source": "233f3d48-9198-41ce-9f42-4deb818043d3",
    "target": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
    "data": {
      "source": "entity",
      "target": "relation",
      "relation": "Many-to-Many"
    },
    "type": "customEdge",
    "style": {
      "strokeWidth": 2
    },
    "markerEnd": {
      "type": "arrowclosed"
    },
    "sourceHandle": "e-b",
    "targetHandle": "r-c",
    "selected": false
  }
]
```



# ERD-to-SQL Converter Backend
This is a simple, one-page app that integrates a React frontend with a Python backend using Flask for middleware, Oracle SQL for ERD functionality, and SQLLite for authentication.
For the purposes of this application, only the contents of `dbms-python` are relevant - the `dbms` folder should be regarded only as a reference point for our legacy backend structure.

Follow the steps below to run your own instance of the app locally.

1. Clone/fork/download the repository and navigate to the root directory.
2. Navigate to `dbms-python` in your CLI and run `chmod +x run.sh`
3. Enter `./run.sh` into your command line and navigate to the indicated URL to run the application.

## Summary of Existing Endpoints
### Authentication Not Required
#### @app.route('/')
Landing page - defaults to login if unauthenticated, dashboard if a valid session is detected.
#### @app.route('/login', methods=['GET', 'POST'])
Request data from login form routed through this endpoint. Flask-login used to screen credentials against locally stored SQLLite database.
#### @app.route('/create-user')
Skeleton endpoint for user registration. With some modification, and association to an appropriate form, can be tailored to take in necessary data.

### Authentication Required
#### @app.route('/logout')
Forcibly expires the current session, returning end user to unauthenticated view.
#### @app.route('/dashboard')
Serves auth-gated functionality. Only accessible when logged in with valid credentials. Data retrieval and saving is possible through here.
#### @app.route('/api/data')
Fetches data. Skeleton implementation done, and Python code for this can be duplicated with query modified to fetch anything pre-existing from Oracle SQL.
#### @app.route('/api/create-diagram', methods=['POST'])
Posts data to existing database. Skeleton implementation done, and Python code for this can be duplicated with query modified to insert anything into pre-existing tables from Oracle SQL.
