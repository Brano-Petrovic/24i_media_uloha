// var test = {
//     search: function () {
//         // vymazanie predchadzajucich hladanych vysledkov
//         document.getElementById('image_results').innerHTML = '<h4>Image results</h4>'
//         document.getElementById('web_results').innerHTML = '<h4>Web results</h4>'

//         // po zavolani funkcie sa ako prve nacita hodnota z inputboxu do premennej
//         search_expression = document.getElementById('input_search').value;

//         if (search_expression == '') {
//             alert('Musíte zadať hladaný výraz.')
//         }
//         else {
//             document.getElementsByTagName('body')[0].setAttribute('class', 'loading')
//             // zavolanie funkcii web_search a images_search ktore, dostanu ako vstupny parameter hodnotu z inputboxu(hladana hodnota)
//             test.web_search(search_expression);
//             test.images_search(search_expression);
//             document.getElementsByTagName('body')[0].removeAttribute('class', 'loading')
//         }

//     },

//     // funkcia images_search ma 1 vstupny parameter, v ktorom je ulozene hladana hodnota
//     // a jej výstupom  je zoznam najdenych obrazkov, ktore su automaticky vlozene do DIV elementu na HTML stranke
//     images_search: function (expression) {
//         // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne obrazky na internete a vysledok spatne vrati v JSON subore
//         var request_images = new XMLHttpRequest();
//         request_images.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCSld2SV98hWurSzD9F62qMMgfhqNtmgkU&cx=015357063026513941299:mlhzjndorg8&q=' + expression + '&searchType=image', true);
//         request_images.send();

//         request_images.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 // // najdene vysledny v JSON formate su spracovane pomocou funkcie parse a ulozene do premennej
//                 results_images = JSON.parse(request_images.responseText);


//                 // kontrola ci boli najdene nejake vysledky
//                 if (results_images['items'] == undefined) {
//                     document.getElementById('image_results').innerHTML += 'Žiadne výsledky sa nenašli.'
//                 }
//                 else {
//                     // cyklus for prejde postupne vsetky prvky
//                     for (i = 0; i < results_images['items'].length; i++) {

//                         // vytvorenie 'img' elementu
//                         var new_image = document.createElement('IMG');
//                         // definovanie atributov noveho 'img' elementu(src, class, alt)
//                         new_image.setAttribute('src', results_images['items'][i]['link']);
//                         new_image.setAttribute('class', 'image_result');
//                         new_image.setAttribute('alt', results_images['items'][i]['title']);

//                         // vytvorenie 'a' elementu
//                         image_reference = document.createElement('a');
//                         // definovanie atributov noveho 'a' elemntu
//                         image_reference.setAttribute('href', results_images['items'][i]['image']['contextLink']);
//                         // vlozenie 'img' elemntu do 'a' elementu
//                         image_reference.appendChild(new_image);
//                         // vlozenie 'a' elemntu do elementu s id = 'image_results'
//                         document.getElementById('image_results').appendChild(image_reference);
//                     }
//                 }
//             }
//         }
//     },

//     // funkcia web_search ma 1 vstupny parameter, v ktorom je ulozene hladana hodnota
//     // a jej výstupom  je zoznam najdenych stranok (nazov, link, popis), ktore su automaticky vlozene do DIV elementu na HTML stranke 
//     web_search: function (expression) {
//         // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne stranky na internete a vysledok spatne vrati v JSON subore
//         var request = new XMLHttpRequest();
//         request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCSld2SV98hWurSzD9F62qMMgfhqNtmgkU&cx=015357063026513941299:mlhzjndorg8&q=' + expression, true);
//         request.send();

//         request.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 results = JSON.parse(request.responseText);

//                 // vytvorenie div elementu na strankovanie vysledkov(na kazdom liste mozu byt zobrazene maximalne 4 vysledky)
//                 pages = document.createElement('div');
//                 pages.setAttribute('id', 'pagination');

//                 // kontrola ci boli najdene nejake vysledky
//                 if (results['items'] == undefined) {
//                     document.getElementById('web_results').innerHTML += 'Žiadne výsledky sa nenašli.'
//                 }
//                 else {
//                     // cyklus for prejde vsetky najdene vysledky
//                     for (i = 0; i < results['items'].length; i++) {

//                         // tato podmienka if sluzi na rozdelenie najdenych vysledkov do stranok
//                         // na jednej stranke tak moze zobrazit maximalne 4 vysledky
//                         // ak je vysledkov viac ako 4, tak sa vytvori 2. stranka vysledkov a 5.-8. item sa priradi do tejto stranky. Dalej nasledne pokracuje rovnakou logikou
//                         if (i % 4 == 0) {
//                             new_page = document.createElement('div');
//                             new_page.setAttribute('id', 'page' + (Math.floor(i / 4) + 1) + '_web_results');
//                             new_page.setAttribute('hidden', true);
//                             document.getElementById('web_results').appendChild(new_page);

//                             // vytvorenie odkazu na dalsiu stranku vysledkov
//                             new_a = document.createElement('a');
//                             new_a.innerHTML = Math.floor(i / 4) + 1;
//                             new_a.addEventListener('click', test.pagination);
//                             pages.appendChild(new_a);
//                         }

