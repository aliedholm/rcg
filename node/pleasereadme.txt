//API endpoints

//Logging Information

- 132.239.205.188:8080/api/postReading/:database-table
  //query strings 
    datetime: datetime obj (yyyy-mm-dd hh:mm:ss)
    reading: varchar(10)

- 132.239.205.288/api/postLog/:database-table
  //query strings
    datetime: datetime obj (yyyy-mm-dd hh:mm:ss)
    type: varchar(10)
    message: varchar(30)
 

//Retrieving Information 

- 132.239.205.288/api/tables/:database

- 132.239.205.288/api/retrieveTable/:database-table

- 132.239.205.288/api/retrieveTableDates/:database-table
  //query strings
    start: yyyy-mm-dd
    end: yyyy-mm-dd

- 132.239.205.288/api/retrieveTableIds/:database-table
  //query strings
    start: id number
    end: id number
