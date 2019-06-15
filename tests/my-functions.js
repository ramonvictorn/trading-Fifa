'use strict';

module.exports = {
  generateRandomData
};


function generateRandomData(PlayerContext, events, done) {
  // generate data with Faker:
  const playerName = "Ralf Fährmann";	
	const futbinId = 3213232;
	const lastPsPrice = 1700;
	const lastXboxPrice=1800;
	const lastOriginPrice =1900;
  // add variables to virtual user's context:

  PlayerContext.vars.playerName = `${playerName + Math.floor(Math.random()*(50000-(-50000)+1)+(-50000))}`;
  PlayerContext.vars.futbinId = `${futbinId + Math.floor(Math.random()*(50000-(-50000)+1)+(-50000))}`;
  PlayerContext.vars.lastPsPrice = `${lastPsPrice + Math.floor(Math.random()*(50000-(-50000)+1)+(-50000))}`;
  PlayerContext.vars.lastXboxPrice = `${lastXboxPrice + Math.floor(Math.random()*(50000-(-50000)+1)+(-50000))}`;
  PlayerContext.vars.lastOriginPrice = `${lastOriginPrice + Math.floor(Math.random()*(50000-(-50000)+1)+(-50000))}`;

  // continue with executing the scenario:
  return done();
}