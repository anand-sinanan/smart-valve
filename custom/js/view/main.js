



function GetValve() {

			//$('#md').html('<li><div class="uk-alert uk-animation-slide" data-uk-alert><a href="" class="uk-alert-close uk-close"></a><p>Preparing your devices</p></div></li>');
			$('#md').html('<h1 class="uk-text-contrast uk-text-center"><i class="uk-icon-refresh uk-icon-spin"></i><h1>');
		    //setTimeout(function(){}, 5000);
			var url = "http://54.83.192.126:8089/getvalve";
			var params = {};

			// postHandler(url, params, function(data) {
			// 		  	//UIkit.notify("Preparing your devices...", {pos:'top-center', status:'success'});
			// 		 deviceHandler($('#md'), data);
			// 	}
			// );
      var valvelist = [];
      for(var v=0; v<getRandomArbitrary(1,21); v++)
        {
          valvelist[v] = { "valveID" : "000 " + v, "name" : "Valve "+(v+1),  "status" : ((v % 2 == 0) ? "on":"off") };
        }
        deviceHandler($('#md'), valvelist);

        }

function GetUnpairedNodes()
{


			//$('#ud').html('<li><div class="uk-alert uk-animation-slide" data-uk-alert><a href="" class="uk-alert-close uk-close"></a><p>Scanning for unpaired devices</p></div></li>');
			$('#ud').html('<h1 class="uk-text-contrast uk-text-center"><i class="uk-icon-refresh uk-icon-spin"></i><h1>');

			var url = "http://54.83.192.126:8089/listallunpairednodes";
			var params = {};
			// postHandler(url, params, function(data) {
			// 		  	//UIkit.notify("Scanning for unpaired devices...", {pos:'top-center', status:'success'});
      //
      //        unpairedNodeHandler($('#ud'), data);
      //        }
      //     );
      var nodelist = [];
      for(var l=0; l<getRandomArbitrary(1,11); l++)
        {
          nodelist[l] = { "myName" : "Node " + l, "externalIP" : "255.255.255."+(l+2), "internalIP" : "127.0.0."+(l+2), "initializedProperly" : (l % 2 == 0) };
        }
					unpairedNodeHandler($('#ud'), nodelist);





}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function unpairedNodeHandler(target, data)
{
					var user = getUserData();
					var list = "";
					//var nodelist = JSON.parse(data).success;
          var nodelist = data;

					console.log(nodelist);

					  if(nodelist.length > 0)
					  {
						  for(var i=0; i<nodelist.length; i++)
							  list += ("<li><div class='uk-panel uk-panel-box uk-invisible'><h2 class='uk-text-contrast'>"+ nodelist[i].myName +"</h2><p>Ext. IP : "+ nodelist[i].externalIP +"<br>Int. IP : "+ nodelist[i].internalIP +"<br>Initialized : "+ nodelist[i].initializedProperly +"<br><button class=\"uk-button uk-button-primary\"onClick='postHandler(\"http://"+ nodelist[i].internalIP + ":8080/pair\", {\"userid\":\""+user.userID+"\"}, function(data){} )' >Pair</button></p></div></li>");
					  }
					  else
					  {
							list = '<div class="uk-alert uk-animation-slide" data-uk-alert><a href="" class="uk-alert-close uk-close"></a><p>No devices</p></div>'
					  }
					target.html('<ul class="uk-grid uk-grid-small uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-6" data-uk-grid data-uk-scrollspy="{cls: \'uk-animation-fade uk-invisible\', target:\'> li > div\', delay:300, repeat: false}">'+list+'</ul>');

}
function deviceHandler(target, data)
{
					var user = getUserData();
					var list = "";
					//var nodelist = JSON.parse(data).success;
          var nodelist = data;

					console.log(nodelist);

					  if(nodelist.length > 0)
					  {
						  for(var i=0; i<nodelist.length; i++)
						  {
							 var statetext = successOrDanger(nodelist[i].status);

							  var trigger =  "<a id ='"+nodelist[i].valveID +"' name='"+ nodelist[i].name +"' vstate='"+ nodelist[i].status +"' class=\"control uk-text-"+"contrast"+"\"><span> " + nodelist[i].status +"</span><i class=\"uk-icon-toggle-"+nodelist[i].status+" uk-icon-large uk-margin-small-left\"></i></a>";
							  list += ("<li><div class='uk-panel uk-panel-box uk-invisible'><h2 class='uk-text-contrast'>"+ nodelist[i].name +"</h2><p>ID : "+ nodelist[i].valveID +"<br>State : "+ trigger +"<br></p></div></li>");
						  }
					  }
					  else
					  {
							list = '<div class="uk-alert uk-animation-slide" data-uk-alert><a href="" class="uk-alert-close uk-close"></a><p>No devices</p></div>'
					  }
					target.html('<ul class="uk-grid uk-grid-small uk-grid-width-1-2 uk-grid-width-medium-1-3 uk-grid-width-large-1-6" data-uk-grid="{gutter:10}" data-uk-grid-margin data-uk-scrollspy="{cls: \'uk-animation-fade uk-invisible\', target:\'> li > div\', delay:300, repeat: false}">'+list+'</ul>');

}
function successOrDanger(statetext)
{
	var st = "success";
	if(statetext!="on")
	{
		st = "danger";
	}
	return st;
}

function controlValveModal(id, name, state)
{
	//UI is handling switch instead of server (already talked to Ji about this)
	$("#vname").val(name);
	$("#vid").val(id);

	var vs = $('#vstate');
	var fs = "off"; // final state
	var fc = "uk-form-danger"; //final class
	if(state == "off")
	{
			fs = "on";
			fc = "uk-form-success";
	}

	vs.addClass(fc);
	vs.val(fs);

	UIkit.modal("#controlvalve").show();
}

function controlValve()
{
			var url = "http://54.83.192.126:8089/controlvalve";

			var vid = $('#vid').val();
			var vstate = $('#vstate').val();

			var params = {
						valveID: vid,
						status: vstate,
						duration: $('#vduration').val(),
					};
			postHandler(url, params, function(data) {


					  var data = JSON.parse(data);
					  UIkit.modal("#controlvalve").hide();
					  $('#switch')[0].reset();
					  UIkit.notify(data.success, {pos:'top-center', status:'success'});
					  //GetValve();
					  var statetext = successOrDanger(vstate);

					  $("#"+ vid).attr('class', 'uk-text-'+statetext);
					  $("#"+ vid+" i").attr('class', 'uk-icon-toggle-'+vstate+' uk-icon-large uk-margin-small-left');
					  $("#"+ vid+" span").html(vstate);
				}
			);
}

$(document).ready(function() {


 //done to bind click to the injected elements
 $(document).on('click', '.control', function(){ // Make your changes here
        //var id = $(this).attr('id');
		//console.log(e);
		var state = $(this).attr('vstate');
        controlValveModal($(this)[0].id, $(this)[0].name, state);
		console.log("clicked : " + this.id);
    });

//validate valve control form
$('#switch').validate({
		errorPlacement: function(label, element) {
        label.addClass('uk-form-label uk-text-danger uk-text-small uk-animation-fade');
		//label.css('display', 'inline');
		//console.log(element[0].id);
		label.insertAfter($("label[for=" + element[0].id + "]"));
    },
	onkeyup: false,
	// Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      //form.submit();
	  //alert("Inside Submit Handler")
	  UIkit.modal.confirm('Are you sure?', function(){ controlValve(); });
    }
	});

checkStorage();
checkSession();
GetUnpairedNodes();
GetValve();


});
