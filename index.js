const server = require('./api/server');

const PORT = process.env.PORT || 5130;

server.listen(PORT, () => {
  console.log(`\n=== LISTENING TO PORT ${PORT} ===\n`)
});