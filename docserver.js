
const { dir } = require('console');
const express = require('express');
const path =  require('path');
const port = 8000;
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { Database } = require('sqlite3');
const e = require('express');


const app = express();

app.use(express.static(__dirname));


// Confirm connection with SQLite3 database
const db = new sqlite3.Database('./dentalhaven.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});



app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log("server is running on port 8000");
}
);

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/doc.html'));
});


db.all(`SELECT COUNT(*)  as 'count' FROM dentist`,(err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('number in database table:', rows[0].count);
    }
  }); 

 




// app.post('/submit-booking', (req, res) => {
   
//     try{
//         const {name, age, phone, service, date, time, comments} = req.body;
//         db.serialize(function() {


app.post('/submit-booking', (req, res) => {
    try {
        const { name, age, phone, service, date, time, comments } = req.body;
        db.run(`INSERT INTO dentist(name, age, phone, service, date, time, comments) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, age, phone, service, date, time, comments], function(err) {
            if (err) {
                console.log(err.message);
                return res.status(500).send('Error inserting data into database');
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            //res.send('Congrats your booking has been made, see you soon!');
            
           //alert('Congrats your booking has been made, see you soon!',  window.location.reload());

           
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});
//     catch (error) {
//         console.log(error);
//         res.send('bleh lame aint gonna work');
//     }
//     db.close();
//  });














// app.post('/form', (req, res) => {
//     const { name, age, phone, service, date, time, comments } = req.body;
//     db.run(`INSERT INTO dentist(name, age, phone, service, date, time, comments) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, age, phone, service, date, time, comments], function(err) {
//         if (err) {
//             console.log(err.message);
//             return res.status(500).send('Error inserting data into database');
//         }
//         console.log(`A row has been inserted`);
//         res.send('Data has been added to the database');
//     });
// });
    
    //db.run(`INSERT INTO dentist(name, age, phone, service, date, time, comments) VALUES ('${name}', '${age}', '${phone}', '${service}', '${date}', '${time}', '${comments}')`, function(err) {
            
            //db.post(newUser,[name, age, phone, service, date, time, comments], (err,result) => { 


// app.post('/post', async (req, res) => {
//     let data = req.body;
//     console.log(data);
//     const {d.date, regtime, name, age, phone, service, comments} = data;
//     const newUser = db.run(`INSERT INTO dentist(name, age, phone, service, date, time, comments) VALUES (?, ?, ?, ?, ?, ?, ?)`, [data.name, data.age, data.phone, data.service, data.date, data.time, data.comments], async function(err) {
//         if (err) {
//             return console.log(err.message);
//             console.log(`I am not here :( `);
//         }
//         console.log(`A row has been inserted `);
//         await newUser.save();
//         console.log(newUser);
//         res.send('Data has been added to the database');
//     });
//     res.redirect('/');
// });

