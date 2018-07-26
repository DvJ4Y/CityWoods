function getBarGraph() {
	  
    
   // alert("1111111111111");

    getPerYearSaplingCount();
    
    getTotalCorporateCount();
    //alert("222222222222222222222");

	  
    //deleted for now. will make changes once plantation category is finished.
    //populateCity();
    

    
    
    
  }



function addSaplingChallengeUser(){
	
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=addSaplingChallengeCount",
		cache: false,
		success: function(result){
			
			// document.getElementById("totalCorporateCountDiv").innerHTML = result;
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});

}


function addDonationDetails(){
	
	
	
	//var date = $("#donationDate").val();
	//var month = $("#donationMonth").val();
	//var year = $("#donationYear").val();
	var year = $("#donationYear").val();
	var email = $("#donationEmail").val();
	var donorType = $("#donationDonorType").val();
	var donorCorpName = $("#donationCorporate").val();
	var donorIndName = $("#donationIndividual").val();
	var amount = $("#donationAmount").val();
	var saplingCount = $("#donationNumbSaplings").val();
	var location = $("#donationLocation").val();
	var mode = $("#donationMode").val();
	var transactionDetails = $("#donationTransactionDetails").val();
	var isPending = document.querySelector('input[name=optionsRadios]:checked').value;
	
	//alert("hiiiiiiii");
	
	
	
	// Returns successful data submission message when the entered information is stored in database.
	if(donorType==''||amount==''||transactionDetails==''||isPending==''||year=='')
	{
		//alert("Please Fill All Fields");
		document.getElementById("txtHintDonation").innerHTML = 'Please fill necessary fields';
	}
	else
	{
		
		
		var dataString = '&donorType='+ donorType 
						+ '&donorCorpName='+ donorCorpName + '&donorIndName='+ donorIndName + '&amount='+ amount + '&saplingCount='+ saplingCount
						+ '&location='+ location + '&mode='+ mode + '&transactionDetails='+ transactionDetails + '&isPending='+ isPending+ '&email='+ email + '&year='+ year;
		
		
		
		//alert(dataString);
		
		$.ajax({
		type: "POST",
		url: "http://saytrees.org/php/Controller.php?action=addDonationDetails",
		data: dataString,
		cache: false,
		success: function(result){
			//alert(result);
			 document.getElementById("txtHintDonation").innerHTML = result;
		}
		});
	}
	
	
	
	document.getElementById("donationDonorType").selectedIndex = 0; 
	document.getElementById("donationIndividual").value = ""; 
	document.getElementById("donationCorporate").selectedIndex = 0; 
	
	
}


function createCanvas(divName) {
	
	var div = document.getElementById(divName);
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	if (typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}	
	var ctx = canvas.getContext("2d");
	return ctx;
}





function  getPerYearSaplingCount(){
	
	
	
	

	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getYWSaplingCount",
		cache: false,
		success: function(result){
			//alert("SUCCSSSSSSSSSS99999999999999999");
			//alert(result);
		
			//document.getElementById("totalSaplingCountDiv").innerHTML = result;
			
			var obj = JSON.parse(result);
			

			
			var xValue = obj[1];

			var yValue = obj[0];
			var vValue = obj[2];

			var trace1 = {
			  x: xValue,
			  y: yValue,
			  type: 'bar',
			  text: ['saplings', 'saplings', 'saplings', 'saplings', 'saplings', 'saplings', 'saplings', 'saplings'],
			  marker: {
			    color: 'rgb(121,121,121)',
			    opacity: 0.6,
			    line: {
			      color: 'rbg(26,226,78)',
			      width: 1.5
			    }
			  }
			};

			var annotationContent = [];
			var totSaplingCount=parseInt(0);
			var totVolunteerCount=parseInt(0);
			data = [trace1];

			layout = {
			  title: 'Saplings planted every year[1 April - 31 March]',
			  annotations: annotationContent
			};

			for( var i = 0 ; i < xValue.length ; i++ ){
				
				totSaplingCount+=parseInt(yValue[i]);
				totVolunteerCount+=parseInt(vValue[i]);
				
			  var result = {
			    x: xValue[i],
			    y: yValue[i],
			    text: yValue[i],
			    xanchor: 'center',
			    yanchor: 'bottom',
			    showarrow: false
			  };
			  annotationContent.push(result);
			}

			Plotly.newPlot('myDiv', data, layout);
			
			
			
			
			document.getElementById("totalSaplingCountDiv").innerHTML = totSaplingCount;
			document.getElementById("totalVolunteerCountDiv").innerHTML = totVolunteerCount;
			
			
			
			
			
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});
	
	
	
	
}



