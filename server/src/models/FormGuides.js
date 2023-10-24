module.exports = (serquelize, DataTypes) =>
	serquelize.define('FormGuides', {
		formName:DataTypes.STRING,
		guide:DataTypes.TEXT,
	})
