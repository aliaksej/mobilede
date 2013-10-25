$('.pricePrimaryCountryOfSale.priceGross').click(function (e) {
var price = e.target.innerText.replace(/[^\d]/g, '');
var volMatches = $('.titleContainer').text().match(/\s+(\d[.,]\d)\s+/);
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
})