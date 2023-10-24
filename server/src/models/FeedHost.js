module.exports = (serquelize, DataTypes) => {
	const FeedHost = serquelize.define('FeedHost', {
		status: DataTypes.STRING,
		start_date: DataTypes.STRING,
		end_date: DataTypes.STRING,
		price_amount: DataTypes.STRING,
		appendix_no: DataTypes.STRING,
		monthly: DataTypes.STRING,
		quarterly: DataTypes.STRING,
		yearly: DataTypes.STRING,		
		dog_no: DataTypes.INTEGER,
		dog_name: DataTypes.STRING,
		invoice_no: DataTypes.STRING,
		feedhost_name: DataTypes.STRING,
		reg_no: DataTypes.STRING,
		account_no: DataTypes.STRING,
		feedhost_adress: DataTypes.STRING,
		zip_code: DataTypes.STRING,
		town: DataTypes.STRING,
		feedhost_phone: DataTypes.STRING,
		feedhost_mail: DataTypes.STRING,
		dog_tag: DataTypes.STRING,
		feedhost_agreement: DataTypes.STRING,
		feedhost_guide: DataTypes.STRING,
		remark: DataTypes.TEXT,
		initials: DataTypes.STRING,
		dog_history: DataTypes.STRING
	})
	return FeedHost
}