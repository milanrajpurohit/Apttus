/****************************
 AGREEMENT CONTROLLER
 ****************************/
const Controller    = require("./Controller");
const _             = require("lodash");

class AgreementController extends Controller {

    constructor(repo) {
        super();
        this.repo = repo;
    }

    // Store Agreement
    async store() {
        let _this = this;

        try {
            // Setting the filter field
            const filter = { name: this.req.body.name };

            // Calling Agreement Find Model
            const agreement = await this.repo.findOne(filter);
            if (!_.isEmpty(agreement)) throw 'Agreement is already exist.';

            // Setting Agreement Data
            const agreementData = {};
            (this.req.body.name) ? (agreementData.name = this.req.body.name) : delete agreementData.name;
            (this.req.body.startDate) ? (agreementData.startDate = this.req.body.startDate) : delete agreementData.startDate;
            (this.req.body.endDate) ? (agreementData.endDate = this.req.body.endDate) : delete agreementData.endDate;
            (this.req.body.value) ? (agreementData.value = this.req.body.value) : delete agreementData.value;
            (this.req.body.status) ? (agreementData.status = this.req.body.status) : delete agreementData.status;

            // Calling Agreement Save Model
            const agreementNewObject = await this.repo.store(agreementData);
            if (_.isEmpty(agreementNewObject)) throw "Error in saving the agreement";

            // Sending success response
            return _this.res.status(201).send({status: 1, message: "Agreement saved successfully.", data: agreementNewObject});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Get Agreements
    async collection() {
        let _this = this;

        try {
            // Calling Agreement Model
            const agreements =  await this.repo.find();
            if (!agreements) return _this.res.status(404).send({status: 1, message: `Agreement are not found.`});

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Agreements found successfully", data: agreements});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Get Agreement Details
    async show() {
        let _this = this;

        try {
            // Setting the filter
            let filter = { _id: this.req.params.agreementId };

            // Calling Agreement Model
            const agreement =  await this.repo.findOne(filter);
            if (_.isEmpty(agreement)) throw `Agreement is not found.`;

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Agreement has been found successfully", data: agreement});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Update Agreement
    async update() {
        let _this = this;

        try {
            // Setting the data and filter
            let filter = { _id: this.req.params.agreementId };
            let setAgreementData = { modifiedOn: new Date() };
            (this.req.body.name) ? (setAgreementData.name = this.req.body.name) : delete setAgreementData.name;
            (this.req.body.startDate) ? (setAgreementData.startDate = this.req.body.startDate) : delete setAgreementData.startDate;
            (this.req.body.endDate) ? (setAgreementData.endDate = this.req.body.endDate) : delete setAgreementData.endDate;
            (this.req.body.value) ? (setAgreementData.value = this.req.body.value) : delete setAgreementData.value;
            (this.req.body.status) ? (setAgreementData.status = this.req.body.status) : delete setAgreementData.status;

            // Calling model to update agreement data
            const agreementUpdatedObject = await this.repo.update(filter, setAgreementData);
            if (!agreementUpdatedObject) throw 'Agreement does not exist.';

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Agreement has been updated."});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Delete Agreement
    async destroy() {
        let _this = this;

        try {
            // Setting the filter object
            let filter = { _id: this.req.params.agreementId };
            const agreementObject = await this.repo.destroy(filter);

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Agreement has been deleted successfully."});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

    // Search Agreement
    async searchAgreement() {
        let _this = this;

        try {
            // Validating the search parameters
            if(!this.req.body.length) return _this.res.status(400).send({status: 0, message: "Bad request."});

            // Iterating through search conditions
            let searchCriteria = this.req.body;
            let filter = [];
            searchCriteria.filter( async (search) => {

                // Validating operator with respect to selected field
                if((search.name == 'name' || search.name == 'status') && (search.operator == 'gte' || search.operator == 'lte')) {
                    return _this.res.status(400).send({status: 0, message: "Bad request."});
                }

                if((search.name == 'value' || search.name == 'startDate' || search.name == 'endDate') && (search.operator == 'contains')) {
                    return _this.res.status(400).send({status: 0, message: "Bad request."});
                }

                // Creating condition for query
                if(search.operator == 'lte' || search.operator == 'gte' || search.operator == 'ne' || search.operator == 'eq'){
                    filter.push({ [search.name]: {['$'+ search.operator]: `${search.value}`}});
                }

                if(search.operator == 'contains'){
                    filter.push({ [search.name]:  {$regex: `.*${search.value}.*` }});
                }

            })

            // Calling Agreement Model
            const agreements =  await this.repo.find({$or: filter});
            if (!agreements.length) return _this.res.status(404).send({status: 1, message: `Agreement are not found.`});

            // Sending success response
            return _this.res.status(200).send({status: 1, message: "Agreements found successfully", data: agreements});

        } catch (err) {
            // Sending error
            return _this.res.status(500).send({status: 0, message: err});
        }

    }

}

module.exports = AgreementController;
