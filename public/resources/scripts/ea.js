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
        alert("LOS: " + $( "div.ea_los .text p span" ).html() + " | Product: " + $( "div.ea_product .text p span" ).html() + " | Hours: " + $( "div.ea_hours .text p span" ).html() + " | Allocation: " + $( "div.ea_allocation .text p span" ).html());
        $( "div.ea_discovery_panel .text p span" ).html("BLAH BLAH BLAH");

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
                "type": "RawData",
                "columnNames": [
                    "Number_of_People_on_Opportunity__c",
                    "On_boarding_hours__c",
                    "Billing_Type__c",
                    "Sector__c",
                    "Resource_allocation__c",
                    "Total_Days_Identified_Through_Qualified__c",
                    "Competitive_Situation__c",
                    "Product_Name__c",
                    "Route_To_Market__c",
                    "Amount__c",
                    "Global_Platform__c"
                ],
                "rows": [
                    [
                        "10 to 15",
                        "Low",
                        "Fixed",
                        "CBU",
                        "> 80",
                        "17.0",
                        "Unknown",
                        "Professional Services",
                        "Performance & Non-auto",
                        "1300000",
                        "Performance & Non-auto"
                    ]
                ]
            }),
            success: function (result) {
                alert( "Data Loaded: " + result );
            }
        });

    });
});