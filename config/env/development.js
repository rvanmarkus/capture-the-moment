'use strict';

module.exports = {
	db: 'mongodb://localhost/ctm-dev',
	app: {
		title: 'eMoment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1712352332319955',
		clientSecret: process.env.FACEBOOK_SECRET || '0ca9722e2ecc5049c92a68c88143c82a',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'BNTjGDeerfIVgKlFbDvp5huJO',
		clientSecret: process.env.TWITTER_SECRET || '5A4jNQvyev6ZkYNCqiJMB8EdgBKR8PuRyAd2rZnchUSnrmnxnC',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};
