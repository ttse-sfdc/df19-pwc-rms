$(document).ready(function(){
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

        $.ajax({
            type: "POST",
            crossdomain: true,
            url: "https://df19-ea-keynote.lightning.force.com/services/data/v46.0/smartdatadiscovery/predict",
            dataType: "json",
            data: { 
                "predictionDefinition": "0OR1H000000Gma9WAC",
                "type": "RawData",
                "columnNames": ["StageName","CloseDate","Account.BillingCountry","IsClosed","IsWon"],
                "rows": [
                    ["Prospecting","2019-06-30","USA","false","false"]
                ]
            },
            success: function (result) {
                alert( "Data Loaded: " + result );
            },
            error: function (xhr, status, err) {
                console.error(xhr, status, err);
            }
        });

    });
});