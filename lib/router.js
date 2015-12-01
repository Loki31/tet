Router.route("/userpdf", {
  name: "userpdf",
  where: "server",
  action: function() {
    var Future, Webshot, fileName, fs, fut, html, options, user;
    fs = Meteor.npmRequire('fs');
    Future = Npm.require('fibers/future');
    Webshot = Meteor.npmRequire('webshot');
    fileName = "generated_2.pdf";
    fut = new Future();
    SSR.compileTemplate('template', Assets.getText('userPdf.html'));
    html = SSR.render('template', {
      user: 'Lalalalla'
    });
    options = {

      phantomConfig: {
        'ignore-ssl-errors': 'true'
      },
      siteType: 'html',
      'paperSize': {
        'format': 'Letter',
        'orientation': 'portrait',
        'margin': '1cm'
      }
    };
    Webshot(html, fileName, options, function(err) {
      fs.readFile(fileName, function(err, data) {
        if (err) {
          return console.log(err);
        }
        fs.unlinkSync(fileName);
        fut["return"](data);
      });
    });
    this.response.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Contractul-Vietii-Eric.pdf'
    });
    this.response.end(fut.wait());
  }
});

Router.route('/sponsor/:hid/generatePDF', {
name: 'generatePDF',
where: 'server',
action: function() {
    var webshot = Meteor.npmRequire('webshot');
    var fs      = Npm.require('fs');
    var Future = Npm.require('fibers/future');
    var fut = new Future();
    var fileName = "case-report.pdf";
    var curCase = this.params.hid;

    // Render the template on the server
    SSR.compileTemplate('template', Assets.getText('userPdf.html'));

    var html = SSR.render("template", {
      user: curCase
    });

    // Setup Webshot options
    var options = {
        "paperSize": {
            "format": "A4",
            "orientation": "portrait",
            "margin": "1cm"
        },
        siteType: 'html'
    };



    webshot(html, fileName, options, function(err) {
        fs.readFile(fileName, function (err, data) {
            if (err) {
                return console.log(err);
            }

            fs.unlinkSync(fileName);
            fut.return(data);
        });
    });

    this.response.writeHead(200, {'Content-Type': 'application/pdf',"Content-Disposition": "attachment; filename=generated.pdf"});
    this.response.end(fut.wait());

}
});

Router.route('/');
Router.route('/aboutPage');

FlowRouter.route('/denied', {
    name: 'denied',
    action: function () {
        console.log('denied');
        BlazeLayout.render('layout', {
            left: 'sidebarLeft_browse',
            main: 'accessDenied',
            right: 'sidebarRight'
        });
    }
});
