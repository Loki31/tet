Picker.route('/pdf/generate', function(params, req, res, next) {
    console.log('/download route!');
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
        fut.return(data);
      });
    });
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Contractul-Vietii-Eric.pdf'
    });
    res.end(fut.wait());
    //res.setHeader('Content-type', 'application/pdf');
    //res.end(fut.wait());

});
