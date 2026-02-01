$(function(){

  $.fx.interval = 8;

  var pause = false,
      fix_y = 0;

  function fix_wrapper(){
    pause = true;
    fix_y = $(window).scrollTop();
    $('.wrapper').css({'position':'fixed', 'top':-fix_y});
    $('#screen').addClass('show');
  }

  function unfix_wrapper(){
    pause = false;
    $('.wrapper').css({'position':'relative', 'top':0});
    $(window).scrollTop(fix_y);
    $('#screen').removeClass('show');

    if($('.home')[0]){
      if($(window).scrollTop() > $('#cover').height()) {
        $("#header").addClass('dark');
      }else{
        $("#header").removeClass('dark');
      }
    }
  }



  $('#screen').on('click', function(){
    unfix_wrapper();
  });



  var scrolltop0 = 0;

  $(window).scroll(function(){
    var scrolltop = $(this).scrollTop();
    if(scrolltop > 0 && scrolltop > scrolltop0) {
      $("#lnavi").addClass('hide');
    }else{
      if(!pause) $("#lnavi").removeClass('hide');
    }
    scrolltop0 = scrolltop;
  });



  $('#gnavi_btn').on('click', function(){
    $(this).toggleClass('x');
    if($(this).hasClass('x')){
      fix_wrapper();
      $('body').addClass('gnavi_open');
      $('#gnavi').addClass('open');
    }else{
      unfix_wrapper();
      $('body').removeClass('gnavi_open');
      $('#gnavi').removeClass('open');
    }
  });



  var scroll_easing = $.bez([.3,0,.15,1]),
      scroll_duration = 1500;

  $('a[href="#"]').on('click', function(){
    return false;
  });

  $("a[href^='#']").not($("a[href='#']")).click(function(){
    $('html, body').stop().animate({scrollTop: Math.max(0, Math.min($($(this.hash)).offset().top, $('body').height()-$(window).height()))}, scroll_duration, scroll_easing);
    return false;
  });

  $('#pagetop a,.pagetop a').on('click', function(){
    $('html, body').animate({ scrollTop: 0 }, scroll_duration, scroll_easing);
    return false;
  });



  /*$('.faq_list').on('click', 'dt', function(){
    $(this).toggleClass('x');
    $(this).next().slideToggle();
  });*/

});



$(window).on('load resize', function(){
  $('section').each(function(){
    var html = $(this).html();
    $(this).html(html.replace(/縲�/g, '�､'));
  });
  if($(window).width() > 768) {
    $('.vertical').each(function(){
      var html = $(this).html();
      $(this).html(html.replace(/�､/g, '縲�'));
    });
  }
  $('body').removeClass('preload').animate({'opacity': 1}, 1000);
});

$(window).on('unload', function(){
});

window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload(false);
  }
};
