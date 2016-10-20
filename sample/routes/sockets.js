(function() {
  'use strict';

  var _ = require('underscore');
  // This function means that
  //
  // > _new(String, "foo");
  //
  // is identical to the call
  //
  // > new String("foo");
  function _new(Cls) {
    return new (Cls.bind.apply(Cls, arguments))();
  }

  // Keep me alphabetized!!
  var ON = {};

  module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
      _.each(ON, function (controller, socketMsg) {
        socket.on(
          socketMsg,
          _.partial(_new, include(controller), socketMsg, socket)
        );
      });
    });
  };
}());