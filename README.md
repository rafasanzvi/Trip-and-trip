# Trip-and-trip

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
