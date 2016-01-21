(function() {
  $(function() {
    var form, modal, modalDrop;
    $('#contact-form').hide().delay(2000).fadeIn(500);
    form = $('#contact-form form');
    modal = $('div.modal');
    $('h3.close').on('click', function() {
      if ($(this).hasClass('close')) {
        $('#contact-form form').slideUp(200);
        modal.hide();
        $(this).addClass('open');
        $(this).removeClass('close');
        $('span.close-icon i').removeClass('fa-chevron-down');
        return $('span.close-icon i').addClass('fa-chevron-up');
      } else {
        $('#contact-form form').slideDown(200);
        $(this).addClass('close');
        $(this).removeClass('open');
        $('span.close-icon i').removeClass('fa-chevron-up');
        return $('span.close-icon i').addClass('fa-chevron-down');
      }
    });
    modal.hide();
    modalDrop = function(a) {
      modal.fadeIn(200);
      return modal.find('p').text(a);
    };
    $("#contact-form form button").on('click', function(e) {
      var dataString, email, emailReg, name, valid;
      e.preventDefault();
      name = $("#contact-form form input[name='name']").val();
      if (!name) {
        $("input[name='name']").focus();
        modalDrop('Please Enter a Name');
        return false;
      }
      email = $("#contact-form form input[name='email']").val();
      emailReg = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      valid = emailReg.test(email);
      if (!valid) {
        $("#contact-form form input[name='email']").focus();
        modalDrop('Please Enter a Valid Email');
        return false;
      }
      dataString = $('form[name="contact"]').serialize();
      return $.ajax({
        type: "POST",
        url: "../build/mail.php",
        data: dataString,
        success: function() {
          modalDrop('Thanks! We\'ll be in touch!').delay(2000).fadeOut(200);
          $('#contact-form').delay(2000).fadeOut(200);
          modal.addClass('success');
          return window.google_trackConversion({
            google_conversion_id: 945713011,
            google_conversion_label: "BdwZCIycrl4Q8975wgM",
            google_remarketing_only: false,
            google_remarketing_only: false
          });
        }
      });
    });
    $.ajax({
      url: 'data/data.json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $('<div id="contact"><p>' + data.contact.copy + '</p><a href="mailto:' + data.contact.email + '"><i class="fa fa-envelope"></i> ' + data.contact.email + '</a></div>').appendTo('footer .holder');
        $.each(data.notes, function() {
          var handle;
          handle = this.handle;
          $('<li class="' + handle + '"> <div class="holder"> <div class="img ' + this.mobile + '"></div> <div class="copy"> <h2 class="title">' + this.title + '</h2> <span class="preview"></span> <a href="http://cdn.soundfreaq.com/designnotes/' + this.url + '" class="dl"><i class="fa fa-file-text"></i> Download PDF</a> </div> </div> </li>').appendTo('#content');
          $.each(this.preview, function() {
            return $('<p>' + this + '</p>').appendTo('li.' + handle + '  .preview');
          });
          $('ul#content > li:odd').addClass('even');
          $('ul#content > li:even .holder').attr('data-sr', 'enter right and hustle 150px over 1s');
          return $('ul#content > li:odd .holder').attr('data-sr', 'enter left and hustle 150px over 1s');
        });
        $.each(data.asSeenIn, function() {
          console.log(this.title);
          return $('<div class="' + this.title + '"><img src="assets/img/' + this.title + '.svg"></div>').appendTo('#as-seen-in .logos');
        });
        return window.sr = new scrollReveal();
      },
      error: function() {
        return console.log('fail');
      }
    });
    if (document.referrer.indexOf('soundfreaq') !== -1) {
      $('a.back').text('back to site');
      return $('a.back').on('click', function() {
        parent.history.back();
        return false;
      });
    } else {
      $('a.back').text('continue to soundfreaq.com');
      return $('a.back').attr('href', 'http://www.soundfreaq.com');
    }
  });

}).call(this);
