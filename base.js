$(function() {

  $(window).load(function(){
     $('.preloader').fadeOut(400);
  });

  // Custom Select Dropdown
  $('select').each(function() {
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
      if (i > 0) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val(),
        }).addClass('list-option').appendTo($list);
      }
    }
    var $listItems = $list.children('li');

 
  
    $styledSelect.click(function(e) {
     if ($('.select-options').is(':visible')) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
    
      $list.hide();
     } else {
      e.stopPropagation();
      $('div.select-styled.active').each(function(){
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
     }
    });
  
    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });
    
    $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });

  // For Buy Now
  $('.list-option').click(function() {
    if ($('#message1 option:selected').val() === 'buy-now') {
      $('#email1').hide();
      $('#form1').hide();
      $('#buy1').show();
    } else {
      $('#email1').show();
      $('#form1').show();
      $('#buy1').hide();
    }
    if ($('#message2 option:selected').val() === 'buy-now') {
      $('#email2').hide();
      $('#form2').hide();
      $('#buy2').show();
      $('#other').hide();
    } else if ($('#message2 option:selected').val() === 'Other') {
      $('#email2').show();
      $('#form2').show();
      $('#buy2').hide();
      $('#other').show();
    } else {
      $('#email2').show();
      $('#form2').show();
      $('#buy2').hide();
      $('#other').hide();
    }
    if ($('#chapter1 option:selected').val()) {
      $('#reason1').show();
    }
    if ($('#chapter2 option:selected').val()) {
      $('#reason2').show();
    }
    if ($('#chapter3 option:selected').val()) {
      $('#reason3').show();
    }
  });
  // Adding Validation for Email
  $('#email1').mouseenter(function() {
    $('#need-email1').show();
  })
  $('#email1').mouseout(function() {
    $('#need-email1').hide();
  })
  $('#email2').mouseenter(function() {
    $('#need-email2').show();
  })
  $('#email2').mouseout(function() {
    $('#need-email2').hide();
  })
  // Email Form #1
  $('#form1').click(function() {
    $('#bad-email1').hide();
    $('#bad-select1').hide();
    if (isEmail($('#email1').val()) && $('#message1 option:selected').val()) {
      emailjs.send("gmail", "template", {email: $('#email1').val(), message: $('#message1 option:selected').val()});
      $('#subscribe1').hide();
      $('#thanks1').show();
    } else {
      if (!isEmail($('#email1').val())) {
        $('#bad-email1').show();
      }
      if (!$('#message1 option:selected').val()) {
        $('#bad-select1').show();
      }
    }
  });
  // Email Form #2
  $('#form2').click(function() {
    $('#bad-email2').hide();
    $('#bad-select2').hide();
    if (isEmail($('#email2').val()) && $('#message2 option:selected').val()) {
      emailjs.send("gmail", "template", {email: $('#email2').val(), message: $('#message2 option:selected').val(), text: $('#other').val()});
      // pop up the response
      if ($('#message2 option:selected').val() === 'Book David') {
        $('#live-event').hide();
        $('#book-david').show();
        $('#pop-up').show();
      } else {
        $('#live-event').show();
        $('#book-david').hide();
        $('#pop-up').show();
        $('#other').hide();
      }
      // remove the selected option
      $('#message2').prop('selectedIndex', 0);
      $('select').each(function() {
        var $this = $(this), numberOfOptions = $(this).children('option').length;
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
      });
      // remove the email
      $('#email2').val('');
    } else {
      if (!isEmail($('#email2').val())) {
        $('#bad-email2').show();
      }
      if (!$('#message2 option:selected').val()) {
        $('#bad-select2').show();
      }
    }
  });
  // Close Pop-up modals
  $('#pop-up').click(function() {
    $('#pop-up').hide();
  });
  // Open Hidden Form
  $('#chest').click(function() {
    $('#treasure').hide();
    $('#chapters').show();
  });
  // Hidden Chapter Form
  $('#hidden').click(function() {
    // hide all
    $('#code-bad').hide();
    $('#chapter1-bad').hide();
    $('#chapter2-bad').hide();
    $('#chapter3-bad').hide();
    $('#reason1-bad').hide();
    $('#reason2-bad').hide();
    $('#reason3-bad').hide();
    $('#name-bad').hide();
    $('#chapter-email-bad').hide();
    // check if all inputs filled
    if (isCorrectCode($('#code').val()) && $('#chapter1 option:selected').val() &&
      $('#chapter2 option:selected').val() && $('#chapter3 option:selected').val() &&
      $('#reason1').val() && $('#reason2').val() && $('#reason3').val() && $('#name').val()
      && isEmail($('#chapter-email').val())) {
      emailjs.send("gmail", "hidden", {chapter1: $('#chapter1').val(), chapter2: $('#chapter2').val(),
        chapter3: $('#chapter3').val(), reason1: $('#reason1').val(), reason2: $('#reason2').val(),
        reason3: $('#reason3').val(), name: $('#name').val(), email: $('#chapter-email').val()});
      $('#chapters').hide();
      $('#treasure').show();
       window.open('./hidden_chapter.pdf');
    } else {
      // find and add any missing field validations
      if (!isCorrectCode($('#code').val())) {
        $('#code-bad').show();
      }
      if (!$('#chapter1 option:selected').val()) {
        $('#chapter1-bad').show();
      }
      if (!$('#chapter2 option:selected').val()) {
        $('#chapter2-bad').show();
      }
      if (!$('#chapter3 option:selected').val()) {
        $('#chapter3-bad').show();
      }
      if ($('#chapter1 option:selected').val() && !$('#reason1').val()) {
        $('#reason1-bad').show();
      }
      if ($('#chapter2 option:selected').val() && !$('#reason2').val()) {
        $('#reason2-bad').show();
      }
      if ($('#chapter3 option:selected').val() && !$('#reason3').val()) {
        $('#reason3-bad').show();
      }
      if (!$('#name').val()) {
        $('#name-bad').show();
      }
      if (!isEmail($('#chapter-email').val())) {
        $('#chapter-email-bad').show();
      }
    }
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function isCorrectCode(code) {
    if (code.toLowerCase() === 'bonus') {
      return true;
    } else {
      return false;
    }
  }

  // Active Spy Scroll (module/navi)
  inScrolling = false;

  $('a[href*=#]:not([href=#])').click(function() {

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {

        // Lock Spy Scroll
        inScrolling = true;

        var oS = target.offset().top;
        var topBack = 30;
        var top = oS > topBack ? oS - topBack : 0;
        var time = Math.abs($(window).scrollTop() - oS)/50 * 10;

        $('html,body').animate({ scrollTop: top }, time, function(){ inScrolling = false; });

        return false;
      }
    }
  });
  
  // Q&A CLICK
  $(".faq-holder").click(function (event) {
    if($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });
});
