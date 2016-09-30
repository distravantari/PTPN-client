domain = 'https://ptpn8rancabali.com:8080';

var Login = function() {

    //generate session
    var sessionGen = function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
              //genereate a session before login
              localStorage.setItem('session',sessionGen());
              $.ajax({
                 url: domain + '/handshake',
                 dataType: 'text',
                 method: 'POST',
                 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                 success: function(response){
                   obj = JSON.parse(response);
                   //obj.token
                     $.ajax({
                      url: domain + '/login',
                      dataType: 'text',
                      method: 'POST',
                      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                      data: {
                        session: localStorage.getItem('session'),
                        username:form.username.value,
                        password:form.password.value,
                        token:obj.token
                      },
                      success: function(response){
                        obj = JSON.parse(response);
                        if (obj.message == "Login success!") {
                          localStorage.setItem('username',form.username.value);
                          form.submit();
                        }else{
                          alert(obj.message);
                         $('.alert-danger', $('.login-form')).show();
                       }
                      },
                      error: function(xhr, status, error){
                        alert(error);
                      },
                      complete: function(){
                      }
                    });
                 },
                 error: function(xhr, status, error){
                   alert(error);
                 },
                 complete: function(){
                 }
               });
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function() {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }

    var handleRegister = function() {

        function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        if (jQuery().select2) {
	        $("#select2_sample4").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            allowClear: true,
	            formatResult: format,
	            formatSelection: format,
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#select2_sample4').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                $('.alert-danger', $('.register-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                // form.submit();
                $.ajax({
                   url: domain + '/handshake',
                   dataType: 'text',
                   method: 'POST',
                   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                   success: function(response){
                     obj = JSON.parse(response);
                     //obj.token
                       $.ajax({
                        url: domain + '/addManager',
                        dataType: 'text',
                        method: 'POST',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        data: {
                          name:form.fullname.value,
                          username:form.username.value,
                          password:form.password.value,
                          credential:form.credential.value,
                          token:obj.token
                        },
                        success: function(response){
                          obj = JSON.parse(response);
                          if (obj.message == "Success add new manager!") {
                            alert(obj.message);
                            window.location.assign('index.html');
                          }else{
                           $('.alert-danger', $('.register-form')).show();
                         }
                        },
                        error: function(xhr, status, error){
                          // alert(error);
                        },
                        complete: function(){
                        }
                      });
                   },
                   error: function(xhr, status, error){
                    //  alert(error);
                   },
                   complete: function(){
                   }
                 });
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();