//                         // vytvorenie a definovanie atributov pre DIV element, v ktorom je vypisana konkretna informacia
//                         new_div = document.createElement('div');
//                         new_div.setAttribute('id', 'result' + i);
//                         new_div.setAttribute('class', 'web_result');
//                         new_page.appendChild(new_div);

//                         // vlozenie informacii(nadpis, link, popis) o najdenych strankach do DIV elementu
//                         new_div.innerHTML += results['items'][i]['title'] + '<br>';
//                         new_div.innerHTML += '<a href = ' + results['items'][i]['formattedUrl'] + '>' + results['items'][i]['formattedUrl'] + '</a><br>';
//                         new_div.innerHTML += results['items'][i]['snippet'] + '<br>';
//                     }

//                     // priradenie DIV elementu so strankovanim
//                     document.getElementById('web_results').appendChild(pages);

//                     // definovanie triedy active pre strankovanie
//                     document.getElementById('pagination').getElementsByTagName('a')[0].setAttribute('class', 'active');
//                     // odstranenie hidden atributu z prvej stranky vysledkov a nastavenie triedy actual
//                     document.getElementById('page1_web_results').removeAttribute('hidden');
//                     document.getElementById('page1_web_results').setAttribute('class', 'actual');
//                 }
//             }
//         };
//     },

//     // funkcia pagination sluzi na prechod medzi jednotlivymi strankami vysledkov 
//     pagination: function () {
//         // odstranenie atributu class a definovanie atributu 'hidden' z elemntu DIV, ktory bol aktualne zobrazeny
//         document.getElementById('web_results').getElementsByClassName('actual')[0].setAttribute('hidden', true);
//         document.getElementById('web_results').getElementsByClassName('actual')[0].removeAttribute('class');

//         // nastavenie atributu class a vymazanie atributu 'hidden' z elemntu DIV, ktory chceme zobrazit
//         document.getElementById('page' + this.text + '_web_results').removeAttribute('hidden');
//         document.getElementById('page' + this.text + '_web_results').setAttribute('class', 'actual');

//         // zmazanie atributu class z elemntu, ktory bol pred tym aktualne zobrazeny
//         document.getElementById('pagination').getElementsByClassName('active')[0].removeAttribute('class');
//         // nastavenie atributu class na 'active' v zozname strankovania
//         this.setAttribute('class', 'active');
//     }
// }

// // pridanie EventListenera ku search buttonu
// // na zaklade toho sa po kliknuti na button Search zavola funkcia search, ktora je definovana nizsie
// document.getElementById('button_search').addEventListener('click', test.search);

