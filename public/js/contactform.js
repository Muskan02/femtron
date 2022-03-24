

jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('#sendmessagebtn').click(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');
      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    sendmail();
    $("#sendmessage").show();
    $("#errormessage").removeClass("show");
    $('.contact-form').find("input, textarea").val("");
    return true;
  });

});

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
     
    },
    body: JSON.stringify(data)
  });
  return response.json(); 
}


function sendmail() {
  Name = document.getElementById("name").value;
  Email = document.getElementById("email").value;
  subject = document.getElementById("subject").value;
  message = document.getElementById("message").value;
  body = "<h3>Someone contacted from https://femtronservices.com </h3> <br> <p>The details are as follows:</p><br><h4>Name:" + Name + "<br>Email: " + Email + "<br>Subject: " + subject + "<br>Message: " + message + "</h4>";
  requestbody = {
    "name": Name,
    "to": "contact@femtronservices.com",
    "subject": subject,
    "message": message,
    "html": body
  }
  var url = 'https://femptron.pythonanywhere.com/send-mail'
  postData(url, requestbody).then(data => {
    console.log(data);
  });
  

}