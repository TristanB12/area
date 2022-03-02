/**
 * get the platorm in query
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function getPlatform(req, res, next) {
    let { platform } = req.query;

    if (!platform)
        platform = 'web';
    if (!["web", "ios", "android", "dev"].includes(platform))
        return res.status(400).json({ message: "platform must be web, ios or android." });
    req.platform = platform;
    return next();
}

module.exports = { getPlatform };