//vytvorenie objektu pomocou classy search_engine
var searching_tool = new search_engine();

// pridanie EventListenera ku search buttonu
// na zaklade toho sa po kliknuti na button Search zavola metoda search nad vytvorenym objektom.
document.getElementById('button_search').addEventListener('click', function () { searching_tool.search() });