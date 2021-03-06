var Bot = require('bot');
var PF = require('pathfinding');
var bot = new Bot('gv4hl6ph', 'training', 'http://vindinium.org'); Put your bot's code here and change training to Arena when you want to fight others.
// var bot = new Bot('zza2m76h', 'arena', 'http://52.39.33.197:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////

        /*                                      *
         * This Code is global data!            *
         *                                      */

        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir;
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];

        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);


        /*                                      *
         * This Code Decides WHAT to do         *
         *        if (health > 15) go to tavern */
         
        // this code makes the bot think "is my health below 20? If so, I need to get more health."//
        var task;
        if(bot.yourBot.life < 20){
            task = "getHealth";
        }
        //This makes the bot ask "Is my health greater than 60? If so, I should attack."//
        else if(bot.yourBot.life > 60){
            task = "attack"
        }
        //This final piece simply makes the bot go to freemines is the two previous statements are not true.//
        else{
            task = "freemines";            
        }
        

        /*                                      *
         * This Code Determines HOW to do it    *
         *                                      */

        // This Code find the nearest freemine and sets myDir toward that direction //
        if(task === "freemines") {
            var closestMine = bot.freeMines[0];
            for(i = 0; i < bot.freeMines.length; i++) {
                if(bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                    closestMine = bot.freeMines[i];
                }
            }
            console.log("Claiming a Free Mine!");
            myDir = bot.findPath(myPos, closestMine);
        }


        // This Code find the nearest TAVERN and sets myDir toward that direction //
        if(task === "getHealth") {
            var closestTavern = bot.taverns[0];
            for(i = 0; i < bot.taverns.length; i++) {
                if(bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                    closestTavern = bot.taverns[i];
                }
            }
            console.log("Claiming a Tavern!");
            myDir = bot.findPath(myPos, closestTavern);
        }


        // This Code find the nearest ENEMY and sets myDir toward that direction to attack//
        if(task === "attack") {
            var closestEnemy = enemyBots[0];
            for(i = 0; i < enemyBots.length; i++) {
                if(bot.findDistance(myPos, closestEnemy) > bot.findDistance(myPos, enemyBots[i])) {
                    closestEnemy = enemyBots[i];
                }
            }
            console.log("Attacking an Enemy!");
            myDir = bot.findPath(myPos, closestEnemy);
        }


        /*                                                                                                                              *
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */
        if(myDir === "none") {
            console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            bot.goDir = dirs[rand];
        } else {
            bot.goDir = myDir;
        }



        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();
