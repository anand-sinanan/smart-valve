jQuery.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "Must contain only letters and numbers");
	jQuery.validator.addMethod("price", function(value, element) {
        return this.optional(element) || /^\$?(?!0\d)(?:\d+|\d{1,3}(?:,\d{1,3})*)(?:\.\d{2})?$/.test(value);
}, "Must be any number using up to 2 decimals.");
	jQuery.validator.addMethod("integer", function(value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value);
}, "Must contain digits only");
	jQuery.validator.addMethod("alphanum", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\.\,\;\:\?\!\%\#\$\&\(\)\'\-\s]+$/i.test(value);
    }, "Must contain only letters, numbers, dashes, single parentheses, brackets, periods, commas, semi-colons, colons, ampersands, question, exclamation marks, hashtags, dollar and/or percent signs.");
	jQuery.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || /^[a-z\.\&\(\)\'\-\s]+$/i.test(value);
    }, "Must contain only letters, dashes, single parentheses, brackets, periods or ampersands.");
	jQuery.validator.addMethod("cdnPostal", function(postal, element) {
    return this.optional(element) ||
    postal.match(/[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/);
}, "Please specify a valid postal code.");

	function SignUp() {

			var url = "http://54.83.192.126:8089/signup";
			var params = {
						username: $('#semail').val(),
						password: sha1($('#spass').val()),
						confirmedpassword: sha1($('#sconfirm').val()),
						firstname: $('#sfirst').val(),
						lastname: $('#slast').val()
					};
			postHandler(url, params, function(data) {

					  UIkit.modal("#signup").hide();
					  $('#registration')[0].reset();
					  UIkit.notify(data.success, {pos:'top-center', status:'success'});
				}
			);

        }

	function SignIn(username, password) {

			var url = "http://54.83.192.126:8089/login";
			var params = {
						username: username,
						password: sha1(password),
						};
			// postHandler(url, params, function(data) {
			//
			// 		  //console.log(data);
			// 		  //Keep session information in local storage (build session pre-execute helper)
      //     }
  		// 	);

            var data = {
              "success" : {
                "userID" : 1,
                "firstname" : "Anand",
                "lastname" : "Sinanan"
              }
            };
            localStorage.setItem('data', JSON.stringify(data));


					  //redirect user to main/hub
					  window.location = 'main.html';

        }






$(document).ready(function() {

	endSession();

	$('#login1').validate({
		errorPlacement: function(label, element) {
		//element.addClass('uk-form-danger');
		//console.log(label);
        UIkit.notify(label[0].textContent, {pos:'top-center', status:'danger'});
		},

	rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side

      pass1: {
        required: true,
        alphanumeric: true,

      }
    },
    // Specify validation error messages
    messages: {
      pass1: {
        required: "Please provide a password",

      },
	  user1: {
		required: "Username should be an e-mail",
		email:"That's not an e-mail bruh",

	  }
    },
     /* onfocusout: function(e) {
      this.element(e);
    }
    ,*/
	onfocusout: false,
    onkeyup: false,
    onclick: false,
	// Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      //form.submit();
	  //alert("Inside Submit Handler")
	  SignIn($("#user1").val(),$("#pass1").val());
    }
	});

	$('#login2').validate({
		errorPlacement: function(label, element) {
		//element.addClass('uk-form-danger');
        UIkit.notify(label[0].textContent, {pos:'top-center', status:'danger'});
		},
	rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side

      pass2: {
        required: true,
        alphanumeric: true,

      }
    },
    // Specify validation error messages
    messages: {
      pass2: {
        required: "Please provide a password",

      },
	  user2: {
		required: "Username should be an e-mail",
		email:"That's not an e-mail bruh",

	  }
    },
     /* onfocusout: function(e) {
      this.element(e);
    }
    ,*/
	onfocusout: false,
    onkeyup: false,
    onclick: false,
	// Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      //form.submit();
	  //alert("Inside Submit Handler")
	  SignIn($("#user2").val(),$("#pass2").val());
    }
	});

	var validator = $("#registration").validate({
	errorPlacement: function(label, element) {
        label.addClass('uk-form-label uk-text-danger uk-text-small uk-animation-fade');
		//label.css('display', 'inline');
		//console.log(element[0].id);
		label.insertAfter($("label[for=" + element[0].id + "]"));
    },
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      sfirst: {
			 required: true,
			 alpha: true
		 },
      slast: {
			 required: true,
			 alpha: true
		 },
      semail: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      spass: {
        required: true,
        alphanumeric: true,
		minlength: 6,
		maxlength: 32
      },
	  sconfirm: { equalTo: "#spass"}
    },
    // Specify validation error messages
    messages: {
      sfirst: "Please enter your firstname",
      slast: "Please enter your lastname",
      spass: {
        required: "Please provide a password",
        minlength: "Must be at least 6 characters long"
      },
	  sconfirm: "Must match the password provided above",
      semail: "Please enter a valid email address"
    },
     /**/ onfocusout: function(e) {
      this.element(e);
    }
    ,
	onkeyup: false,
	// Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      //form.submit();
	  //alert("Inside Submit Handler")
	  SignUp();
    }
  });



});
