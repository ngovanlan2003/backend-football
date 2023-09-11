const ReportService = require('../services/ReportService')

const getAllReport = async (req, res) => {
    try {
        let responve = await ReportService.getAllReport()
        return res.status(200).json(responve)
    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: 'ERROR FROM SERVER'
        })
    }
}

module.exports = {
    getAllReport
}