function getAlreadyPlantedFarmersDetails(){
	
	
	
	

	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getAlreadyPlantedFarmersDetails",
		cache: false,
		success: function(result){
			
			var arr = result.split("%");
			var totalSaplingCount = 0;
			
			for(var i = 0; i < arr.length-1; i++) {
				var inner = arr[i].split("~");

				
				
				
		          var lat = inner[2];
		          var lng = inner[3];
		          var address = inner[4];
		          var species = inner[5];
		          var farmerId = inner[6];
		          var farmerDesc = inner[7];
		          
		          var latlng = new google.maps.LatLng(lat,lng);
		          
		          var label = inner[0]; 
		          var saplingCount = inner[1];
		          totalSaplingCount = Number(totalSaplingCount) + Number(saplingCount);
		          
		          var html = "<table style=\"height:300px;width:600px;\">" +
	          		"<tr>" +
	          			"<td><img src = \"http://www.saytrees.org/farmerProject/images/mapThumbnails/"+farmerId+".jpg\" /></td>" +
	          			"<td style=\"padding-left:5%;\">" +
	          				"<table style=\"width:90%;\">" +
	          					"<tr>" +
	          						"<td><b>Farmer's Name</b></td>" +
	          						"<td>"+label+"</td>" +
	          					"</tr>" +
	          					"<tr>" +
	          						"<td><b>Sapling Count</b></td>" +
	          						"<td>"+saplingCount+"</td>" +
	          					"</tr>" +
	          					"<tr>" +
	          						"<td><b>Location</b></td>" +
	          						"<td>"+address+"</td>" +
	          					"</tr>" +
	          					"<tr>" +
	          						"<td><b>Sapling species</b></td>" +
	          						"<td>"+species+"</td>" +
	          					"</tr>" +
	          					"</tr>" +
		          					"<tr>" +
	          						"<td colspan=2>&nbsp;</td>" +
	          					"</tr>" +
	          					"<tr>" +
	          						"<td colspan=2>"+farmerDesc+"</td>" +
	          					"</tr>" +
		          					"<tr>" +
	          						"<td colspan=2>&nbsp;</td>" +
	          					"</tr>" +
	          					"<tr>" +
	          						"<td colspan=2 style=\"text-align:center;\"></td>" +
	          					"</tr>" +
	          				"</table>" +
	          			"</td>" +
	          		"</tr>" +
	          	"</table>";
		          
		          
		          var icons = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
		          // create the marker
		          var marker = new google.maps.Marker({
		           position: latlng,
		           map: map,
		           icon: icons,
			   contentStr: html,
		           zIndex: Math.round(latlng.lat()*-100000)<<5
		          });

		          google.maps.event.addListener(marker, 'click', function() {
		            infowindow.setContent(this.contentStr); 
		            infowindow.open(map,this);
		          });
		          // save the info we need to use later for the side_bar
		          rmarkers.push(marker);
		          // add a line to the side_bar html
		          right_side_bar_html += '<li><div class="farmerDetailDiv"><a href="javascript:myclickright(' + (rmarkers.length-1) + ')"><b>' + label + '</b><br>'+saplingCount+' saplings <br>'+address+'<\/a></li></div>';
		        //}
		        // put the assembled side_bar_html contents into the side_bar div
		        
		    
		        
				
			}
			document.getElementById("right_side_bar").innerHTML = '<ul>'+right_side_bar_html+'</ul>';
		    document.getElementById("alreadyPlantedTotalSaplingCount").innerHTML = totalSaplingCount;
	        document.getElementById("alreadyPlantedTotalFarmerCount").innerHTML = arr.length-1;

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        			
	    }
		});
	
	
	
	
	
}




