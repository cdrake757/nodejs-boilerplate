(function() {
  'use strict';

  // FIXME
  var config        = include('sample/config/config.js');

  var emptyFunction = include('ohm/models/emptyFunction.js');
  var Parse         = include('ohm/apis/Parse.js');

  /**
   * This class is the essential class for determining
   * the identity of the logged in user.
   *
   * Never create a ViewerContext on your own, that is, DONT DO
   * > new ViewerContext(foo);  // THIS IS BAD!!
   *
   * Instead do
   * > ViewerContext.fetchWithFBUserID(fbUserID, callback);
   *
   * or
   * > ViewerContext.genFromViewerContextID(viewerContextID, callback);
   *
   * The reason is so we never create more than one viewer context per
   * request.
   * @module ViewerContext
   */
  var ViewerContext = Parse.Object.extend(
    'ViewerContext', {
      /**
       * @param {object} slug
      */
      getCredential: function(slug) {
        return this.get(slug);
      },

      /**
       * @param {object} slug
       * @param {object} token
       */
      setCredential: function(slug, token) {
        return this.set(slug, token);
      },

      /**
       * @param {object} slug
       */
      clearCredential: function(slug) {
        return this.set(slug, {});
      },

      /**
       * @param {function} callback
       */
      saveParseObject: function (callback) {
        this.save(null, {
          success: function(data) {
            callback(null, data);
          },
          error: function(error) {
            callback(error);
          },
        });
      },

    }, {
      /**
       * @param {function} callback
       * @param {string} primaryAccountKey
       * @returns {object} viewerContext
       */
      genFromPrimaryAccountKey: function (primaryAccountKey, callback) {
        if (!callback) {
          return console.error('No callback passed into genFromClientID.');
        }
        if (!config.PRIMARY_ACCOUNT_KEY) {
          return callback(null, new ViewerContext({}));
        }

        var query = new Parse.Query(ViewerContext);
        query.equalTo(config.PRIMARY_ACCOUNT_KEY, primaryAccountKey);
        query.first().then(function(viewerContext) {
          return callback(null, viewerContext);
        });
      },

      /** Generate From ViewerContext ID
       * @param {string} viewerContextID
       * @param {function} callback
       * @returns {object} viewerContext
       */
      genFromViewerContextID: function(viewerContextID, callback) {
        if (!callback) {
          return console.error('No callback passed into genFromViewerContextID.');
        }

        if (!viewerContextID) {
          return callback(null, new ViewerContext({}));
        }

        var query = new Parse.Query(ViewerContext);
        query.get(viewerContextID, {
          success: function(viewerContext) {
            return callback(null, viewerContext);
          },
          error: function(object, error) {
            return callback(error, new ViewerContext({}));
          },
        });
      },

      /** TESTING: Generate Temp ViewerContext */
      genTemporaryViewerContext_UNITTEST: function(initData) {
        var temp = new ViewerContext(initData);
        return temp;
      }
    }
  );

  module.exports = ViewerContext;
}());
