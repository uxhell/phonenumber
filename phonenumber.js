var digit2english_dict = 'zero,one,two,three,four,five,six,seven,eight,nine'.split(',');

var phonenumberform,
    digit_selects = [];

function genZeroToN(n) {
  return Array.apply(null, {length: Number(n)}).map(Number.call, Number);
}

String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
}

function digit2english(value) {
  return digit2english_dict[Number(value)];
}

function createDigitOption(value) {
  var option = document.createElement("option");
  option.value = value;
  option.innerHTML = digit2english(value);
  return option;
}

function updateResultDigit(pos, val, elm) {
  elm.value = elm.value.replaceAt(pos, val);
}

function onFormChange(ev) {
  updateResultDigit(Number(ev.target.name.replace(/^digit/,''))-1, ev.target.selectedOptions[0].value, ev.target.parentElement.result)
}

function pageLoad(ev) {
  var cache_zero2ten = genZeroToN(10);

  var pnform_elements = (phonenumberform = document.getElementById("phonenumberform")).elements;

  cache_zero2ten.map(function(i){
    cache_zero2ten.map(function(j){
      pnform_elements["digit"+(i+1)].appendChild(createDigitOption(j));
    });
  });

  phonenumberform.result.value = new Array(10).fill(0).join('');

  phonenumberform.addEventListener('change', onFormChange, false);

}

window.addEventListener('load', pageLoad, false);
