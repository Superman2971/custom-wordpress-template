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
    console.log('message1', $('#message1 option:selected').val(), 'message2', $('#message2 option:selected').val());
  });
  // Email Form #1
  $('#form1').click(function() {
    if (isEmail($('#email1').val()) && $('#message1 option:selected').val()) {
      emailjs.send("gmail", "template", {email: $('#email1').val(), message: $('#message1 option:selected').val()});
      $('#subscribe1').hide();
      $('#thanks1').show();
    } else {
      $('#bad-email1').show();
    }
  });
  // Email Form #2
  $('#form2').click(function() {
    if (isEmail($('#email2').val()) && $('#message2 option:selected').val()) {
      emailjs.send("gmail", "template", {email: $('#email2').val(), message: $('#message2 option:selected').val()});
      $('#subscribe2').hide();
      $('#thanks2').show();
    } else {
      $('#bad-email2').show();
    }
  });
  // Open Hidden Form
  $('#chest').click(function() {
    $('#treasure').hide();
    $('#chapters').show();
  });
  // Hidden Chapter Form
  $('#hidden').click(function() {
    if (isCorrectCode($('#code').val()) && $('#chapter1 option:selected').val() &&
      $('#chapter2 option:selected').val() && $('#chapter3 option:selected').val()) {
      emailjs.send("gmail", "hidden", {chapter1: $('#chapter1').val(),
        chapter2: $('#chapter2').val(), chapter3: $('#chapter3').val()});
      $('#chapters').hide();
      $('#treasure').show();
       window.open('./hidden_chapter.pdf');
    } else {
      console.log(isCorrectCode($('#code').val()) && $('#chapter1 option:selected').val() &&
      $('#chapter2 option:selected').val() && $('#chapter3 option:selected').val());
      $('#failed-attempt').show();
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
