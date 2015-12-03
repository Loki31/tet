if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click .pdf': function() {
      Router.go('/userpdf');
      Meteor.setTimeout(function() {
        Router.go('/aboutPage');
      }, 5000);
    },
    'click .download': function (event, template) {
        event.preventDefault();
        var win = window.open('pdf/generate/12345');
        win.focus();
        // HTTP.call('GET', '/pdf/generate/12503', {responseType: "document"}, function (error, response) {
        //     if ( error ) {
        //       console.log( error );
        //     } else {
        //       console.log( response );
        //     }
        // })
    }
  });
}
