let sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE medication (
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
            }else{
                // Table just created, creating some rows
                let insert = 'INSERT INTO medication (name, dose, description, expirationDate, pieces) VALUES (?,?,?,?,?)'
                db.run(insert, ["Aspirina","20", "Aspirina, sau acidul acetilsalicilic, este un medicament antiinflamator non-steroidian din familia salicilaților, folosit în general ca un analgezic minor, ca antipiretic, sau ca antiinflamator. În plus, aspirina în doze mici are un efect antiagregant și este folosit pe termen lung ca să diminueze riscul de infarct.","12/02/2025",5])
                db.run(insert, ["Nurofen","400","Nurofen Forte 400 mg drajeuri calmează eficace un spectru larg de dureri acute. Utilizare: 1 drajeu administrat într-o priză unică sau de 3 ori pe zi, la intervale de 4 până la 6 ore. În migrenă, dozajul trebuie să fie: 1 drajeu administrat într-o priză unică, dacă este necesar 1 drajeu la intervale de 4 până la 6 ore.","12/06/2025", 5])
                db.run(insert, ["Amoxicilina","25","Amoxicilina este un antibiotic din clasa beta-lactamelor, aparținând grupului penicilinelor (amino-peniciline) de semi-sinteză cu spectru lărgit. Are efect bactericid, acționând la nivelul peretelui celulei bacteriene prin inhibarea biosintezei substanțelor din structura peretelui.","12/12/2025", 5])
                db.run(insert, ["Strepsils","20", "Strepsils Intensiv contine flurbiprofen care apartine unui grup de substante numite antiinflamatoare nesteroidiene (Ains). Ains ajuta la reducerea inflamatiei, a durerii si febrei. Pastilele Strepsils Intensiv Miere si Lamaie calmeaza durerea si inflamatia gatului ce insotesc raceala, laringita sau amigdalita.","12/01/2025",5])
            }
        });  
    }
});


module.exports = db