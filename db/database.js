let sqlite3 = require("sqlite3").verbose();
// let md5 = require('md5')

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE medication (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            dose text, 
            description text, 
            expirationDate text,
            pieces num
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          let insert =
            "INSERT INTO medication (name, dose, description, expirationDate, pieces) VALUES (?,?,?,?,?)";
          db.run(insert, [
            "Aspirina",
            "20",
            "Aspirina, sau acidul acetilsalicilic, este un medicament antiinflamator non-steroidian din familia salicilaților, folosit în general ca un analgezic minor, ca antipiretic, sau ca antiinflamator. În plus, aspirina în doze mici are un efect antiagregant și este folosit pe termen lung ca să diminueze riscul de infarct.",
            "12/02/2025",
            5,
          ]);
          db.run(insert, [
            "Nurofen",
            "400",
            "Nurofen Forte 400 mg drajeuri calmează eficace un spectru larg de dureri acute. Utilizare: 1 drajeu administrat într-o priză unică sau de 3 ori pe zi, la intervale de 4 până la 6 ore. În migrenă, dozajul trebuie să fie: 1 drajeu administrat într-o priză unică, dacă este necesar 1 drajeu la intervale de 4 până la 6 ore.",
            "12/06/2025",
            5,
          ]);
          db.run(insert, [
            "Amoxicilina",
            "25",
            "Amoxicilina este un antibiotic din clasa beta-lactamelor, aparținând grupului penicilinelor (amino-peniciline) de semi-sinteză cu spectru lărgit. Are efect bactericid, acționând la nivelul peretelui celulei bacteriene prin inhibarea biosintezei substanțelor din structura peretelui.",
            "12/12/2025",
            5,
          ]);
          db.run(insert, [
            "Strepsils",
            "20",
            "Strepsils Intensiv contine flurbiprofen care apartine unui grup de substante numite antiinflamatoare nesteroidiene (Ains). Ains ajuta la reducerea inflamatiei, a durerii si febrei. Pastilele Strepsils Intensiv Miere si Lamaie calmeaza durerea si inflamatia gatului ce insotesc raceala, laringita sau amigdalita.",
            "12/01/2025",
            5,
          ]);
        }
      }
    );
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text, 
            password text, 
            address text, 
            cnp text,
            city text,
            phone text
            )`
    );
    db.run(
      `CREATE TABLE patient (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text, 
            cnp text,
            city text,
            phone text
            )`,
        (err) => {
              if (err) {
                // Table already created
              } else {
                // Table just created, creating some rows
                let insert =
                  "INSERT INTO patient (name, address, cnp, city, phone) VALUES (?,?,?,?,?)";
                db.run(insert, [
                  "Andrei",
                  "Strada Eminescu",
                  "4223344244421",
                  "Ploiesti",
                  "0723456345",
                ]);
                db.run(insert, [
                  "Andreea",
                  "Strada Zablovski",
                  "5002345683043",
                  "Ploiesti",
                  "0798234123",
                ]);
                db.run(insert, [
                  "Filip",
                  "Strada Alexandru Ioan Cuza",
                  "5000233544234",
                  "Breaza",
                  "0755445554",
                ]);
                db.run(insert, [
                  "Vlad",
                  "Strada Independentei",
                  "1000323332890",
                  "Campina",
                  "0723332134",
                ]);
              }
            }
    );
  }
});

module.exports = db;
