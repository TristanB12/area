/**
 * Get user information for area service
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getInfos(req, res) {
  const { user } = req;

  return res.status(200).json({
    email: user.auth.email,
    email_verified: user.email_verified,
    linked_services: Object.keys(user.services)
  });
}

module.exports = { getInfos };