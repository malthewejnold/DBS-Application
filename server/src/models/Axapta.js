module.exports = (serquelize, DataTypes) =>
	serquelize.define('Axapta', {
		ax_dog_no:{
			type: DataTypes.INTEGER,
			unique: true,
			primaryKey: true
		},
		ax_dog_name:DataTypes.STRING,
	})