function getFarmersDetails(){
	
	
	
	$.ajax({
		type: "GET",
		url: "http://farmer.saytrees.org/php/Controller.php?action=getFarmersDetails",
		cache: false,
		success: function(result){
			
			var arr = result.split("%");
			var totalSaplingCount = 0;
			var barChartDetails = [];
			
			for(var i = 0; i < arr.length-1; i++) {
				var inner = arr[i].split("~");

				
				
				  var saplingCount = inner[1];
		          var lat = inner[2];
		          var lng = inner[3];
		          var address = inner[4];
		          var species = inner[5];
		          var farmerId = inner[6];
		          var farmerDesc = inner[7];
		          var saplingsAlreadyPlanted = inner[8];
		          var remainingsapling = saplingCount-saplingsAlreadyPlanted;
		          
		          totalSaplingCount = Number(totalSaplingCount) + Number(remainingsapling);
		          
		          var latlng = new google.maps.LatLng(lat,lng);
		          var label = inner[0];
		          var html = "<table style=\"height:300px;width:600px;\">" +
				          		"<tr>" +
				          			"<td width=\"55%\"><img src = \"http://farmer.saytrees.org/images/mapThumbnails/"+farmerId+".jpg\" /></td>" +
				          			"<td width=\"45%\">" +
				          				"<table style=\"width:99%;\">" +
				          					"<tr>" +
				          						"<td><b>Farmer's Name</b></td>" +
				          						"<td>"+label+"</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td><b>Sapling Count</b></td>" +
				          						"<td>"+saplingCount+"</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td><b>Location</b></td>" +
				          						"<td>"+address+"</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td><b>Sapling species</b></td>" +
				          						"<td>"+species+"</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td style=\"color:#00a65a\"><b>Saplings sponsored</b></td>" +
				          						"<td>"+saplingsAlreadyPlanted+"</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td style=\"color: #f56954\"><b>Sapling remaining</b></td>" +
				          						"<td>"+remainingsapling+"</td>" +
				          					"</tr>" +
				          					
				          					"<tr>" +
				          						"<td colspan=2>"+farmerDesc+"</td>" +
				          					"</tr>" +
					          					"<tr>" +
				          						"<td colspan=2>&nbsp;</td>" +
				          					"</tr>" +
				          					"<tr>" +
				          						"<td colspan=2 style=\"text-align:center;\"><a class=\"fancybox fancybox.iframe\" href=\"../../FarmerDonate.php?remsapling="+remainingsapling+"&farmerId="+farmerId+"\"><button class=\"purchase-btn btn-xl\">Support</button></a></td>" +
				          					"</tr>" +
				          				"</table>" +
				          			"</td>" +
				          		"</tr>" +
				          	"</table>";
		          
		          var icons = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
		          // create the marker
		          var marker = new google.maps.Marker({
		           position: latlng,
		           map: map,
		           icon: icons,
			   contentStr: html,
		           zIndex: Math.round(latlng.lat()*-100000)<<5
		          });

		          google.maps.event.addListener(marker, 'click', function() {
		            infowindow.setContent(this.contentStr); 
		            infowindow.open(map,this);
		          });
		          // save the info we need to use later for the side_bar
		          gmarkers.push(marker);
		          // add a line to the side_bar html
		          
		          
		          var plantedPercent = (saplingsAlreadyPlanted/saplingCount)*100;
		          
		         var remainingPercent = (100-plantedPercent);
		          
		         /* side_bar_html += '<div class="row" style="margin:0px">'+
										'<div class="col-lg-12">'+
											'<div class="col-md-7 col-sm-7"  style="padding:0px">'+
												'<a href="javascript:myclick(' + (gmarkers.length-1) + ')"><b>' + label + '</b><br>'+saplingCount+' saplings <br>'+address+'<\/a>'+
											'</div>'+
											'<div class="col-md-5 col-sm-5"  style="padding:0px; height:75px;" id="farmerStatus'+i+'">'+
												'<div title="'+remainingsapling+' saplings remaining"  style="float: left; height: '+remainingPercent+'%;width:80px;background-color: #f56954">&nbsp;</div><div title="'+saplingsAlreadyPlanted+' saplings sponsored" style="float: left; height: '+plantedPercent+'%;width:80px;background-color: #00a65a">&nbsp;</div>'+
											'</div>'+
										'</div>'+
									'</div><hr>';*/
				
		          //side_bar_html += '<div> <div  style="float: left;">'+'<a href="javascript:myclick(' + (gmarkers.length-1) + ')"><b>' + label + '</b><br>'+saplingCount+' saplings <br>'+address+'<\/a>'+'</div><div id="farmerStatus">kokokok</div></div><hr>';
		          side_bar_html += '<li><div class="farmerDetailDiv"><a href="javascript:myclick(' + (gmarkers.length-1) + ')"><b>' + label + '</b><br>'+saplingCount+' saplings <br>'+address+'<\/a></div><div class="farmerChartDiv"><canvas id="farmerChart-'+farmerId+'" width="80" height="80" title="'+remainingsapling+' saplings remaining. '+saplingsAlreadyPlanted+' saplings sponsored"	></canvas></div></li>';
		        // side_bar_html += '<li><div class="farmerDetailDiv"><a href="javascript:myclick(' + (gmarkers.length-1) + ')"><b>' + label + '</b><br>'+saplingCount+' saplings <br>'+address+'<\/a></div><div class="farmerChartDiv"> <script>setTimeout(drawChart(farmerChart-'+farmerId+', '+saplingsAlreadyPlanted+', '+remainingsapling+'), 10000);</script><canvas id="farmerChart-'+farmerId+'" width="100" height="100" title="'+remainingsapling+' saplings remaining. '+saplingsAlreadyPlanted+' saplings sponsored"></canvas></div></li>';
		          
		          barChartDetails.push( "farmerChart-"+farmerId );
		          barChartDetails.push( saplingsAlreadyPlanted );
		          barChartDetails.push( remainingsapling );
		          
		          //}
		        // put the assembled side_bar_html contents into the side_bar div
		          //<canvas id="can" width="200" height="200"></canvas>
		         // drawChart("farmerChart-"+farmerId, saplingsAlreadyPlanted, remainingsapling);
		          
		          
			}
			
			//var divPrepend = '<div id="wrap"><ul id="mycarousel" class="jcarousel-skin-tango">';
			//var divPostpend = '</ul></div>';
			
			//document.getElementById("side_bar").innerHTML = divPrepend + side_bar_html + divPostpend;
			
			document.getElementById("side_bar").innerHTML = '<ul>'+side_bar_html+'</ul>'; 
			
//			var myDiv = document.createElement('ul');
//			myDiv.id = 'myUL';
//			myDiv.innerHTML = side_bar_html;
//			document.getElementById('side_bar').appendChild(myDiv);
//			
			//document.getElementById('myUL').innerHTML="hihihih";
			//document.getElementById('myUL').innerHTML="hihihih";
			document.getElementById("toBePlantedTotalSaplingCount").innerHTML = totalSaplingCount;
	        document.getElementById("toBePlantedTotalFarmerCount").innerHTML = arr.length-1;
			
			for(var i = 0; i < barChartDetails.length-1; i+=3) {
			
				drawChart(barChartDetails[i], Number(barChartDetails[i+1]), Number(barChartDetails[i+2]));
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});

}





function updateFarmerDB(farmerId, saplingCount)
{
	
	var farmer_id = farmerId;
	var sapling_count = saplingCount;

	// Returns successful data submission message when the entered information is stored in database.
	var dataString = 'farmerId='+ farmer_id + '&saplingCount='+ sapling_count;
	
	
	
	$.ajax({
		type: "POST",
		url: "http://saytrees.org/php/Controller.php?action=updateFarmerDB",
		data: dataString,
		cache: false,
		success: function(result){
			//alert(result);
			// document.getElementById("txtHint").innerHTML = result;

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	       // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});


}










function getTotalSaplingCountForSaplingChallenge(){
	
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getSaplingCountForSaplingChallenge",
		cache: false,
		success: function(result){
					
			 document.getElementById("totalSaplingCountForSaplingChallengeDiv").innerHTML = result;

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});

}


function getTotalCorporateCount(){
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getCorpCount",
		cache: false,
		success: function(result){
			
			 document.getElementById("totalCorporateCountDiv").innerHTML = result;

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	        
	    }
		});

}






/*  window.onload = function () {
	  
 
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Saplings planted every year"    
      },
      animationEnabled: true,
      axisY: {
        title: "Sapling Count"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      theme: "theme2",
      data: [

      {        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "Year",
        dataPoints: [      
        {y: 100, label: "2008"},
        {y: 100,  label: "2009" },
        {y: 600,  label: "2010"},
        {y: 1140,  label: "2011"},
        {y: 2130,  label: "2012"},
        {y: 3831, label: "2013"},
        {y: 10324,  label: "2014"},        
        {y: 20968,  label: "2015"}        
        ]
      }   
      ]
    });

    chart.render();
  }*/






/*
window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text:"Cost Of Pancake Ingredients, 2011"
		},
                animationEnabled: true,
		axisX:{
			interval: 1,
			labelFontSize: 10,
			lineThickness: 0
		},
		axisY2:{
			valueFormatString: " 0",
			lineThickness: 0				
		},
		toolTip: {
			shared: true
		},
		legend:{
			verticalAlign: "top",
			horizontalAlign: "center"
		},

		data: [
		
		{
			type: "stackedBar",
			showInLegend: true,
			name: "Saplings",
			axisYType: "secondary",
			color:"#27AE01",
			indexLabel: "$#total",
			dataPoints: [
				{y: 2, label: "India" },
				{y: 3, label: "US" },
				{y: 6, label: "Germany"   },			
				{y: 4, label: "Brazil"  },			
				{y: 4, label: "China"  },
				{y: 8, label: "Australia"  },
				{y: 8, label: "France"  },
				{y: 8, label: "Italy"  },
				{y: 4, label: "Singapore"  },
				{y: 11, label: "Switzerland"  },
				{y: 6, label: "Japan"  }
			]
		}
		]
		});
	chart.render();
}*/







function addLocation() {
										
	//alert('hhihihi');
	
	var location = $("#location").val();
	var area = $("#area").val();
	var city = $("#addLocationCity").val();
	var latitude = $("#latitude").val();
	var longitude = $("#longitude").val();
	var plantationType = $("#plantationType").val();
	
	// Returns successful data submission message when the entered information is stored in database.
	var dataString = 'location1='+ location + '&area1='+ area + '&city1='+ city + '&latitude1='+ latitude+ '&longitude1='+ longitude + '&plantationType='+plantationType;
	if(location==''||area==''||city==''||plantationType=='')
	{
		//alert("Please Fill All Fields");
		document.getElementById("txtHint").innerHTML = 'Please fill all fields';
	}
	else
	{
		//alert("Calling php");
		$.ajax({
		type: "POST",
		url: "http://saytrees.org/php/Controller.php?action=addlocation",
		data: dataString,
		cache: false,
		success: function(result){
			//alert(result);
			 document.getElementById("txtHint").innerHTML = result;
			 
	
			 
		}
		});
	}
   
}





function addCorporate() {
	//alert('hhihihi');
	var type = $("#donorType").val();
	var corpname = $("#corpName").val();
	//var area = $("#corpAdd").val();
	var city = $("#corpCity").val();
	//var state = $("#corpState").val();
	//var country = $("#corpCountry").val();
	// Returns successful data submission message when the entered information is stored in database.
	var dataString = 'corpname1='+ corpname + '&city1='+ city + '&type='+ type;
	if(corpname==''||type=='')
	{
		//alert("Please Fill All Fields");
		document.getElementById("txtHintCorporate").innerHTML = 'Please fill all fields';
	}
	else
	{
	//alert(type);
	$.ajax({
	type: "POST",
	url: "http://saytrees.org/php/Controller.php?action=addcorporate",
	data: dataString,
	cache: false,
	success: function(result){
		//alert(result);
		 document.getElementById("txtHintCorporate").innerHTML = result;
	}
	});
	}
   
}





function addExpense() {
	//alert('hhihihi');
	
	
	
	var date = $("#expenseDate").val();
	var month = $("#expenseMonth").val();
	var year = $("#expenseYear").val();
	var cat = $("#expenseCat").val();
	var subCat = $("#expenseSubCat").val();
	var location = $("#expenseLocation").val();
	var desc = $("#expenseDesc").val();
	var amt = $("#expenseAmt").val();
	var mode = $("#expenseMode").val();
	var city = $("#expenseCity").val();
	
	
	
	
	
	// Returns successful data submission message when the entered information is stored in database.
	if(date==''||month==''||year==''||cat==''||subCat==''||desc==''||amt==''||mode==''||city=='')
	{
		//alert("Please Fill All Fields");
		document.getElementById("txtHintExpense").innerHTML = 'Please fill all fields';
	}
	else
	{
		var dataString = 'date='+ date +'&month='+month+'&year='+ year + '&cat='+ cat 
						+ '&subCat='+ subCat + '&location='+ location + '&desc='+ desc
						+ '&amt='+ amt + '&mode='+ mode + '&city='+ city;
		
		
		
		
		$.ajax({
		type: "POST",
		url: "http://saytrees.org/php/Controller.php?action=addExpenseDetails",
		data: dataString,
		cache: false,
		success: function(result){
			//alert(result);
			 document.getElementById("txtHintExpense").innerHTML = result;
		}
		});
	}
	
	
	
	
	
	
	
	

   
}


function getYearWisePlantationDetails(){
	
	var plantationYear = $("#plantationYear").val();
	
	
	
}



function addPlantation(){
	
	
	var plantationDate = $("#plantationDate").val();
	var plantationMonth = $("#plantationMonth").val();
	var plantationYear = $("#plantationYear").val();
	var numbSaplings = $("#numbSaplings").val();
	var numbVolunteers = $("#numbVolunteers").val();
	var plantationCorporate = $("#plantationCorporate").val();
	var plantationLocation = $("#plantationLocation").val();
	var plantationSpecies = $("#plantationSpecies").val();
	var plantationComment = $("#plantationComment").val();
	
	
	
	
	// Returns successful data submission message when the entered information is stored in database.
	if(plantationDate==''||plantationMonth==''||plantationYear==''||numbSaplings==''|| plantationSpecies==''||plantationComment=='')
	{
		//alert("Please Fill All Fields");
		document.getElementById("txtHintPlantation").innerHTML = 'Please fill all fields';
	}
	else
	{
		var dataString = 'plantationDate='+ plantationDate +'&plantationMonth='+plantationMonth+'&plantationYear='+ plantationYear + '&numbSaplings='+ numbSaplings 
						+ '&numbVolunteers='+ numbVolunteers + '&plantationCorporate='+ plantationCorporate + '&plantationLocation='+ plantationLocation
						+ '&plantationSpecies='+ plantationSpecies + '&plantationComment='+ plantationComment;
		
		
		
		
		$.ajax({
		type: "POST",
		url: "http://saytrees.org/php/Controller.php?action=addPlantationDetails",
		data: dataString,
		cache: false,
		success: function(result){
			//alert(result);
			 document.getElementById("txtHintPlantation").innerHTML = result;
		}
		});
	}
	
	
}




function populateDonationSelectBoxes(){
	
	
	 var year = (new Date()).getFullYear();
	 var date = document.getElementById("donationDate");
	 var option = null, next_year = null;
	 
	    for(var i = 1; i <= 31; i++) {
	        option = new Option( i, i );
	        date.appendChild(option);
	    }
	    
	    
	    var monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    var month = document.getElementById("donationMonth");
	    for(var i = 1; i <= 12; i++) {
	        option = new Option( i+" ("+monthText[i-1]+")", i );
	        month.appendChild(option);
	    }
	
	    
	    
	    var month = document.getElementById("donationYear");
	    for(var i = year; i <= year+2; i++) {
	        option = new Option( i, i );
	        month.appendChild(option);
	    }
	    
	    
	    
	    
	    

	
}


function populateExpenseSelectBoxes(){
	
	
	 var year = (new Date()).getFullYear();
	 var date = document.getElementById("expenseDate");
	 var option = null, next_year = null;
	 
	    for(var i = 1; i <= 31; i++) {
	        option = new Option( i, i );
	        date.appendChild(option);
	    }
	    
	    
	    var monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    var month = document.getElementById("expenseMonth");
	    for(var i = 1; i <= 12; i++) {
	        option = new Option( i+" ("+monthText[i-1]+")", i );
	        month.appendChild(option);
	    }
	
	    
	    
	    var month = document.getElementById("expenseYear");
	    for(var i = year; i <= year+2; i++) {
	        option = new Option( i, i );
	        month.appendChild(option);
	    }
	    
	    
	   /* 
	    var cities = ["Bangalore", "Belgavi", "Gurgaon", "Hyderabad", "Delhi", "Tekulodu", "Anantapur"]; 
	   
	    
	    
	    var expenseCity = document.getElementById("expenseCity");
	   
	    for(var i = 0; i < cities.length; i++) {
	    	
	    	option = new Option( cities[i], cities[i] );
	    	expenseCity.appendChild(option);
	    	
	    }
	    
	    */
	    
	    
	    populateExpenseBoxes();
	   
	    

	
}

function populateTransactionMode(selectBoxName){
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getTransactionModes",
		cache: false,
		success: function(result){
			//alert(result);
			var option = null;
			var expenseMode = document.getElementById(selectBoxName);
			
	        var len2 = expenseMode.length;
	        for (var i=len2; i>1; i--) {
	        	expenseMode.removeChild( expenseMode[i-1] );
	        }
	        
	        

			var arr = result.split("%");
			for(var i = 0; i < arr.length; i++) {
				var inner = arr[i].split(",");

				option = new Option(  inner[1], inner[0] );
				expenseMode.appendChild(option);
			//alert(inner[1]);
			}
			
	        
			

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("EXPENSE - Status: " + textStatus); alert("EXPENSE - Error: " + errorThrown); 
	    } 
		});
	
	
	
	
	
	
	
	
	
	
	
}


