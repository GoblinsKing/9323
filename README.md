## COMP9323(19T3)    
### Software as a Service Project 

## Installation Guide
### 1.Install node and npm


If Node and Npm is not installed on your computer, please check this [Website](https://nodejs.org/en/) for Node installation.

### 2.Running the Backend on your Own Machine

You can create virtual env with conda [recommended].
```
    conda create -n COMP9323 python=3.7
    conda activate COMP9323
    cd backend
    pip install -r requirements.txt
    python3 run.py
```
Open your browser and visit: [http://localhost:5000](http://localhost:5000). You will see the backend docs of this project.
When you want to exit the virtual environment.
```
    conda deactivate
```
### 3.Install front end dependencies
On your command console, execute the following command in the folder where the project is located

```
    cd fronted
    npm install
    npm start
```

Open your browser and visit: [http://localhost:3000](http://localhost:3000). You will see the homepage of this project.

### 4.user Data
In ```backend/db/users.csv``` there is a list of all users within the provided database, you can login as any of these users for testing. 
