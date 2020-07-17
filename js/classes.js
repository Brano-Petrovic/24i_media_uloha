class search_engine {
    // metoda na preklikavanie medzi jednotlivymi strankamy najdenych vysledkov
    pagination(){
        // nacitanie hladaneho vyrazu z inputboxu
        var search_expression = document.getElementById('input_search').value;
        
        // podmienka na zistenie, ci sa ma zobrazit nasledujuca(predchadzajuce) stranka s webovymi strankami alebo obrazky
        // nasledne sa zapisu do spravneho DIV elemntu vysledkov
        if (event.target.id.includes('web')){
            document.getElementById('web_results').innerHTML = '<h4>Web results</h4>'
            var startIndex = (event.target.text * 4) - (4-1)
            this.web_search(search_expression, startIndex);
        }
        else{
            document.getElementById('image_results').innerHTML = '<h4>Image results</h4>'
            var startIndex = (event.target.text * 8) - (8-1)
            this.images_search(search_expression, startIndex);
        }
    }

    // metoda create_pagination sluzi na vytvorenie samotneho strankovania pri nacitani vysledkov
    create_pagination(typeOfDiv, startIndex, totalResults, count_items) {
        // vytvorenie div elementu na strankovanie vysledkov(na kazdom liste mozu byt zobrazene maximalne 4 vysledky, pripadne 8 ak su to obrazky)
        var pages = document.createElement('div');
        pages.setAttribute('id', typeOfDiv+'_pagination');

        //cyklus for vytvori odkazy s jednotlivymi strankami(3 predchadzajuce a 3 nasledujuce)
        // napriklad ak je aktualne zobrazena 2. strana, tak vytvori odkaz na stranky 1, 2, 3, 4 a 5
        // alebo ak sme napr. na 6 strane tak vytvori odkazy na stranky 3, 4, 5, 6, 7, 8 a 9. To mozme vidiet na dolnej casti stranky.
        for (var i=(((startIndex-1)/count_items)+1)-3; i <= (((startIndex-1)/count_items)+1) + 3; i++){
            if (i > 0 && i*count_items <= 93 && totalResults > i*count_items){
                var new_a = document.createElement('a');
                new_a.innerHTML = i;
                new_a.setAttribute('id', 'ref_page_'+typeOfDiv+'_'+i)
                new_a.addEventListener('click', function () { searching_tool.pagination() });
                pages.appendChild(new_a);     
            }
        }
        // priradenie DIV elementu so strankovanim
        document.getElementById(typeOfDiv+'_results').appendChild(pages);
        
        // definovanie triedy active pre strankovanie
        document.getElementById('ref_page_'+typeOfDiv+'_'+(((startIndex-1)/count_items)+1)).setAttribute('class', 'active');
    }


    // metoda images_search ma 2 vstupne parametere, v ktorych je ulozene hladana hodnota a cislo indexu prveho zobrazeneho vysledku
    // a jej výstupom  je zoznam najdenych obrazkov, ktore su automaticky vlozene do DIV elementu na HTML stranke
    images_search(expression, start_index) {
        // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne obrazky na internete a vysledok spatne vrati v JSON subore
        var request_images = new XMLHttpRequest();
        request_images.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBahGG_yyK8K6Sm0j__MapZWqt3CD9tpqc&cx=015357063026513941299:mlhzjndorg8&start='+start_index+'&num=8&q=' + expression + '&searchType=image', true);
        request_images.send();

        // podmienka na zistenie ked sa vrati spatna odpoved zo servera. Bez toho aby sa pockalo na vysledky nie je mozne aby program pokracoval dalej.
        request_images.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // najdene vysledny v JSON formate su spracovane pomocou funkcie parse a ulozene do premennej
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
            // vytvorenie odkazov na podstranky vysledkov pomocou funcie create_pagination
            searching_tool.create_pagination('image', results_images['queries']['request'][0]['startIndex'], results_images['queries']['request'][0]['totalResults'], 8);
            }
        }
    }

    // metoda web_search ma 2 vstupne parametere, v ktorych su ulozene hladana hodnota a poradovy index prveho zobrazeneho vysledku
    // a jej výstupom  je zoznam najdenych stranok (nazov, link, popis), ktore su automaticky vlozene do DIV elementu na HTML stranke 
    web_search(expression, start_index) {
        // vytvorenie requestu na odoslanie poziadavky do GOOGLE SEARCH API ENGINE, ktory vyhlada relevantne stranky na internete a vysledok spatne vrati v JSON subore
        var request = new XMLHttpRequest();
        request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBahGG_yyK8K6Sm0j__MapZWqt3CD9tpqc&cx=015357063026513941299:mlhzjndorg8&start='+start_index+'&num=4&q=' + expression, true);
        request.send();
        
        // podmienka na zistenie ked sa vrati spatna odpoved zo servera. Bez toho aby sa pockalo na vysledky nie je mozne aby program pokracoval dalej.
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // najdene vysledny v JSON formate su spracovane pomocou funkcie parse a ulozene do premennej
                var results = JSON.parse(request.responseText);

                // kontrola ci boli najdene nejake vysledky
                if (results['items'] == undefined) {
                    document.getElementById('web_results').innerHTML += 'Žiadne výsledky sa nenašli.'
                }
                else {
                    var new_page = document.createElement('div');
                    new_page.setAttribute('id', 'page' + (results['items'].length / 4) + '_web_results');
                    document.getElementById('web_results').appendChild(new_page);

                    // cyklus for prejde vsetky najdene vysledky
                    for (var i = 0; i < results['items'].length; i++) {

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
                }
            searching_tool.create_pagination('web', results['queries']['request'][0]['startIndex'], results['queries']['request'][0]['totalResults'], 4);
            }
        };   
    }
    
    // metoda ktora sa zavoal po kliknuti na button Search a vyhlada relevantne vysledky
    search() {
        // vymazanie predchadzajucich hladanych vysledkov
        document.getElementById('image_results').innerHTML = '<h4>Image results</h4>'
        document.getElementById('web_results').innerHTML = '<h4>Web results</h4>'

        // po zavolani funkcie sa nacita hodnota z inputboxu do premennej
        var search_expression = document.getElementById('input_search').value;

        if (search_expression == '') {
            alert('Musíte zadať hladaný výraz.')
        }
        else {
            document.getElementsByTagName('body')[0].setAttribute('class', 'loading')
            // zavolanie funkcii web_search a images_search ktore, dostanu ako vstupny parameter hodnotu z inputboxu(hladana hodnota)
            this.web_search(search_expression, 1);
            this.images_search(search_expression, 1);
            document.getElementsByTagName('body')[0].removeAttribute('class', 'loading')
        }
    }
}