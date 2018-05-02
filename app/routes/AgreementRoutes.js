/********************************
 AGREEMENT ROUTING INITIALISATION
 ********************************/
module.exports = function(app, express) {

    // Imports Dependency, models and controllers
	const router                = express.Router();
    const config                = require('../../configs/configs');
    const Model                 = require("../models/Model");
    const AgreementController   = require("../controllers/AgreementController");
    const Agreements            = require("../models/AgreementSchema").Agreements;

    // Store Agreement
    router.post('/agreement', (req, res) => {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.store();
    });

    // Get Agreements
    router.get('/agreements', (req, res) => {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.collection();
    });

    // Get Agreement
    router.get('/agreement/:agreementId', (req, res) =>  {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.show();
    });

    // Update Agreement
    router.post('/agreement/:agreementId/update', (req, res) => {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.update();
    });

    // Delete Agreement
    router.post('/agreement/:agreementId/delete', (req, res) => {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.destroy();
    });

    // Search or Filter Agreement
    router.post('/agreement/search', (req, res) => {
        const AgreementObj = (new AgreementController(new Model(Agreements))).boot(req, res);
        return AgreementObj.searchAgreement();
    });

	app.use(config.baseApiUrl, router);

};