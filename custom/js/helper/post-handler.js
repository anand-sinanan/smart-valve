function postHandler(url,params,callback) {
   $.ajax({
     type: "POST",
     url: url,
     data: params,
	 timeout: 5000,
	xhrFields: {
	   withCredentials: true
	},
	crossDomain: true,
	//  beforeSend: function (xhr) {
	//	xhr.setRequestHeader('Origin', '54.83.192.126:8089');
	//}, 
	complete: function(data) {
	  //called when complete
	  
	  console.log('process complete');
	},
	error: function(xhr, textStatus, error){
		 
		  UIkit.notify(JSON.parse(xhr.responseText).exception, {pos:'top-center', status:'danger'});
		  //console.log(xhr.statusText);
		  //console.log(textStatus);
		  //console.log(error);
		  
	},
     success: function(data) {
        console.log(data); // predefined logic if any
		
        if(typeof callback == 'function') {
           callback(data);
		   console.log('callback fired')
        }
    }
  });
}