class test  {
    // funkcia images_search ma 1 vstupny parameter, v ktorom je ulozene hladana hodnota
    // a jej výstupom  je zoznam najdenych obrazkov, ktore su automaticky vlozene do DIV elementu na HTML stranke
    images_search (expression) {
        // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne obrazky na internete a vysledok spatne vrati v JSON subore
        var request_images = new XMLHttpRequest();
        request_images.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB079S_OTIkPfwfu2QXHwDF0MRdxQj6Fh8&cx=015357063026513941299:mlhzjndorg8&q=' + expression + '&searchType=image', true);
        request_images.send();

        request_images.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // // najdene vysledny v JSON formate su spracovane pomocou funkcie parse a ulozene do premennej
                var results_images = JSON.parse(request_images.responseText);


                // kontrola ci boli najdene nejake vysledky
                if (results_images['items'] == undefined) {
                    document.getElementById('image_results').innerHTML += 'Žiadne výsledky sa nenašli.'
                }
                else {
                    // cyklus for prejde postupne vsetky prvky
                    for (var i = 0; i < results_images['items'].length; i++) {

                        // vytvorenie 'img' elementu
                        var new_image = document.createElement('IMG');
                        // definovanie atributov noveho 'img' elementu(src, class, alt)
                        new_image.setAttribute('src', results_images['items'][i]['link']);
                        new_image.setAttribute('class', 'image_result');
                        new_image.setAttribute('alt', results_images['items'][i]['title']);

                        // vytvorenie 'a' elementu
                        var image_reference = document.createElement('a');
                        // definovanie atributov noveho 'a' elemntu
                        image_reference.setAttribute('href', results_images['items'][i]['image']['contextLink']);
                        // vlozenie 'img' elemntu do 'a' elementu
                        image_reference.appendChild(new_image);
                        // vlozenie 'a' elemntu do elementu s id = 'image_results'
                        document.getElementById('image_results').appendChild(image_reference);
                    }
                }
            }
        }
    }

    // funkcia web_search ma 1 vstupny parameter, v ktorom je ulozene hladana hodnota
    // a jej výstupom  je zoznam najdenych stranok (nazov, link, popis), ktore su automaticky vlozene do DIV elementu na HTML stranke 
    web_search (expression) {
        // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne stranky na internete a vysledok spatne vrati v JSON subore
        var request = new XMLHttpRequest();
        request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB079S_OTIkPfwfu2QXHwDF0MRdxQj6Fh8&cx=015357063026513941299:mlhzjndorg8&q=' + expression, true);
        request.send();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var results = JSON.parse(request.responseText);

                // vytvorenie div elementu na strankovanie vysledkov(na kazdom liste mozu byt zobrazene maximalne 4 vysledky)
                var pages = document.createElement('div');
                pages.setAttribute('id', 'pagination');

                // kontrola ci boli najdene nejake vysledky
                if (results['items'] == undefined) {
                    document.getElementById('web_results').innerHTML += 'Žiadne výsledky sa nenašli.'
                }
                else {
                    // cyklus for prejde vsetky najdene vysledky
                    for (var i = 0; i < results['items'].length; i++) {

                        // tato podmienka if sluzi na rozdelenie najdenych vysledkov do stranok
                        // na jednej stranke tak moze zobrazit maximalne 4 vysledky
                        // ak je vysledkov viac ako 4, tak sa vytvori 2. stranka vysledkov a 5.-8. item sa priradi do tejto stranky. Dalej nasledne pokracuje rovnakou logikou
                        if (i % 4 == 0) {
                            var new_page = document.createElement('div');
                            new_page.setAttribute('id', 'page' + (Math.floor(i / 4) + 1) + '_web_results');
                            new_page.setAttribute('hidden', true);
                            document.getElementById('web_results').appendChild(new_page);

                            // vytvorenie odkazu na dalsiu stranku vysledkov
                            var new_a = document.createElement('a');
                            new_a.innerHTML = Math.floor(i / 4) + 1;
                            new_a.addEventListener('click', function(){skuska.pagination()});
                            pages.appendChild(new_a);
                        }

                        // vytvorenie a definovanie atributov pre DIV element, v ktorom je vypisana konkretna informacia
                        var new_div = document.createElement('div');
                        new_div.setAttribute('id', 'result' + i);
                        new_div.setAttribute('class', 'web_result');
                        new_page.appendChild(new_div);

                        // vlozenie informacii(nadpis, link, popis) o najdenych strankach do DIV elementu
                        new_div.innerHTML += results['items'][i]['title'] + '<br>';
                        new_div.innerHTML += '<a href = ' + results['items'][i]['formattedUrl'] + '>' + results['items'][i]['formattedUrl'] + '</a><br>';
                        new_div.innerHTML += results['items'][i]['snippet'] + '<br>';
                    }

                    // priradenie DIV elementu so strankovanim
                    document.getElementById('web_results').appendChild(pages);

                    // definovanie triedy active pre strankovanie
                    document.getElementById('pagination').getElementsByTagName('a')[0].setAttribute('class', 'active');
                    // odstranenie hidden atributu z prvej stranky vysledkov a nastavenie triedy actual
                    document.getElementById('page1_web_results').removeAttribute('hidden');
                    document.getElementById('page1_web_results').setAttribute('class', 'actual');
                }
            }
        };
    }

    // funkcia pagination sluzi na prechod medzi jednotlivymi strankami vysledkov 
    pagination() {
        console.log(this)
        // odstranenie atributu class a definovanie atributu 'hidden' z elemntu DIV, ktory bol aktualne zobrazeny
        document.getElementById('web_results').getElementsByClassName('actual')[0].setAttribute('hidden', true);
        document.getElementById('web_results').getElementsByClassName('actual')[0].removeAttribute('class');

        // nastavenie atributu class a vymazanie atributu 'hidden' z elemntu DIV, ktory chceme zobrazit
        document.getElementById('page' + this.text + '_web_results').removeAttribute('hidden');
        document.getElementById('page' + this.text + '_web_results').setAttribute('class', 'actual');

        // zmazanie atributu class z elemntu, ktory bol pred tym aktualne zobrazeny
        document.getElementById('pagination').getElementsByClassName('active')[0].removeAttribute('class');
        // nastavenie atributu class na 'active' v zozname strankovania
        this.setAttribute('class', 'active');
    }
    
    search () {
        // vymazanie predchadzajucich hladanych vysledkov
        document.getElementById('image_results').innerHTML = '<h4>Image results</h4>'
        document.getElementById('web_results').innerHTML = '<h4>Web results</h4>'

        // po zavolani funkcie sa ako prve nacita hodnota z inputboxu do premennej
        var search_expression = document.getElementById('input_search').value;
        search_expression = 'car'
        if (search_expression == '') {
            alert('Musíte zadať hladaný výraz.')
        }
        else {
            document.getElementsByTagName('body')[0].setAttribute('class', 'loading')
            // zavolanie funkcii web_search a images_search ktore, dostanu ako vstupny parameter hodnotu z inputboxu(hladana hodnota)
            this.web_search(search_expression);
            this.images_search(search_expression);
            document.getElementsByTagName('body')[0].removeAttribute('class', 'loading')
        }

    }
}

var skuska = new test();
// skuska.search();
// pridanie EventListenera ku search buttonu
// na zaklade toho sa po kliknuti na button Search zavola funkcia search, ktora je definovana nizsie
document.getElementById('button_search').addEventListener('click', function (){skuska.search()});