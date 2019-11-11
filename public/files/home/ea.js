//var baseUrl = 'https://df19-pwc-rms.herokuapp.com/';
var baseUrl = 'http://localhost:3000';

jsforce.browser.init({
    clientId: '3MVG9SemV5D80oBdPknGJaTWOVnTwUKYx2q8F4tc71IRD9CGuzV6pyIo7naH3H4tZcgoJvZELyH.c3sP1zvov',
    redirectUri: "http://localhost:3000/callback.html"
});

$(document).ready(function(){
    var customDomain = 'df19-ea-keynote';
    var predictionDefinition = '0ORB0000000CeMIOA0';

    if (jsforce.browser.isLoggedIn())
        console.log('loogged in');
    else
        console.log('not logged in');

    //var hashParams = mapUrlHashes();
    var accessToken = 'as';

    //add button characteristics
    $( "div.ea_update" ).hover(function() {
        $(this).css('cursor', 'pointer');
        $( "#u195_div" ).css( "background-color","#d67c5c" );
    },
    function() {
        $( "#u195_div" ).css( "background-color","#D84714" );
    });

    //on click get prediction
    $( "div.ea_update" ).click(function(){
        // alert(
        //     "LOS: " + $( "div.ea_los .text p span" ).html() 
        //     + " | Product: " + $( "div.ea_product .text p span" ).html() 
        //     + " | Hours: " + $( "div.ea_hours .text p span" ).html() 
        //     + " | Allocation: " + $( "div.ea_allocation .text p span" ).html());
        
        $.post({
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'OAuth ' + accessToken,
                'Accept': 'application/json',
            },
            url: "https://" + customDomain + ".my.salesforce.com/services/data/v46.0/smartdatadiscovery/predict",
            data: JSON.stringify({ 
                "predictionDefinition": predictionDefinition,
                "type": "RecordOverrides",
                "columnNames": [
                    "PwC_Opportunity__c.On_boarding_hours__c",
                    "PwC_Opportunity__c.Resource_allocation__c",
                    "PwC_Opportunity__c.Product_Name__c",
                ],
                "rows": [
                    {
                        record: "a2NB00000015za0MAA",
                        row: [
                            $( "div.ea_hours .text p span" ).html(),
                            $( "div.ea_allocation .text p span" ).html(),
                            $( "div.ea_product .text p span" ).html(),
                        ]
                    }
                ]
            }),
            success: function (result) {
                console.log(result);
                var predictedCloseDate = new Date($( "div.ea_createDate .text p span" ).html());
                predictedCloseDate.setDate(predictedCloseDate.getDate() + Math.round(result.predictions[0].prediction.total));
                
                $( "div.ea_predictedCloseDate .text p span" ).html(predictedCloseDate.getMonth() + 1 + "/" + predictedCloseDate.getDate() + "/" + predictedCloseDate.getFullYear());
                
                var causesHtml = "";
                result.predictions[0].prediction.middleValues.forEach(function(column) {
                    causesHtml += "<span style='" + ((column.value < 0) ? "color:green;'><b>" : "color:red;''><b>+") + parseFloat(column.value).toFixed(2) + "</b></span> because ";
                    column.columns.forEach(function(element) {
                        causesHtml += element.columnName + " is <b>" + element.columnValue + "</b> and ";
                    })
                    causesHtml = causesHtml.substring(0,causesHtml.lastIndexOf(' and '));
                    causesHtml += "<br>";
                });

                var presecriptionHtml = "";
                result.predictions[0].prescriptions.forEach(function(element) {
                    presecriptionHtml += "<span style='" + ((element.value < 0) ? "color:green;'><b>" : "color:red;''><b>+") + parseFloat(element.value).toFixed(2)  + "</b></span> If you change " + element.columns[0].columnName + " to <b>" + element.columns[0].columnValue + "</b><br>";
                });

                $( "div.ea_discovery_panel .text p span" ).html("<span class='ea-section-title'>Leading Causes:</span><br><span class='ea-section-body'>" + causesHtml + "</span><br><span class='ea-section-title'>How to Improve:</span><br><span class='ea-section-body'>" + presecriptionHtml + "</span>");

            }
        });

    });
});