const sql = require('mssql')
const connectDB = async()=>{
    try{
        await sql.connect('Server=ahthkab20vt,1433;Database=AccountAPI;User Id=ac_api;Password=@cipa2023;Encrypt=true;trustServerCertificate=true')
        console.log('DB connected')
    }
    catch(e){
        console.log(e)
    }
}
module.exports = connectDB