var searching_tool = new search_engine();

// pridanie EventListenera ku search buttonu
// na zaklade toho sa po kliknuti na button Search zavola funkcia search, ktora je definovana nizsie
document.getElementById('button_search').addEventListener('click', function () { searching_tool.search() });