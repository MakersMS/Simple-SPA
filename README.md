# Simple-SPA
It's a simple example of SPA using local storage.

generate.html - this file is using for generating car objects and saving it in local storage. Our SPA using local storage like a Data Base.

index.html - it's a propably our SPA. (For looking pages use such URL [example: pathToHTMLFile#Search?search=BMW]);



Pages:

/# - our main page with hyperlinks on 25 top popular cars. Also contains search field.

/#Car/[id] - page with car information (example /#/Car/2). If there is no car with such id, you will see '404' page.

/#Search - page with results of searching. Searching is made by finding occurrences in car properties. If there any property contain such search string, it will apear in our list. Also it have filters on special properties. 
(url arguments: search, mark, model, yearFrom, yearTo, costFrom, costTo, transmission, fuel).

/#Admin - admin page, that contains a table with all cars information. You can add, edit and delete cars from localeStorage using this page.
(url arguments: search)

/#Add - page for adding car. It has all necessary fields for adding information about car.

/#Edit/[id] - page for editing car. The same as Add page, only it filled with current car information, when you load this page.
