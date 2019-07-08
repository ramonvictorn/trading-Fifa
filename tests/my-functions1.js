'use strict';

module.exports = {
  generateRandomData
};


function generateRandomData(PlayerContext, events, done) {
  // generate data with Faker:
  const playerName = "Ronaldo ";	
	const futbinId = 0;
	const lastPsPrice = 1000;
	const lastXboxPrice=1000;
	const lastOriginPrice =1000;
  // add variables to virtual user's context:

  PlayerContext.vars.playerName = `${playerName + Math.floor(Math.random()*(50000-(1000)+1)+(-1000))}`;
  PlayerContext.vars.futbinId = `${futbinId + Math.floor(Math.random()*(100-(3)+1)+(3))}`;
  PlayerContext.vars.lastPsPrice = `${lastPsPrice + Math.floor(Math.random()*(50000-(1000)+1)+(1000))}`;
  PlayerContext.vars.lastXboxPrice = `${lastXboxPrice + Math.floor(Math.random()*(50000-(1000)+1)+(1000))}`;
  PlayerContext.vars.lastOriginPrice = `${lastOriginPrice + Math.floor(Math.random()*(50000-(1000)+1)+(1000))}`;

  // continue with executing the scenario:
  return done();
}