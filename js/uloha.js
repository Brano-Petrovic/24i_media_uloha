document.getElementById("button_search").addEventListener("click", search);

function search(){
    search_expression = document.getElementById('input_search').value

    var request = new XMLHttpRequest();
    request.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyADqemHsDEzBfgEbpLIqvVGhaBXsyZBGHs&cx=015357063026513941299:mlhzjndorg8&q="+search_expression, false);
    request.send();
    
    results = JSON.parse(request.responseText)

    for (i = 0; i < results['items'].length; i++){

        if (i % 4 == 0){
            new_page = document.createElement('div')
            new_page.setAttribute("id", "page"+(Math.floor(i/4)+1)+"_web_results")
            new_page.setAttribute("hidden", "hidden")
            document.getElementById('web_results').appendChild(new_page)

            new_a = document.createElement('a')
            new_a.setAttribute("href", "#")
            new_a.innerHTML = Math.floor(i/4)+1
            document.getElementById('pagination').appendChild(new_a)
            document.getElementById("pagination").getElementsByTagName("a")[Math.floor(i/4)].addEventListener("click", pagination)
        }

        new_div = document.createElement('div')
        new_div.setAttribute("id", "result"+i)
        new_div.setAttribute("class", "web_result")
        document.getElementById("page"+(Math.floor(i/4)+1)+"_web_results").appendChild(new_div)

        document.getElementById("result"+i).innerHTML += results['items'][i]['title']+'<br>'
        document.getElementById("result"+i).innerHTML += '<a href = "' + results['items'][i]['formattedUrl'] + '">' + results['items'][i]['formattedUrl'] +'</a><br>'
        document.getElementById("result"+i).innerHTML += results['items'][i]['snippet']+'<br>'
    }

    document.getElementById('page1_web_results').removeAttribute('hidden')
    document.getElementById('page1_web_results').setAttribute('class', 'actual')


    var request_images = new XMLHttpRequest();
    request_images.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyADqemHsDEzBfgEbpLIqvVGhaBXsyZBGHs&cx=015357063026513941299:mlhzjndorg8&q="+search_expression+"&searchType=image", false);
    request_images.send();
    
    results_images = JSON.parse(request_images.responseText)
    console.log(results_images)
    console.log(results_images['items'].length)
    console.log(results_images['items'][0])
    
    for (i = 0; i < results_images['items'].length; i++){

        var new_image = document.createElement("IMG");
        new_image.setAttribute("src", results_images['items'][i]['link']);
        new_image.setAttribute("class", "image_result");
        new_image.setAttribute("alt", results_images['items'][i]['title']);
        document.getElementById('image_results').appendChild(new_image);
    }
}

function pagination (){
    document.getElementById('web_results').getElementsByClassName("actual")[0].setAttribute('hidden', true)
    document.getElementById('web_results').getElementsByClassName("actual")[0].removeAttribute('class')
    document.getElementById("page"+this.text+"_web_results").removeAttribute('hidden')
    document.getElementById("page"+this.text+"_web_results").setAttribute('class', 'actual')
}