

var buttons = false;

function resize_body_padding() {
    if (buttons == false){
        buttons = true;
        $("body").css("padding-top", 125);
    }
    else if(buttons == true){
        buttons = false;
        $("body").css("padding-top", 70);
    }
}


function potegni() {
  var dejavnost = document.getElementById("myInput").value;
	getJSON("http://localhost:9200/neto_bruto/_search?", dejavnost).then(resp => {
        console.log(resp);
      });
}


async function getJSON(theUrl, dejavnost){
  data = {
    "query": {
          "bool": {
            "must": [
              { "match": {"dejavnost": dejavnost.toString()}}
              ]
            }
          }
        }

  const response = await fetch(theUrl, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrer: 'no-referrer',
  body: JSON.stringify(data)
  });
  return await response.json();
  }


