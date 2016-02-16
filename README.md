# CouchDB Map/Reduce Test GUI

Browser-based tool for testing CouchDB-style map/reduce functions with dummy data. The goal is to provide a quick way to iterate and test map/reduce functions. This does not connect to CouchDB; It uses dummy data that you provide. It will not work with Mongo style reduce functions (beacuse of different function signature) but testing map functions for Mongo is probably OK. 

Built with React for no real reason.

## Installation
```
git clone https://github.com/ExoticObjects/couchdb-map-reduce-test-gui.git
cd couchdb-map-reduce-test-gui
npm install
```

## Running
```
npm start
```
Browse to http://localhost:8080