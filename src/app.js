const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const PublicDirectory = path.join(__dirname,'../public')
const ViewsDirectory = path.join(__dirname,'../templates/views')
const PartialsPath = path.join(__dirname,'../templates/partials')

app.set('views',ViewsDirectory)
app.set('view engine','hbs')
hbs.registerPartials(PartialsPath)

app.use(express.static(PublicDirectory))
 
app.get('',(req,res)=>{
    res.render('index',{
        name:'Dipesh Jindal',
        title:'Weather app'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Dipesh jindal',
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Stay safe',
        title:'Help',
        name:'Dipesh Jindal'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You Must Provide Some Search'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Enter the address'
        })
    }
    geocode(req.query.address,(error,{ latitude , longitude , place}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        else
        {
            forecast(latitude,longitude,(error,data)=>{
                if(error)
                {
                    return res.send({
                        error
                    })
                }
                else
                {
                    return res.send({
                        place:place,
                        weather:data
                    })
                }
            })
        }
        
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:'Help article not found',
        title:"404 Page",
        name:"Dipesh Jindal"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:'My 404 Page',
        title:"404 Page",
        name:"Dipesh"
    })
})

app.listen(port,()=>{
    console.log('server running on port '+port)
})