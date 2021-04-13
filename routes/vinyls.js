var express = require('express');
var router = express.Router();

let vinyls = [
  {id: 1, vinylName: "The raging River", artist: "Cult of Luna", songs: 5, rented: false},
  {id: 2, vinylName: "Heaven and Hell", artist: "Vangelis", songs: 10, rented: false},
  {id:3, vinylName: "Pornography", artist: "The Cure", songs: 8, rented: true},
  {id:4, vinylName: "Nausikaa", artist: "Hymnambulae", songs: 5, rented: true} 
]

let htmlHead = `<title>All the Vinyl</title><link href="/stylesheets/style.css" type="text/css" rel="stylesheet" />`

/* GET users listing. */
router.get('/', function(req, res, next) {

  let printVinyls = htmlHead + `<div><h2>Mina vinyler</h2>`
  
  for (vinyl in vinyls) {
    printVinyls += `<div><a href="/vinyls/vinyl/${vinyls[vinyl].vinylName}">${vinyls[vinyl].vinylName}</a> ${ (vinyls[vinyl].rented) ? "Utlånad" : "Hemma"} </div>`
  }

  printVinyls += `<div><a href="/vinyls/add">Lägg till ny</a></div>`

 
  res.send(printVinyls);
});

router.get("/vinyl/:id", function(req, res) {

  let showRecordName = req.params.id;

  let showRecord = vinyls.find( ({ vinylName }) => vinylName == showRecordName )

    showRecord.rented = true;

    res.send(htmlHead + "<h2>" + showRecord.vinylName + " av " + showRecord.artist + "</h2>"); 

});




router.get("/add", function(req, res) {
  let addForm = `<title>Vinyl collection</title>
                <link href="/stylesheets/style.css" type="text/css" rel="stylesheet" />
                <div><h2>Lägg till en ny skiva</h2>
                <form action="/vinyls/add" method="post">
                <div><input type="text" name="vinylName"> Namn på skiva</div>
                <div><input type="text" name="artist"> Artist</div>
                <div><input type="text" name="songs"> Antal låtar</div>
                <div><button type="submit">Spara</button></div></form></div>
                `

                res.send(addForm);
})

router.post("/add", function(req, res) {

  console.log(req.body);

  let newVinyl = {vinylName: req.body.vinylName, artist: req.body.artist, songs: req.body.songs, rented: true}

  vinyls.push(newVinyl);

  res.redirect("/vinyls")

})



module.exports = router;
