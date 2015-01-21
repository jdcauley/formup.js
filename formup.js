(function(){

  function traverseParents(element, parent){
    var traveler = element.parentElement;
    while(traveler.tagName != parent){
      traveler = traveler.parentElement;
    }
    return traveler;
  }

  function stop(event){
    event.preventDefault();
  }

  function insertClass(element, newClass){

    var elementClasses = element.className;

    var classList = elementClasses.split(' ');

    for(var i = classList.length-1; i--;){
      if (classList[i] === newClass){
        classList.splice(i, 1);
      }
    }
    element.className = classList.join(' ') + ' ' + newClass;
    return element;

  }

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validator(){

    var form = traverseParents(this, 'FORM');

    var formParent = form.parentElement;
    var errorBox = document.getElementById('js-errorbox-' + form.id);
    var requireErrorMessage = document.getElementById(form.id + '-required-error');

    if(!errorBox){
      var errorBox = document.createElement('div');
      errorBox.id = 'js-errorbox-' + form.id;
      errorBox.className = 'js-errors errors front-end-errors';
      formParent.insertBefore(errorBox, form);
    }

    var required = form.getElementsByClassName('required');

    var globalError = false;
    var requiredError = false;

    for(var i = 0; i < required.length; i++){

      var fieldError = false;


      if(!required[i].value){

        fieldError = true;
        requiredError = true;
        globalError = true;

      }

      if (required[i].name == 'email'){

        var isEmailValid = validateEmail(required[i].value);

        if(!isEmailValid){
          // emailError = true;
          var emailErrorMsg = document.getElementById(form.id + '-email-error');
          if(!emailErrorMsg){
            var emailErrorMsg = document.createElement('div');
            emailErrorMsg.id = form.id + '-email-error';
            emailErrorMsg.innerText = 'There is a problem your email.';
            errorBox.appendChild(emailErrorMsg);
            fieldError = true;
            globalError = true;
          }

        }
      }

      if(required[i].name == 'terms'){

        var isChecked = required[i].checked;



        if(!isChecked){

          var tosErrorMsg = document.getElementById(form.id + '-tos-error');

          if(!tosErrorMsg){
            var tosErrorMsg = document.createElement('div');
            tosErrorMsg.id = form.id + '-tos-error';
            tosErrorMsg.innerText = 'You must agree to the Terms of Service';
            errorBox.appendChild(tosErrorMsg);
          }

          fieldError = true;
          globalError = true;
        }



      }

      if(fieldError){
        insertClass(required[i], 'error');
      }

    }

    if(requiredError && (!requireErrorMessage)){
      var requireErrorMessage = document.createElement('div');
      requireErrorMessage.id = form.id + '-required-error';
      requireErrorMessage.innerText = 'These fields are required.';
      errorBox.appendChild(requireErrorMessage);
    }

    if(!globalError){

      form.submit();
    }

  }

  function watchButtons(){

    var submits = document.querySelectorAll('input[type=submit]');

    for(var index = 0; index < submits.length; index++){

      submits[index].addEventListener('click', stop, false);
      submits[index].addEventListener('click', validator, false);

    }

  }
  watchButtons();

})();
