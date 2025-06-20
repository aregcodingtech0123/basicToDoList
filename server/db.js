const {Pool}=require("pg") //imported Pool from lib 'pg'
const pool=new Pool({
    user:'postgres',
    password:"111",
    host:'localhost',
    port:5432,
    database:'perntodo'
})

module.exports=pool;