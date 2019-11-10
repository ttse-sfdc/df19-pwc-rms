$(document).ready(function(){
    var customDomain = 'df19-ea-keynote';
    var predictionDefinition = '0OR1H000000Gma9WAC';
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
            //dataType: "json",
            data: { 
                "predictionDefinition": predictionDefinition,
                "type": "RawData",
                "columnNames": ["StageName","CloseDate","Account.BillingCountry","IsClosed","IsWon"],
                "rows": [
                    ["Prospecting","2019-06-30","USA","false","false"]
                ]
            },
            success: function (result) {
                alert( "Data Loaded: " + result );
            }
        });

    });
});