function populateExpenseBoxes()
{
	

	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getExpenseSelectBoxesEntries",
		cache: false,
		success: function(result){
			//alert(result);
			var option = null;
			var expenseCategory = document.getElementById("expenseCat");
			var expenseSubCategory = document.getElementById("expenseSubCat");
			//var expenseMode = document.getElementById("expenseMode");
			
			var len = expenseCategory.length;
	        for (var i=len; i>1; i--) {
	        	expenseCategory.removeChild( expenseCategory[i-1] );
	        }
	        
	        var len1 = expenseSubCategory.length;
	        for (var i=len1; i>1; i--) {
	        	expenseSubCategory.removeChild( expenseSubCategory[i-1] );
	        }
	        
	      /*  var len2 = expenseMode.length;
	        for (var i=len2; i>1; i--) {
	        	expenseMode.removeChild( expenseMode[i-1] );
	      } */ 
	        
	        
	        var allArr = result.split("@");
	        for(var j = 0; j < allArr.length; j++) {
	        	

				var arr = allArr[j].split("%");
				for(var i = 0; i < arr.length; i++) {
					var inner = arr[i].split(",");

					option = new Option(  inner[1], inner[0] );
					
					if(j == 0){
						expenseCategory.appendChild(option);	
					}else if(j == 1){
						expenseSubCategory.appendChild(option);
					}
					//else{
						//expenseMode.appendChild(option);
					//}
					
				//alert(inner[1]);
				}
	        	
	        }
	        
			

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("EXPENSE - Status: " + textStatus); alert("EXPENSE - Error: " + errorThrown); 
	    } 
		});

}



