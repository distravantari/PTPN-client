// checkSession();
//
// function checkSession() {
// 		$.ajax({
// 		    url: 'https://ptpn8rancabali.com:8080/handshake',
// 		    dataType: 'text',
// 		    method: 'POST',
// 		    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
// 		    success: function(response){
// 		      obj = JSON.parse(response);
// 		      //obj.token
// 					localStorage.setItem('token',obj.token);
// 				$.ajax({
// 		         url: 'https://ptpn8rancabali.com:8080/checkSession',
// 		         dataType: 'text',
// 		         method: 'POST',
// 		         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
// 		         data: {
// 		           session: localStorage.getItem('session'),
// 		           token:obj.token
// 		         },
// 		         success: function(response){
// 		           obj = JSON.parse(response);
// 		           if (obj.message == "Invalid session") {
// 		           		window.location.assign('login.html');
// 		           		alert('Session has expired.');
// 		           }
// 		         },
// 		         error: function(xhr, status, error){
// 		           //alert(error);
// 		           window.location.assign('login.html');
// 		           alert('Session has expired.');
// 		         },
// 		         complete: function(){
// 		         }
// 		       });
// 		    },
// 		    error: function(xhr, status, error){
// 		      alert(error);
// 		    },
// 		    complete: function(){
// 		    }
// 		});
// 		setTimeout("checkSession()", 300000);
// }
