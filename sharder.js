console.log("Sharder Ready!")
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(`${__dirname}/quote.js`, { totalShards: 2 });

manager.spawn();
manager.on('launch', shard => console.log(`Successfully launched shard ${shard.id}`));