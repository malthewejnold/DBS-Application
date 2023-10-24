module.exports = (serquelize, DataTypes) =>
	serquelize.define('User', {
		name: DataTypes.STRING,
		type: DataTypes.STRING,
		role: DataTypes.STRING
	})
