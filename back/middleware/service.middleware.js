/**
 * Get the serive name in params, query or body
 * @param {*} req
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const getService = (req, res, next) => {
    const service = req.params.service || req.query.service || req.body.service;

    if (!service)
      return res.status(403).json({ message: 'A specified service is required for Authentifation' });
    req.service = service;
    return next();
}

module.exports = { getService };