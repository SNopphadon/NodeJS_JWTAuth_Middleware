const config = {
    user: 'ac_api',
    password: '@cipa2023',
    server: 'ahthkab20vt', // You can use 'localhost\\instance' to connect to named instance
    database: 'AccountAPI',
    options: {
        encrypt: true, // Use encryption for security (if needed)
        trustServerCertificate: true, // Ignore SSL validation
    },
}
module.exports = config