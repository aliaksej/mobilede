var carsList = $('.search-results'),
    isCarsList = carsList.length > 0,
    carView = $('.contentBox:has(.vehicleTitle)'),
    isCarView = carView.length === 1,
    cars,
    PRICE_SELECTOR = '.pricePrimaryCountryOfSale.priceGross',
    TITLE_SELECTOR = '.titleContainer, .listEntryTitle, .detailsViewLink',
    ENGINE_VOLUME_SELECTOR = '.technicalDetailsColumn dd:contains("см"), .technicalDetailsColumn dd:contains("cm")',
    VOLUME_REGEXP = /\s+(\d[.,]\d)\w*\s+/;

if (isCarsList) {
    cars = $('.listEntry');
}
else if (isCarView) {
    cars = $('.vehicleTitle').parents('.contentBox'); // container of all car information
}

function processCars() {
    if (!cars) return;
    cars.each(function (index, car) {
        car = $(car);
        var price = getPrice(car);
        var vol = getEngineVolume(car);
       	var totalPrice = unsafeWindow.calculateTotalPrice(parseInt(price, 10), parseInt(vol, 10));
        if (vol && price) {
            car.find(PRICE_SELECTOR).after("<div style='color:red; font-size: 16px;margin: 10px 10px 10px 0;'>" + totalPrice + " USD</div>");
        }
        car.on('click', PRICE_SELECTOR, onPriceClick);
    });
}

function getPrice (context) {
    var price = context.find(PRICE_SELECTOR).text().replace(/[^\d]/g, '');
    return price;
}

function getEngineVolume (context, ask) {
    // trying to find volume param
    var volEl = context.find(ENGINE_VOLUME_SELECTOR);
    var titleMatches = $.trim(context.find(TITLE_SELECTOR).text() || "").match(VOLUME_REGEXP);
    var volume;

    if (volEl.length > 0) {
        volume = volEl.text().replace(/[^\d]/g, '');
    }
    else if (titleMatches) { // search for volume in title
        volume = titleMatches[1].replace(',', '.');
    } else if (ask) {
        volume = prompt('Enter engine volume', '1.6').replace(',', '.');
    }

    if (volume && volume.indexOf('.')!== -1) {
        volume = volume * 1000;
    }

    return volume;
}


processCars();


function onPriceClick (e) {
    e.preventDefault();
    e.stopPropagation();
    var price = e.target.innerText.replace(/[^\d]/g, '');
    var volMatches = $.trim($('.titleContainer').text() || "").match(VOLUME_REGEXP);
    var volEl = $('.technicalDetailsColumn dd:contains("см")');
    var engineVol;
    if (volEl.length > 0) {
        engineVol = volEl.text().replace(/[^\d]/g, '');
    }
    else if (volMatches) {
        engineVol = volMatches[1].replace(',', '.');
    }
    else {
        engineVol = prompt('Enter engine volume', '1.6').replace(',', '.');
    }
    if (engineVol.indexOf('.')!== -1) {
        engineVol = engineVol * 1000;
    }
    alert('Цена: ' + unsafeWindow.calculateTotalPrice(parseInt(price), parseInt(engineVol)));
}

$('.pricePrimaryCountryOfSale.priceGross').click(onPriceClick);