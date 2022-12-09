# FIUBER-BackOffice

![licence](https://img.shields.io/github/license/TallerDeProgramacion2-2022-2c-Grupo7/FIUBER-BO-BE)
[![Deploy](https://github.com/TallerDeProgramacion2-2022-2c-Grupo7/FIUBER-BackOffice/actions/workflows/deployment.yml/badge.svg?branch=main)](https://github.com/TallerDeProgramacion2-2022-2c-Grupo7/FIUBER-BackOffice/actions/workflows/deployment.yml)

FIUBER's BackOffice allows administrators to visualize metrics, manage users and update pricing rules.

This application was built using [React](https://reactjs.org/) and the [Material UI](https://mui.com/) component library
and deployed on Kubernetes using [Okteto](https://www.okteto.com/).

## User guide
The user guide can be found [here](https://tallerdeprogramacion2-2022-2c-grupo7.github.io/FIUBER-BackOffice/).

## Local installation & usage
Create the `.env` file in the root folder of the repository with the following content:
```shell
REACT_APP_USERS_URL="Your local FIUBER Users URL"
REACT_APP_TRIPS_URL="Your local FIUBER Trips URL"
REACT_APP_METRICS_URL="Your local FIUBER Metrics URL"
```
Install dependencies: 
```shell
npm install -g serve && npm install
```
Build the app:
```shell
npm run build
```
Start the app:
```
serve -s build
```
