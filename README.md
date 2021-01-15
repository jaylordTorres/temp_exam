# Code Challenge - ITCrowd

![ITCrowd](itcrowd.png)

---

# Solutions and Caviets by jaylord
  - restarting backend will cause thumbs regeneration and new ids from json
  - photo is random & automatically included on new car


## Garage APP

![Screenshots](screenshots.png)

This repo is a working project that lists cars based on a local API response. It contains both the backend and the frontend app, and it aims at testing candidates' abilities to solve real-world problems, without demanding too much time setting up everything.

## Challenge ideas

### Homework

These tasks are recommended to be completed before the technical interview, where we will hold a pair-programming session with some extra quick tasks.

- [ ] Implement a relational DataBase (use SQLite for simplicity), with two entities, one for Makers and another for Cars. Use the same fields as provided by `cars.json` file. Each Maker can have several Cars.
  * solution
  - see service/car.service.ts
  - populated db using json as data
  - remake id because on json ids was repeated

- [ ] Consider implementing a resizing and cache system for served images. What approach would you take? What libraries or services? There's no need to implement it fully, but an example or a simple implementation will be appreciated.
  * solution
  - implemented image thumbler
  - car response will include 3 diff sizes of image url 
  - on ui use FlatList instead of Scrollist for displaying list items
  - display small size image for listing
  - display full size on view details
  - maximize render cache (useMemo, memo, useCallback)

- [ ] Implement a 'Detail' screen on the frontend app, following the same design principles and using the same information already provided.
  * solution
  - created CRUD for car
  - had selection for maker 
  
