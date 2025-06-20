const {Pool}=require("pg") //imported Pool from lib 'pg'
const pool=new Pool({
    user:'',
    password:"",
    host:'',
    port:,
    database:''
})

module.exports=pool;
