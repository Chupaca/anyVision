exports.Server = {
	Ip:process.env.OPENSHIFT_NODEJS_IP||process.env.IP,
	//Ip:process.env.OPENSHIFT_NODEJS_IP
	Port:process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT
	//Port:process.env.OPENSHIFT_NODEJS_PORT
};

exports.DB = {
		ConnectionStringWriter:"mongodb://admin:admin@localhost:27017/AnyVision",
        ConnectionStringReader:"mongodb://admin:admin@localhost:27017/AnyVision",
        SessionStore:"mongodb://admin:admin@localhost:27017/AnyVision"
};