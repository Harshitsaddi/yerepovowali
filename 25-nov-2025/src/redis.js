const redis = require("redis");

let redisClient;

(async () => {
  try {
    redisClient = redis.createClient();

    redisClient.on("error", (err) => {
      console.log("❌ Redis Error:", err.message);
    });

    await redisClient.connect();
    console.log("📌 Redis Connected Successfully");
  } catch (err) {
    console.log("⚠️ Redis NOT available, continuing without cache...");
  }
})();

module.exports = redisClient;
