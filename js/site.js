$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

function sendMail() {
    var name = $("#senderName").val();
    var email = $("#senderMail").val();
    var text = $("#senderMessage").val();
    var subject = "Contact from " + name + " with mail " + email;
    
    var link = "mailto:pfmiralopes@gmail.com"
             + "?subject=" + escape(subject)
             + "&body=" + escape(text);

    window.location.href = link;
}