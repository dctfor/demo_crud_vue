# Frontend CRUD in VUE

> A Vue.js project intended for entering www.harbourshare.com, using bootstrap 4, a little of JQuery for the fade animation in the loading overlay and basically connected with a flask project that stores data in firebase, both projects are connected to google build with the GitHub plugin, thus google run for quick deployment. And both projects can be public accessed thru public links.

This particular project was configured to have a sub domain of my own.
This a simple example of my current skills doing a simple crud in VUE, may be not all is directly used in VUE and there are many things that I might need to learn in order to make it solid, cleaner, better and faster code... yet can't spend too much time in this kind of things since I have an active job 

Sorry for any mess in the code, hope you like this!

## Related repo
https://github.com/dctfor/demo_crud

## ToDo

* Add internal process when creating a contact, add the card dynamically to save 1 Api Call instead of reloading the contact page
* Add webWorkers for optimizing the UI Loading
* Add a dynamic search bar/tool & proper filtering
* Add better cache process
* Add "Download Profile in PDF" button + functionality

## Common Build Setup / Run Steps
This project was created using webpack and Vue2+Bootstrap+Jquery+JavaScript, this might run only in the login, yet this needs the backend server up & running for properly work, and thus the backend server needs a firebase service to properly serve the APIs related to the crud 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

Notice: For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
