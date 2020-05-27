// Usa o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const bd = require('./bd')

//Criar coleções para renderizar no front

const ideias = [
    // {
    //     img: "https://image.flaticon.com/icons/svg/2972/2972230.svg",
    //     title: "Cursos de Programação",
    //     categoria: "Cursos",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // },
    // {
    //     img: "https://image.flaticon.com/icons/svg/2436/2436645.svg",
    //     title: "Leitura",
    //     categoria: "Lazer",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // },
    // {
    //     img: "https://image.flaticon.com/icons/svg/1850/1850594.svg",
    //     title: "Exercício",
    //     categoria: "Bem-estar",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // },
    // {
    //     img: "https://image.flaticon.com/icons/svg/2924/2924667.svg",
    //     title: "Web-Conference",
    //     categoria: "Tecnologia",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // },
    // {
    //     img: "https://image.flaticon.com/icons/svg/501/501417.svg",
    //     title: "Tocar Guitarra",
    //     categoria: "Hobby",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // },
    // {
    //     img: "https://image.flaticon.com/icons/svg/501/501440.svg",
    //     title: "Observar as Estrelas",
    //     categoria: "Hobby",
    //     descricao: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eaque dolore odit vero magnam facere optio neque"
    // }
]

//Configurar arquivos estáticos
server.use(express.static("estatico"))

//Habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

//Configuração do Nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true

})

//Criei uma rota
//Capturar o pedido do cliente para responder
server.get("/", function(req, res){

    bd.all(`
        SELECT * FROM ideias
        
    `, function(err, rows){
        if (err) {
            console.log(err)
            return res.send('Erro de conexão: contate o admin')
        }

        const reversedIdeas = [...rows].reverse()

        let myIdeas = []
            for(ideia of reversedIdeas){
             if(myIdeas.length < 3){
                myIdeas.push(ideia)
            }
            
        }
    
        return res.render('index.html', {ideias:myIdeas})
    })
    
    })

server.get("/ideias", function(req, res){

    bd.all(`
        SELECT * FROM ideias
        
    `, function(err, rows){
        if (err) return console.log(err)

        reversedIdeas = [...rows]
        
        const revertido = reversedIdeas.reverse()

        return res.render("ideias.html", {revertido})
    })



})

server.post("/", function(req, res){
             //Inserir dados na tabela
        const query =
            `
            INSERT INTO ideias(
                img,
                title,
                categoria,
                descricao,
                link
            ) VALUES (?,?,?,?,?);
          `
        const values =  [
           req.body.img,
           req.body.title,
           req.body.categoria,
           req.body.descricao,
           req.body.link

        ]
          bd.run(query, values, function(err){
            if (err) {
                console.log(err)
                return res.send('Erro de conexão: contate o admin')
            }

            return res.redirect('/ideias')
          })
})

//Ligar o servidor na porta escolhida, no caso aqui foi a 3000
server.listen(3000)