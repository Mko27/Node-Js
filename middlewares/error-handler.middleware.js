const ERROR_CASES = {
  ValidationError: {
    statusCode: 400,
    errorCode: 'InvalidInput'
  },
  ItemNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  PathNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  ExistMailError: {
    statusCode: 409,
    errorCode: 'RegisteredMail'
  },
  CategoryDeleteError: {
    statusCode: 400,
    errorCode: 'ParentCategory'
  },
  ExistNameError: {
    statusCode: 409,
    errorCode: 'ExistingName'
  },
  RegionDeleteError: {
    statusCode: 400,
    errorCode: 'RegionHasCity'
  },

  DEFAULT: {
    statusCode: 500,
    errorCode: 'InternalError',
    errorMessage: 'The server encountered an internal error. Try again later.'
  }
}

module.exports = {

  /**
   * @access public
   * @returns {function(*, *, *, *)}
   * @description Error handler.
   */
  handleError: () => {
    return (err, req, res, next) => {
      const ERROR_CASE = ERROR_CASES[err.name] || ERROR_CASES.DEFAULT

      // console.log('ERROR: ', err)
      // if error get from sequelize check error message as err.errors && err.errors[0] && err.errors[0].message
      const errorResponse = {
        status: ERROR_CASE.statusCode,
        code: ERROR_CASE.errorCode,
        message: ERROR_CASE.errorMessage || (err.errors && err.errors[0] && err.errors[0].message) || err.message
      }
      // temp. log to explore and add more cases.
      errorResponse.status === 500 && console.log('Case: ', err.status, err.statusCode, err.code, err.name, err.message)

      return res.status(errorResponse.status).json(errorResponse)
    }
  }
}

module.exports.test = {
  ERROR_CASES
}
