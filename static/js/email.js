const btnEmail = document.getElementById('button-email');

// form for user subscribtion
document.getElementById('subscribe-form').addEventListener('submit', function (event) {
  event.preventDefault();
  emailjs.init('user_ZxaX1Ph4GVNusJIcXdifR');

  btnEmail.value = 'Sending...';

  const serviceID = 'default_service';
  const templateID = 'template_solo_chef';

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btnEmail.value = "Thank you for subscribing! ";
    },
    (err) => {
      btnEmail.value = 'Email address failed to send';
      alert(JSON.stringify(err));
    }
  );
});

