var dateSave,
  dateCheck,
  state, 
  id,
  idCheck, 
  img,
  test = ``,
  test2 = ``,
  prodSum = 0,
  price,
  docSum = 0,
  daySum = 0,
  quantity,
  sum,
  count = 0,
  month = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

$.getJSON('js/look.json', function(data){
  function productAdd (product) {
        docSum++;
        test += (`<div id="day__act-${i}" class="day__act"><div class="day__act-info"><div class="day__act-info_cod">${state} № ${id}</div><div class="day__act-info_product"><button id="day__act-info_product-button-${i}" class="day__act-info_product-button"><span class="button-block-1 button-block-1-${i}"></span><span class="button-block-2 button-block-2-${i}"></span></button> Товаров: ${count}</div><div class="day__act-info_sum">${prodSum.toFixed(2)} p</div></div>${product}  </div>`);
        test2 =``;
        count = 0;
  }

  function addBlock () {
    var day_info = $('<div class="day__info">')
        .append(`<div class="day__info-date"><button id="day__info-date_button-${i}" class="day__info-date_button"><span id="button-block-1-${i}" class="button-block-1"></span><span id="button-block-2-${i}" class="button-block-2"></span></button> ${day} ${month[m]}</div>`)
        .append(`<div class="day__info-sum">Документов: ${docSum} (${daySum.toFixed(2)} Р)</div>`);
      var newday = $(`<div id="day__wrap-${i}" class="day__wrap">`).append(day_info).append(test);
      $( ".block" ).append(newday);
      clean();
  }

  function clean () {
    test=``, test2=``; prodSum = 0, count = 0, docSum = 0, daySum = 0;
  }

  for (var i = 0; i < data.rows.length; i++) {
    dateSave = new Date(data.rows[i][0]);
    if(i == data.rows.length-1) {
      dateCheck = new Date(data.rows[i][0]);
      idCheck = data.rows[i][2];
    } else {
      dateCheck = new Date(data.rows[i+1][0]);
      idCheck = data.rows[i+1][2];
    }
    day = dateSave.getDate();
    var m = dateSave.getMonth();
    id = data.rows[i][2];
    state = data.rows[i][1];
    img = data.rows[i][3];
    name = data.rows[i][4];
    price = data.rows[i][5];
    quantity = data.rows[i][6];
    if( img == null) img = "../img/2019-02-08_23-37-30.png";
    if (dateCheck.getDate() == dateSave.getDate() && dateCheck.getMonth() == dateSave.getMonth() && dateCheck.getFullYear() == dateSave.getFullYear() || i == data.rows.length) {
      sum = parseFloat(price * quantity);
      prodSum += sum;
      count++;
      test2 += (`<div class="day__act_product"><div class="day__act_product-img"><img src="${img}" alt=""></div><div class="day__act_product-info"><div class="day__act_product-info_title">${name}</div><div class="day__act_product-info_quantity">${quantity} штук х ${price.toFixed(2)} р</div><div class="day__act_product-info_sum">${sum.toFixed(2)} р</div></div></div>`);
      if (id != idCheck) {
        daySum += prodSum;
        productAdd(test2);
        prodSum = 0;
      }
    } else {
      sum = parseFloat(price * quantity);
      prodSum += sum;
      count++;
      daySum += prodSum;
      test2 += (`<div class="day__act_product"><div class="day__act_product-img"><img src="${img}" alt=""></div><div class="day__act_product-info"><div class="day__act_product-info_title">${name}</div><div class="day__act_product-info_quantity">${quantity} штук х ${price} р</div><div class="day__act_product-info_sum">${sum.toFixed(2)} р</div></div></div>`);
      productAdd(test2);
      addBlock();
      }
    }
    productAdd(test2);
    addBlock();
});

$(document).ready(function() {

  $(".day__info-date_button").on('click', function() {
    var dayId = (this.id).replace("day__info-date_button-","");
    $(`#day__wrap-${dayId}`).toggleClass("open-day");
  });
  $(".day__act-info_product-button").on('click', function() {
    var prodId = (this.id).replace("day__act-info_product-button-","");
    $(`#day__act-${prodId}`).toggleClass("open-prod");
  })
});