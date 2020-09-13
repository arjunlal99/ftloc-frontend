var express = require('express')
var app = express()
app.use('/public', express.static(__dirname + '/public'))
app.set('view engine', 'pug')
var request = require('request')


app.get('/test', (req,res) => {
    res.send("Hello frontend")
})


app.get('/', (req,res) => {
    getArticles().then((articles) => {
        res.render('template', {obj : articles})
    }).catch((err) => {
        console.log(err)
    })
})
    

/*
app.get('/request', (req,res) => {
    request('http://backend-api:8001/api/articles', {json:true}, (err,res,body) => {
    if (err){
        console.log(err)
    }
    else{
        console.log(body.articles)
        res.render()
    }
})

})

*/
function getArticles(){
    return new Promise((resolve, reject) => {
        request('http://backend:8001/api/articles', {json:true}, (err,res,body) => {
            if(err){
                return reject(err)
            }
            else{
                resolve(body.articles)
            }
        })
    })
}

//listener
var listener = app.listen(8000, () => {
    console.log('Frontend listening at ', listener.address().port)
})