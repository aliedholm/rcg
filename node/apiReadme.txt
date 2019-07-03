//API endpoints

- 132.239.205.188:8080/api/postReading
  //query strings 
    datetime: datetime obj (yyyy-mm-dd hh:mm:ss)
    reading: varchar(10)
    table: name of table to insert data into, will create if it does not already exist

- 132.239.205.288/api/postLog
  //query strings
    datetime: datetime obj (yyyy-mm-dd hh:mm:ss)
    type: varchar(10)
    message: varchar(30)
    table: name of table to insert data into, will create if it does not already exist
    
