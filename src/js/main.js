$(function() {

    $('form').on('submit', function(event) {
        event.preventDefault();

        var $name = $('#fieldName');
        var $email = $('#fieldEmail');
        var email = $email.val();
        var $message = $(this).find('.message');

        if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(email)) {
            $email.addClass('error').focus();
            if(email === '') {
                $message.addClass('error').html('Un email est requis.')
            }
            else {
                $message.addClass('error').html("L'email fourni n'est pas valide.")
            }

        } else {
            $email.removeClass('error');
            $message.removeClass('error success').html()

            $.getJSON(
                this.action + "?callback=?",
                $(this).serialize(),
                function (data) {
                    if (data.Status === 400) {
                        $message.addClass('error').html("Une erreur est survenue. Merci de réessayer.")
                    } else { // 200
                        $message.addClass('success').html("Merci pour votre inscription.")
                        $name.val('');
                        $email.val('');
                    }
                }
            );
        }
    });

    $('#slides').superslides({
      play: 6000
    });

  // $("a[rel=img_gallery]").fancybox({
  //   'transitionIn'    : 'none',
  //   'transitionOut'   : 'none',
  //   'titlePosition'   : 'over',
  //   'titleFormat'   : function(title, currentArray, currentIndex, currentOpts) {
  //     return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
  //   }
  // });

  // setTimeout('mce_preload_check();', 250);
});
