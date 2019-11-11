$(document).ready(function(){
    var customDomain = 'df19-ea-keynote';
    var predictionDefinition = '0ORB0000000CeMIOA0';
    var accessToken = '00DB0000000YK2U!ARUAQII1xrw3c_WfvzvVHxaHm1mzoo9VtME62wN.lUj76VgqI6Q4zDNXhV_Mr_FzOfRHMMQr9f067k.6C5sAG87Y.uwcyZve';

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
                var predictedCloseDate = new Date($( "div.ea_createDate .text p span" ).html()) + result.predictions[0].prediction.total;
                
                $( "div.ea_predictedCloseDate .text p span" ).html(predictedCloseDate);

                $( "div.ea_discovery_panel .text p span" ).html("BLAH BLAH BLAH");

            }
        });

    });
});