var EUR2USD = 1.38;
// converts eur 2 usd
function eur2usd (eur) {
  return eur * EUR2USD;
}


// get tax rate (EUR)
function getTaxRate (engineVol) {
  var tax = 1.5;
  if (engineVol > 1000 && engineVol <= 1500) {
    tax = 1.7;
  }
  else if (engineVol > 1500 && engineVol <= 1800) {
    tax = 2.5;
  }
  else if (engineVol > 1800 && engineVol <= 2300) {
    tax = 2.7;
  }
  else {
    tax = 3;
  }
  return tax;
}

// carPrice (EUR), engineVol (cm3)
function calculateTax (carPrice, engineVol) {
  var tax = getTaxRate(engineVol);
  var price = eur2usd(tax * engineVol);
  return parseInt(price, 10);
}
// carPrice (EUR), engineVol (cm3)
function calculateTotalPrice (carPrice, engineVol) {
  var tax = getTaxRate(engineVol);
  var price= eur2usd(carPrice + tax * engineVol);
  return parseInt(price, 10);
}
window.calculateTotalPrice = calculateTotalPrice;