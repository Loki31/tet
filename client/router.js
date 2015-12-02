FlowRouter.route('/', {
  name: 'home',
  action: function() {
    console.log('home');
    BlazeLayout.render('empty', {
      left: 'sidebarLeft_browse',
      main: 'hello',
      right :'sidebarRight'
    });
  }
});
