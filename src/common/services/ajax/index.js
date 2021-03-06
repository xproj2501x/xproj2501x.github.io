/**
 * Ajax Service
 * ===
 *
 * @module common.Services.AjaxService
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * API Methods
 * @enum {string}
 */
const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * AjaxService
 * @class
 */
class AjaxService {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * AjaxService
   * @constructor
   */
  constructor() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Sends a delete request to the specified resource.
   * @public
   * @param {object} options - The options for the request.
   *
   * @return {Promise}
   */
  delete(options) {
    return this._send(METHOD.DELETE, options);
  }

  /**
   * Sends a get request to the specified resource.
   * @public
   * @param {object} options - The options for the request.
   *
   * @return {Promise}
   */
  get(options) {
    return this._send(METHOD.GET, options);
  }

  /**
   * Sends a post request to the specified resource.
   * @public
   * @param {object} options - The options for the request.
   *
   * @return {Promise}
   */
  post(options) {
    return this._send(METHOD.POST, options);
  }

  /**
   * Sends a put request to the specified resource.
   * @public
   * @param {object} options - The options for the request.
   *
   * @return {Promise}
   */
  put(options) {
    return this._send(METHOD.PUT, options);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Sends a request to the specified resource.
   * @private
   * @param {string} method - The request method.
   * @param {object} options - The options for the request.
   *
   * @return {Promise}
   */
  async _send(method, options) {
    let result;

    await fetch(options.uri, {
      method: method,
      headers: options.headers,
      body: JSON.stringify(options.body)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        result = json;
      });
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method.
   * @static
   *
   * @return {AjaxService} - A new ajax service instance.
   */
  static createInstance() {
    return new AjaxService();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AjaxService;
