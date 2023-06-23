# polling

This is an app where we can create the questions and its options.
For this express js and mongo db is used.

1.http://localhost:8000/questions/create :- post request to create the question.

2. http://localhost:8000/questions/:id/options/create :- post request to create the options here :id is id of question. whose options are these.
3. http://localhost:8000/questions/:id :- here id is of question, this is a get request which is used to fetch the questions and option together also a link is dynamically generated, on click of whose we can vote the options.

4.http://localhost:8000/questions/:id/delete  :- here id is of question, this is delete request which is used to delete the question.

5. http://localhost:8000/options/:id/delete :- here id is of option , this is a delete request which is used to delete the options.
