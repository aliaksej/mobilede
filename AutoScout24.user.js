if (location.href.indexOf('autoscout') >= 0) {
var carsList = $('#listoutput_part_one, #listoutput_part_two'),
    isCarsList = carsList.length > 0,
    carView = $('.box-n-container'),
    isCarView = carView.length > 0,
    cars,
    PRICE_SELECTOR = '.lit-price, #ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleGeneralData_pricePublicRow .c2 h2',
    TITLE_SELECTOR = '.headcar a, .caption',
    ENGINE_VOLUME_SELECTOR = '#ctl00_ctl00_decoratedArea_contentArea_detailPagePanel_articleMoreDetailsData_displacementRow .c2',
    VOLUME_REGEXP = /\s+(\d[.,]\d)\w*\s+/;

if (isCarsList) {
    cars = $('.list-item, .list-item-d');
}
else if (isCarView) {
    cars = $('.box-n-container'); // container of all car information
}

function processCars() {
    if (!cars) return;
    cars.each(function (index, car) {
        car = $(car);
        var price = getPrice(car);
        var vol = getEngineVolume(car);
	console.log('#' + index + ' ' + price + ' ' + vol);
       	var totalPrice = unsafeWindow.calculateTotalPrice(parseInt(price, 10), parseInt(vol, 10));
        if (vol && price) {
            car.find(PRICE_SELECTOR).append("<span class='calculated' style='color:red; font-size: 14px;'>" + totalPrice + " USD</span>");
        }
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

}