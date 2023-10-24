module.exports = (serquelize, DataTypes) => {
	const UpcomingFeedHost = serquelize.define('UpcomingFeedHost', {
		year: DataTypes.STRING,
		upcoming_feedhost_name: DataTypes.STRING,
		status: DataTypes.STRING,
		upcoming_feedhost_adress: DataTypes.STRING,
		upcoming_feedhost_phone: DataTypes.STRING,
		upcoming_feedhost_phone2: DataTypes.STRING,
		upcoming_feedhost_gender: DataTypes.STRING,
		upcoming_feedhost_colour: DataTypes.STRING,
		buy_puppy_date: DataTypes.STRING,
		pickup_puppy_date: DataTypes.STRING,
		called_name: DataTypes.STRING,
		kennel_name: DataTypes.STRING,
		price: DataTypes.STRING,
		instructor: DataTypes.STRING,
		remark: DataTypes.TEXT
	})
	return UpcomingFeedHost
}