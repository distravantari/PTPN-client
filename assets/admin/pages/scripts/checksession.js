//checkSession();

function checkSession() {
		$.ajax({
		    url: 'https://188.166.247.55:8080/handshake',
		    dataType: 'text',
		    method: 'POST',
		    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		    success: function(response){
		      obj = JSON.parse(response);
		      //obj.token
					localStorage.setItem('token',obj.token);
				$.ajax({
		         url: 'https://188.166.247.55:8080/getAllEmployee',
		         dataType: 'text',
		         method: 'POST',
		         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		         data: {
		           session: localStorage.getItem('session'),
		           token:obj.token
		         },
		         success: function(response){
		           obj = JSON.parse(response);
		         },
		         error: function(xhr, status, error){
		           //alert(error);
		           window.location.assign('login.html');
		           alert('Session has expired.');
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
		setTimeout("checkSession()", 5000);
}