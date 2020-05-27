//Chamar o sqlite3

const sqlite3 = require('sqlite3')
const bd = new sqlite3.Database('./pcase.db')

//Chamar funçaão para criar, inserir, selecionar e deletar dados

bd.serialize(function(){

    //Criar a tabela
        bd.run(`
            CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            title TEXT,
            categoria TEXT,
            descricao TEXT,
            link TEXT
        );

        `
        )

    //Inserir dados na tabela
        // const query =
        //     `
        //     INSERT INTO ideias(
        //         img,
        //         title,
        //         categoria,
        //         descricao,
        //         link
        //     ) VALUES (?,?,?,?,?);
        //   `
        // const values =  [
        //     "https://image.flaticon.com/icons/svg/2972/2972230.svg",
        //     "Cursos de Programação",
        //     "Cursos",
        //     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
        // ]
        //   bd.run(query, values, function(err){
        //         if (err) return console.log(err)

        //         console.log(this)
        //   })

    //Consultar dados na tabela

    // bd.all(`
    //     SELECT * FROM ideias
        
    // `, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

    //Deletar dados

    // bd.run(`
    //     DELETE FROM ideias WHERE id= id
    // `, function(err){
    //         if (err) return console.log(err)

    //         console.log('Deletado', this)
    // })










})

module.exports = bd