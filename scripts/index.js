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
	getJSON("http://localhost:9200/neto_bruto/_search?").then(resp => {
        console.log(resp);
      });
}	


async function getJSON(theUrl){
  data = {
    "query": {
      "match_all": {}
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


function responsivefy(svg) { 
              
            // Container is the DOM element, svg is appended. 
            // Then we measure the container and find its 
            // aspect ratio. 
            const container = d3.select(svg.node().parentNode), 
                width = parseInt(svg.style('width'), 10), 
                height = parseInt(svg.style('height'), 10), 
                aspect = width / height; 
                  
            // Add viewBox attribute to set the value to initial size 
            // add preserveAspectRatio attribute to specify how to scale  
            // and call resize so that svg resizes on page load 
            svg.attr('viewBox', `0 0 ${width} ${height}`). 
            attr('preserveAspectRatio', 'xMinYMid'). 
            call(resize); 
              
            d3.select(window).on('resize.' + container.attr('id'), resize); 
   
            function resize() { 
                const targetWidth = parseInt(container.style('width')); 
                svg.attr('width', targetWidth); 
                svg.attr('height', Math.round(targetWidth / aspect)); 
            } 
        } 