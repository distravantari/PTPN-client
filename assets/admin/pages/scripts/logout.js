function logout(){
	$.ajax({
		 url:'https://ptpn8rancabali.com:8080/handshake',
		 dataType: 'text',
		 method: 'POST',
		 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		 success: function(response){
			 obj = JSON.parse(response);
			 $.ajax({
				url: 'https://ptpn8rancabali.com:8080/logout',
				dataType: 'text',
				method: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				data: {
				session: localStorage.getItem('session'),
					username:localStorage.getItem('username'),
					token:obj.token
				},
				success: function(response){
					obj = JSON.parse(response);
					// alert(obj.message);
					if (obj.message == "Success logout") {
						// form.submit();
						window.location.assign('index.html');
						localStorage.setItem('username','');
						localStorage.setItem('session','');
					}
					window.location.assign('index.html');
				},
				error: function(xhr, status, error){
					alert(error);
				},
				complete: function(){
					window.location.assign('index.html');
				}
			});
		 },
		 error: function(xhr, status, error){
			 alert('error');
		 },
		 complete: function(){
		 }
	 });
}
