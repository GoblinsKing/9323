## COMP9323(19T3)    
### Software as a Service Project 

### Installation Guide
#### 1.Install node and npm


If Node and Npm is not installed on your computer, please check this [Website](https://nodejs.org/en/) for Node installation.

#### 2.Running the Backend on your Own Machine

You can create virtual env with conda [recommended].<br>
If conda is not installed on your computer, please check this [Website](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) for conda installation.
```bash
    conda create -n COMP9323 python=3.6
    # create a virtual environment
    conda activate COMP9323
    #activate virtual environment
    cd backend
    pip install -r requirements.txt
    #installing from a package index using a requirement specifier.
    python3 run.py
```
Open your browser and visit: [http://localhost:5000](http://localhost:5000). You will see the backend docs of this project.
When you want to exit the virtual environment.
```bash
    conda deactivate
```
#### 3.Install front end dependencies
On your command console, execute the following command in the folder where the project is located

```bash

    cd fronted 

    npm install 
    #This command installs a package, and any packages that it depends on.
    npm start
    # Startup project
```

Open your browser and visit: [http://localhost:3000](http://localhost:3000). You will see the homepage of this project.
```bash
 Quick start: use username 'admin' and password 'admin'
```
#### 4.user Data
In ```backend/db/users.csv``` there is a list of all users within the provided database, you can login as any of these users for testing. 

To make sure everything is working correctly we strongly suggest you read the instructions in both backend and frontend,and try to start both servers (frontend and backend).

### Source code navigation
You can view **frontend** source code in and editor like Sublime or VSCode.
```bash
# code folder
frontend:
   src:               # The main code folder
    > components      # Header and Footer component
    > pages           # All content pages
    > statics         # All pcitures
    > store           # Redux data warehouse
    - App.js          # Routing settings for website
    - backend_url.js  # Global backend url
    - helpers.js      # Some function sets that need to be used multiple times
    - index.js        # The main entrypoint for this website
    - style.css       # Set global style for HTML labels
```
You can view **backend** source code in and editor like Sublime or VSCode.
```bash
backend:
  >apis               # All api code
  >db                 # Initialization data
  >util               # API models and help functions
  - requirement.txt   # Relevant Python packages
  - run.py            # The entrypoint for backend sever

```
