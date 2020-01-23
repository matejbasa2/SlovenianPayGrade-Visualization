<!DOCTYPE html>
<html lang="en">
<head>
    <title>ES</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script>
    $(document).ready(function(){
        $("button").click(function(){
            var data = {
                
                "query": { "match": { "_id": "1" } }
           
                }

                $.ajax({
                    method: "GET",
                    url: "http://localhost:9200/neto_bruto/_search?",
                    crossDomain: true,  
                    async: true,
                    data: JSON.stringify(data),
                    dataType : 'json',
                    contentType: 'application/json',
                })
                .done(function( data ) {
                    console.log(data);
                    $( "#testni" ).append( "<p>DEJAVNOST</p>" + JSON.stringify(data) );
                    $( "#hits" ).append( "<h3>MESEC</h3>" + JSON.stringify(data.hits.hits) );

                })
                .fail(function( data ) {
                    console.log(data);
                });
        });
    });
    </script>
</head>
<body style="background: #ccc; ">
Test Elastic
<button>Send an HTTP POST request</button>
<div id="testni"></div>
<div id="hits"></div>
</body>
</html>