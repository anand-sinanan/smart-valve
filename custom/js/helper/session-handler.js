function getUserData() {
	return JSON.parse(localStorage.getItem('data')).success;
}

function checkStorage() {
	if (typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
	} else {
		// Sorry! No Web Storage support..
		//UIkit.notify("", {pos:'top-center', status:'danger'});
		var modal = UIkit.modal.blockUI('Your browser does not support key features for this application. Consider upgrading or using a browser that is HTML5 friendly, or try downloading the mobile app!. For further assistance please contact ji.zhengyu@rycom.ca. =)'); 
		throw new Error("No web storage support!");
		//setTimeout(function(){ modal.hide() }, 5000);
	}
}

function checkSession() {
	 var data = JSON.parse(localStorage.getItem('data'));
	 console.log(localStorage);
	 console.log(data);
	 
	 if(data && data.success)	
		UIkit.notify("A man has a face, "+data.success.firstname+" "+data.success.lastname, {pos:'top-center', status:'success'});
	 else
	 {
		 var modal = UIkit.modal.blockUI('Your session seems to have expired. You will be redirected in a few moments. For further assistance please contact ji.zhengyu@rycom.ca. =)'); 
		 setTimeout(function(){ window.location = 'index.html'; }, 5000);
		 throw new Error("Session invalid. Redirecting...");
	 }
}

function endSession() {
			
			var url = "http://54.83.192.126:8089/logout";
			var params = {};
			postHandler(url, params, function(data) {
							
					  
				}
			);
	if(localStorage.data)
	{
		localStorage.removeItem("data");
		UIkit.notify("Session ended", {pos:'top-center', status:'success'});
	}
}
/* $(document).ready(function() {
	checkStorage();
}); */