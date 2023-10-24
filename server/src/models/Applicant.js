module.exports = (serquelize, DataTypes) => {
	const Applicant = serquelize.define('Applicant', {
		status: DataTypes.STRING,
		amount: DataTypes.STRING,
		link_to_Archive: DataTypes.STRING,
		applicant_name: DataTypes.STRING,
		applicant_phone: DataTypes.STRING,
		applicant_born: DataTypes.STRING,
		help_scheme_sent: DataTypes.STRING,
		help_scheme_received: DataTypes.STRING,
		home_visit_ordered: DataTypes.STRING,
		home_visit_ordered_by: DataTypes.STRING,
		home_visit_date: DataTypes.STRING,
		application_sent: DataTypes.STRING,
		grant_received: DataTypes.STRING,
		contract_sent_municipality: DataTypes.STRING,
		contract_received_municipality: DataTypes.STRING,
		dog_tag_ordered: DataTypes.STRING,
		outplacement_date: DataTypes.STRING,
		cd_sent: DataTypes.STRING,
		declaration_of_title_sent: DataTypes.STRING,
		declaration_of_title_received: DataTypes.STRING,
		remark: DataTypes.TEXT,
		initials: DataTypes.STRING
	})
	return Applicant
}