function populateSelectBoxes(){
	
	
	 var year = (new Date()).getFullYear();
	 var date = document.getElementById("plantationDate");
	 var option = null, next_year = null;
	 
	    for(var i = 1; i <= 31; i++) {
	        option = new Option( i, i );
	        date.appendChild(option);
	    }
	    
	    
	    var monthText = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    var month = document.getElementById("plantationMonth");
	    for(var i = 1; i <= 12; i++) {
	        option = new Option( i+" ("+monthText[i-1]+")", i );
	        month.appendChild(option);
	    }
	
	    
	    
	    var month = document.getElementById("plantationYear");
	    for(var i = year; i <= year+2; i++) {
	        option = new Option( i, i );
	        month.appendChild(option);
	    }
	
	    
	  /*  var cities = ["Bangalore", "Belgavi", "Gurgaon", "Hyderabad", "Delhi", "Tekulodu", "Anantapur"]; 
	    var states = ["Karnataka", "Haryana", "Andhra Pradesh", "Delhi"];
	    
	    
	    
	    var locationCity = document.getElementById("city");
	    var corporateCity = document.getElementById("corpCity");
	    for(var i = 0; i < cities.length; i++) {
	    	
	    	option = new Option( cities[i], cities[i] );
	    	locationCity.appendChild(option);
	    	
	    	option = new Option( cities[i], cities[i] );
	    	corporateCity.appendChild(option);
	    }
	    
	    
	    var locationState = document.getElementById("state");
	    var corporateState = document.getElementById("corpState");
	    for(var i = 0; i < states.length; i++) {
	    	
	    	option = new Option( states[i], states[i] );
	    	locationState.appendChild(option);
	    	
	    	option = new Option( states[i], states[i] );
	    	corporateState.appendChild(option);
	    }*/
	    
	    
	    
	  //  alert("AJAX CALLING");
	    

	   // populateCorporate();
		
	    // populateLocation();
	
	    
	    populatePlantationDetails();
	
	
}



