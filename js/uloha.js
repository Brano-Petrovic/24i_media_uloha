document.getElementById("button_search").addEventListener("click", search);

function search() {
    search_expression = document.getElementById('input_search').value

    web_search(search_expression)
    images_search(search_expression)
}

function images_search(expression) {
    var request_images = new XMLHttpRequest();
    request_images.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyADqemHsDEzBfgEbpLIqvVGhaBXsyZBGHs&cx=015357063026513941299:mlhzjndorg8&q=" + expression + "&searchType=image", false);
    request_images.send();

    results_images = JSON.parse(request_images.responseText)

    for (i = 0; i < results_images['items'].length; i++) {

        var new_image = document.createElement("IMG");
        new_image.setAttribute("src", results_images['items'][i]['link']);
        new_image.setAttribute("class", "image_result");
        new_image.setAttribute("alt", results_images['items'][i]['title']);

        image_reference = document.createElement('a')
        image_reference.setAttribute("href", results_images['items'][i]['image']['contextLink'])
        image_reference.appendChild(new_image)
        document.getElementById('image_results').appendChild(image_reference);
    }
}

function web_search(expression) {
    var request = new XMLHttpRequest();
    request.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyADqemHsDEzBfgEbpLIqvVGhaBXsyZBGHs&cx=015357063026513941299:mlhzjndorg8&q=" + expression, false);
    request.send();

    results = JSON.parse(request.responseText)

    pages = document.createElement('div')
    pages.setAttribute("id", "pagination")

    for (i = 0; i < results['items'].length; i++) {

        if (i % 4 == 0) {
            new_page = document.createElement('div')
            new_page.setAttribute("id", "page" + (Math.floor(i / 4) + 1) + "_web_results")
            new_page.setAttribute("hidden", true)
            document.getElementById('web_results').appendChild(new_page)

            new_a = document.createElement('a')
            new_a.innerHTML = Math.floor(i / 4) + 1
            new_a.addEventListener("click", pagination)
            pages.appendChild(new_a)
        }

        new_div = document.createElement('div')
        new_div.setAttribute("id", "result" + i)
        new_div.setAttribute("class", "web_result")
        new_page.appendChild(new_div)

        new_div.innerHTML += results['items'][i]['title'] + '<br>'
        new_div.innerHTML += '<a href = "' + results['items'][i]['formattedUrl'] + '">' + results['items'][i]['formattedUrl'] + '</a><br>'
        new_div.innerHTML += results['items'][i]['snippet'] + '<br>'
    }

    document.getElementById('web_results').appendChild(pages)

    document.getElementById('pagination').getElementsByTagName('a')[0].setAttribute('class', 'active')
    document.getElementById('page1_web_results').removeAttribute('hidden')
    document.getElementById('page1_web_results').setAttribute('class', 'actual')
}

function pagination() {
    document.getElementById('web_results').getElementsByClassName("actual")[0].setAttribute('hidden', true)
    document.getElementById('web_results').getElementsByClassName("actual")[0].removeAttribute('class')

    document.getElementById("page" + this.text + "_web_results").removeAttribute('hidden')
    document.getElementById("page" + this.text + "_web_results").setAttribute('class', 'actual')

    document.getElementById('pagination').getElementsByClassName("active")[0].removeAttribute('class')
    this.setAttribute('class', 'active')
}