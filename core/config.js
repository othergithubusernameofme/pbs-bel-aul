module.exports= {
    db:{
        dbPath: process.env.MONGO_PATH || "mongodb://127.0.0.1:27017/pbsdb",
        db_options:{
            user:process.env.MONGO_DB_USER_NAME || 'aulia',
            pass:process.env.MONGO_DB_PASS || 'fajriyanti'
        }
    },
    port: 8002,
    token:'467786648:AAHdtagmiUBG6OBf6JWkO4xyhwD04tC8i9Y'
};