function populateCorporate(selectBoxName){
	
	
	$.ajax({
	type: "GET",
	url: "http://saytrees.org/php/Controller.php?action=getCorpForSelect",
	cache: false,
	success: function(result){
		var option = null;
		var plantationCorp = document.getElementById(selectBoxName);

			var len = plantationCorp.length;
	        for (var i=len; i>1; i--) {
	        	plantationCorp.removeChild( plantationCorp[i-1] );
	        }
		
		
		
		
		var arr = result.split("%");
		for(var i = 0; i < arr.length; i++) {
			var inner = arr[i].split(",");

			option = new Option(  inner[1], inner[0] );
			plantationCorp.appendChild(option);
		//alert(inner[1]);
		}
		
		
		
		
		
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("CORPORATE - Status: " + textStatus); alert("CORPORATE - Error: " + errorThrown); 
    } 
	});
	
	
}


function populatePlantationType(plantationTypeSB){
	
	
	$.ajax({
	type: "GET",
	url: "http://saytrees.org/php/Controller.php?action=getPlantationTypes",
	cache: false,
	success: function(result){
		var option = null;
		var expenseCity = document.getElementById(plantationTypeSB);

			var len = expenseCity.length;
	        for (var i=len; i>1; i--) {
	        	expenseCity.removeChild( expenseCity[i-1] );
	        }
		
		
		
		
		var arr = result.split("%");
		for(var i = 0; i < arr.length; i++) {
			var inner = arr[i].split(",");

			option = new Option(  inner[1], inner[0] );
			expenseCity.appendChild(option);
		//alert(inner[1]);
		}
		
		
		
		
		
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("CORPORATE - Status: " + textStatus); alert("CORPORATE - Error: " + errorThrown); 
    } 
	});
	
	

	
	
}


