# Blanc Canvas - Lighthouse Labs Finals Project

![Blanc Canvas screenshot](vite-express-project/docs/BlancCanvas_landing_page.png)
![Blanc Canvas screenshot](vite-express-project/docs/listings.png)


This project was created as a graduation project for [Lighthouse Labs](https://github.com/lighthouse-labs) Full stack Web Development Bootcamp

Blanc Canvas - BC is  focused on an initial release designed to address the need for a platform to connect artists and those seeking the services of artists. This document outlines the key features, development strategy, and expected outcomes of the Minimum Viable Product.

## Product Overview

### Problem Statement
We started our project to help graffiti artists find legal ways to pursue their art form. The best way to do this was to connect these artists with property owners willing to let them work on their properties. This leads us to realize that the initial introduction between a buyer and artists within the community needs a centralized platform. Currently, artists looking for spaces need to find leads by visiting properties and hopefully connect with an owner, but that may not always be possible. Owners looking to hire artists currently need to rely on word of mouth or use search engines which may only list well-established artists, or artists who can have an established web presence. 

### Solution
BC provides a portfolio-based social marketplace connecting artists and those seeking art-related services and products. This allows our platform to create an online community of artists and clients that connect people without the need to spend much effort or money. Our project helps establish a centralized location for artists to share their works through an online portfolio and helps clients and artists verify the credibility of the person that they're working with.

## Features
1. User Profile Pages: Provide a means for artists to develop an online portfolio that they can direct clients to, but can be searched by clients based on location.
   - Artist Type

    - Visual Artists: painters, graffiti artists, sculptors, etc.

    - Performing Artists: musicians, dancers, etc.

    - Locations available to work

2. Gigs/Jobs: A listing which can be created by a client looking for an artist, or an artist providing a service

## Contributors
- [Amandip(Sunny) Hundal](https://github.com/Sunnyhundal)
- [Haijoon Kim](https://github.com/haijoon2)
- [Rina Inada](https://github.com/dodrin)

## Tech Stack
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,express,nodejs,supabase,tailwind,vite" />
  </a>

## Setup

Install dependencies with `npm install`

### Frontend
Open a terminal window to run tailwind css watcher

```
cd vite-express-project
npx tailwindcss -i ./src/client/index.css -o ./dist/output.css --watch
```

### Backend
Open another terminal window to start the server
```
cd vite-express-project
npm run dev
```

### Database

Our application uses [Supabase](https://supabase.io/) as the database. Supabase provides a powerful and scalable solution for managing data.

For the setup please refer to [the database documentation](/vite-express-project/docs/database.md).

