<div id="title" align="center">
<h1>Trip and Trip<h1>
</div>  

 <br>
  
<!--HEADER-->
<div id="header" align="center">
  <img src="https://media.giphy.com/media/txCo7WXCwZpmM/giphy-downsized-large.gif" width="350" />
</div>
<br>

<!--DESCRIPTION-->
<p>
This project was done in just 1 week as part of our web development Bootcamp assignments at Ironhack. Requirements: create an app just using JavaScript, HTML, CSS, Handlebars, NodeJS, Express, MongoDB an homemade internal API Rest and an external API using Google Maps.
  
The project is based on an encyclopaedia of plants whose characteristics are being researched for medicinal use. The user can access the specific plants and see their characteristics, as well as access a list of events in different parts of the world and register and see their location via Google Maps.  
</p>
  
<!--MAIN FEATURES-->  
  <h3>Main Features</h3>
  
- Role play where we have admin, staff and users with different privileges.
- Registration and authentication system
- Protected routes
- Database of users, events and plants in MongoDB.  
- Plants gallery, events and users list
- CRUD system
- Rendering from back-end  

---

<!--LINK-->
<div id="link" align="center">
<img src="https://i.postimg.cc/cJfn2PQn/Portada-Trip-and-trip.jpg" width="400" height="210"/></a>
</div>

<br>

<h2 align="center">:mushroom: Want to take a look? <a href="https://trip-and-trip.herokuapp.com/plants">Click here</a> :mushroom: </h2>
  
  
 <h3>App routes</h3>

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/`             	| Index page          	| |
| GET         	| `/plants` 	| displays plant list 	| |
| GET         	| `/plants/create` 	| renders plant creation form 	| |
| POST         	| `/plants/create` 	| Creates plant 	| |
| GET         	| `/plants/:id` 	| Shows plant details	| |
| GET         	| `/plants/:id/edit` 	| renders edit form 	| |
| POST         	| `/plants/:id/edit` 	|edits plant 	| |
| GET         	| `/api/plants` 	| Plants API 	|  ✅|
| GET         	| `/map` 	| Google Maps with plant area markers 	| |
| GET         	| `/register` 	| renders register form 	| |
| POST         	| `/register` 	| registers user 	| |
| GET         	| `/login` 	|renders login form 	| |
| GET         	| `/login` 	|checks credentials	| |
| POST        	| `/logout` 	|destroys session	| |
| GET         	| `/events` 	| Displays event list 	| |
| GET         	| `/events/create` 	| renders event form 	| |
| POST         	| `/events/create` 	| creates event 	| |
| GET         	| `/events/:id` 	| displays event details 	| |
| GET         	| `/events/:id/edit` 	| renders event edit form 	| |
| POST         	| `/events/:id/edit` 	| Edits evet	| |
| POST         	| `/events/:id/join` 	| Joins event 	| |
| POST         	| `/events/:id/delete` 	| Deletes event 	| |
| GET         	| `/users/list` 	| displays user list 	| |
| GET         	| `/users/:id` 	| displays user details	| |
| POST         	| `/users/:id/edit` 	| renders user edit form 	| |
| POST         	| `/users/:id/edit` 	| edits user 	| |