function populateCity(selectBoxName){
	
	
	$.ajax({
	type: "GET",
	url: "http://saytrees.org/php/Controller.php?action=getCityForSelectBoxes",
	cache: false,
	success: function(result){
		var option = null;
		var expenseCity = document.getElementById(selectBoxName);

			var len = expenseCity.length;
	        for (var i=len; i>1; i--) {
	        	expenseCity.removeChild( expenseCity[i-1] );
	        }
		
		
		
		
		var arr = result.split("%");
		for(var i = 0; i < arr.length; i++) {
			var inner = arr[i].split(",");

			option = new Option(  inner[1], inner[0] );
			expenseCity.appendChild(option);
		//alert(inner[1]);
		}
		
		
		
		
		
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("CORPORATE - Status: " + textStatus); alert("CORPORATE - Error: " + errorThrown); 
    } 
	});
	
	
}





function populateLocation(selectBoxName){
	
	
	
	//alert("tttttttttttttttttt");
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getLocForSelect",
		cache: false,
		success: function(result1){
			//alert("opopopopo");
			var option = null;
			var plantationLoc = document.getElementById(selectBoxName);

		
			var len = plantationLoc.length;
	        for (var i=len; i>1; i--) {
	        	plantationLoc.removeChild( plantationLoc[i-1] );
	        }

			
			var arr = result1.split("%");
		//	alert(arr);
			for(var i = 0; i < arr.length; i++) {
				var inner = arr[i].split(",");
			//alert(inner);
				option = new Option(  inner[1].concat(", ", inner[2], ",", inner[3]), inner[0] );
				plantationLoc.appendChild(option);
			  // alert(inner[1].concat(", ", inner[2], ",", inner[3]));
			}
			
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("LOCATION - Status: " + textStatus); alert("LOCATION - Error: " + errorThrown); 
	    }
		});
	
	
	
	//alert("ssssssssssssssssssss");
	
}


function populatePlantationDetails(){
	
	var yearOfPlantation = $("#yearOfPlantation").val();
	
	var dataString = 'yearOfPlantation='+ yearOfPlantation;
	
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getPlantationDetails",
		data: dataString,
		cache: false,
		success: function(result){
			//alert("SUCCCSSSSSSSSSSSSSSSSSSS");
		
			document.getElementById("plantationHomeTable").innerHTML = result;
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	    }
		});
	
	
	
	
	
}


function populateExpenseDetails(){
	
	$.ajax({
		type: "GET",
		url: "http://saytrees.org/php/Controller.php?action=getExpenseDetails",
		cache: false,
		success: function(result){

			document.getElementById("ExpenseDetailsTable").innerHTML = result;
		
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	    }
		});
	
	
	
	
}



function showDonorType(){
	
	var donorType = document.getElementById("donationDonorType");
	
     
	if(donorType.value == "Corporate")
	{
		document.getElementById("donorIndividual").style.display = 'none';
		document.getElementById("donorCorporate").style.display = 'block';
		
	}else{
		document.getElementById("donorCorporate").style.display = 'none';
		document.getElementById("donorIndividual").style.display = 'block';
	}
	
	
}
























function loadTrackingDetails(){
	//alert("hiiii 2222");
	//alert("tracking id = "+trackingId);
	
	showGoogleMaps();
	
}

function showGoogleMaps() {

//alert("hiiii 1111");
//alert("tracking id in second function = "+trackingId);






$.ajax({
	type: "GET",
	url: "http://saytrees.org/php/Controller.php?action=getLocationForMap",
	cache: false,
	success: function(result){
		
		
        var mapCenterPosition = [12.988085, 77.592479];
     
        
        var isDraggable = screen.width > 480 ? true : false;
     
        var mapOptions = {
            zoom: 11, // initialize zoom level - the max value is 21
            streetViewControl: false, // hide the yellow Street View pegman
            scaleControl: true, // allow users to zoom the Google Map
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: isDraggable,
            scrollwheel: false,
            center: new google.maps.LatLng(mapCenterPosition[0], mapCenterPosition[1])

        };
     
        map = new google.maps.Map(document.getElementById('googlemaps'),
            mapOptions);
		
    	var infowindow = new google.maps.InfoWindow(
    			  { 
    			    size: new google.maps.Size(150,50)
    			  });
		
		
		var arr = result.split("%");
		
		for(var i = 0; i < arr.length; i++) {

		
		
		var inner = arr[i].split("~");
		

          var latitude = inner[0];
          var longitude = inner[1];
          var sapCount = inner[2];
          var address = inner[3];

          
          //alert("latitude = " + latitude);
          //alert("longitude = " + longitude);
          
       // The latitude and longitude of your business / place
          var position = [latitude, longitude];
      	
          
          var latLng = new google.maps.LatLng(position[0], position[1]);
          

       
          var html = "<table style=\"height:150px;width:200px;\">" +
      		"<tr>" +
      			"<td width=\"100%\">Sapling Count : <b>"+sapCount+"</b> <br> Address : <b>"+address+"</b></td>" +

      		"</tr>" +
      	"</table>";
      	
      
      	var icons = "http://maps.google.com/mapfiles/kml/shapes/parks.png";
          
          // Show the default red marker at the location
          var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              draggable: false,
              icon: icons,
              contentStr: html,
              animation: google.maps.Animation.DROP
          });
          
          
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(this.contentStr); 
              infowindow.open(map,this);
            });
          
          
          //alert("hiiii 33333");
          
        
		
		}
		
		
		
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) { 
        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        			
    }
	});







}












