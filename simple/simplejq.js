'use strict';

// visibility settings
$('.description-wrap').hide();
$('.main__input-cell--H2O').hide();
$('.main__output-cell--H2O').hide();

// CONSTS
var NA2O_MOL = 61.979;
var K2O_MOL = 94.196;
var AL2O3_MOL = 101.961;
var MGO_MOL = 40.304;
var FEO_MOL = 71.846;
var FE2O3_MOL = 159.692; // new
var CAO_MOL = 56.077;
var MNO_MOL = 70.938;
var TIO2_MOL = 79.879;
var SIO2_MOL = 60.084;
var H2O_MOL = 18.015;

// setting element values
var Na2O = 0, K2O = 0, Al2O3 = 0, MgO = 0, FeO = 0, Fe2O3 = 0, CaO = 0, MnO = 0, TiO2 = 0, SiO2 = 0, H2O = 0;

// getting inputs values
$('#Na2O-input').on('input', function() {
  Na2O = this.value;
});
$('#K2O-input').on('input', function() {
  K2O = this.value;
});
$('#Al2O3-input').on('input', function() {
  Al2O3 = this.value;
});
$('#MgO-input').on('input', function() {
  MgO = this.value;
});
$('#FeO-input').on('input', function() {
  FeO = this.value;
});
$('#Fe2O3-input').on('input', function() {
  Fe2O3 = this.value;
});
$('#CaO-input').on('input', function() {
  CaO = this.value;
});
$('#MnO-input').on('input', function() {
  MnO = this.value;
});
$('#TiO2-input').on('input', function() {
  TiO2 = this.value;
});
$('#SiO2-input').on('input', function() {
  SiO2 = this.value;
});
$('#H2O-input').on('input', function() {
  H2O = this.value;
});

//calculate function
var calculate = function () {

  var getMolRatio = function (elem, mol) {
    var molRatio = elem / mol;
    return molRatio;
  };

  // mol ratios
  var Na2O_MolRatio = getMolRatio(Na2O, NA2O_MOL);
  var K2O_MolRatio = getMolRatio(K2O, K2O_MOL);
  var Al2O3_MolRatio = getMolRatio(Al2O3, AL2O3_MOL);
  var MgO_MolRatio = getMolRatio(MgO, MGO_MOL);
  var FeO_MolRatio = getMolRatio(FeO, FEO_MOL);
  var Fe2O3_MolRatio = getMolRatio(Fe2O3, FE2O3_MOL);
  var CaO_MolRatio = getMolRatio(CaO, CAO_MOL);
  var MnO_MolRatio = getMolRatio(MnO, MNO_MOL);
  var TiO2_MolRatio = getMolRatio(TiO2, TIO2_MOL);
  var SiO2_MolRatio = getMolRatio(SiO2, SIO2_MOL);
  var H2O_MolRatio = getMolRatio(H2O, H2O_MOL);

  // anion ratios
  var Na2O_anionRatio = Na2O_MolRatio;
  var K2O_anionRatio = K2O_MolRatio;
  var Al2O3_anionRatio = Al2O3_MolRatio * 3;
  var MgO_anionRatio = MgO_MolRatio;
  var FeO_anionRatio = FeO_MolRatio;
  var Fe2O3_anionRatio = Fe2O3_MolRatio * 3;
  var CaO_anionRatio = CaO_MolRatio;
  var MnO_anionRatio = MnO_MolRatio;
  var TiO2_anionRatio = TiO2_MolRatio * 2;
  var SiO2_anionRatio = SiO2_MolRatio * 2;
  var H2O_anionRatio = H2O_MolRatio;

  // cation ratios
  var Na2O_cationRatio = Na2O_MolRatio * 2;
  var K2O_cationRatio = K2O_MolRatio * 2;
  var Al2O3_cationRatio = Al2O3_MolRatio * 2;
  var MgO_cationRatio = MgO_MolRatio;
  var FeO_cationRatio = FeO_MolRatio;
  var Fe2O3_cationRatio = Fe2O3_MolRatio * 2;
  var CaO_cationRatio = CaO_MolRatio;
  var MnO_cationRatio = MnO_MolRatio;
  var TiO2_cationRatio = TiO2_MolRatio;
  var SiO2_cationRatio = SiO2_MolRatio;
  var H2O_cationRatio = H2O_MolRatio * 2;

  // prosto anion rating
  var getAnionRatioFactor = function (divisor) {
    return (Na2O_anionRatio + K2O_anionRatio + Al2O3_anionRatio + MgO_anionRatio + FeO_anionRatio + Fe2O3_anionRatio + CaO_anionRatio + MnO_anionRatio + TiO2_anionRatio + SiO2_anionRatio + H2O_anionRatio) / divisor;
  }

  var getApfu = function (mineral) {
    return mineral / getAnionRatioFactor(mineralSelectValue);
  }

  // apfu
  var Na2O_apfu = getApfu(Na2O_cationRatio);
  var K2O_apfu = getApfu(K2O_cationRatio);
  var Al2O3_apfu = getApfu(Al2O3_cationRatio);
  var MgO_apfu = getApfu(MgO_cationRatio);
  var FeO_apfu = getApfu(FeO_cationRatio);
  var Fe2O3_apfu = getApfu(Fe2O3_cationRatio);
  var CaO_apfu = getApfu(CaO_cationRatio);
  var MnO_apfu = getApfu(MnO_cationRatio);
  var TiO2_apfu = getApfu(TiO2_cationRatio);
  var SiO2_apfu = getApfu(SiO2_cationRatio);
  var H2O_apfu = getApfu(H2O_cationRatio);

  var setToFixed = function (elem) {
    if (elem === 0) {
      return elem;
    } else if (elem.toFixed(2) < 0.0001) {
      return 0;
    } else if (isNaN(elem)) {
      return 0;
    } else {
      return elem.toFixed(2);
    }
  }

  // setting outputs values
  $('#Na2O-output').text(setToFixed(Na2O_apfu));
  $('#K2O-output').text(setToFixed(K2O_apfu));
  $('#Al2O3-output').text(setToFixed(Al2O3_apfu));
  $('#MgO-output').text(setToFixed(MgO_apfu));
  $('#FeO-output').text(setToFixed(FeO_apfu));
  $('#Fe2O3-output').text(setToFixed(Fe2O3_apfu));
  $('#CaO-output').text(setToFixed(CaO_apfu));
  $('#MnO-output').text(setToFixed(MnO_apfu));
  $('#TiO2-output').text(setToFixed(TiO2_apfu));
  $('#SiO2-output').text(setToFixed(SiO2_apfu));
  $('#H2O-output').text(setToFixed(H2O_apfu));

};

// getting <select> value
var mineralSelectValue = $('#mineral-select')[0].value;

$('#mineral-select').on('change', function() {
  mineralSelectValue = $('#mineral-select')[0].value;
  if ($('#mineral-select option:selected')[0].className == 'hydrous') {
    $('.main__input-cell--H2O').slideDown('fast');
    $('.main__output-cell--H2O').slideDown('fast');
  } else if ($('#mineral-select option:selected')[0].className == 'anhydrous') {
    $('.main__input-cell--H2O').slideUp('fast');
    $('.main__output-cell--H2O').slideUp('fast');
  }
});

//clear function
var clear = function () {
  Na2O = 0;
  K2O = 0;
  Al2O3 = 0;
  MgO = 0;
  FeO = 0;
  Fe2O3 = 0;
  CaO = 0;
  MnO = 0;
  TiO2 = 0;
  SiO2 = 0;
  H2O = 0;
  $('.main__input').val('');
  $('.main__output').text('');
};

// setting inputs keypress event
$('.main__input').keypress(function(e) {
  if (e.which == 13) {
    calculate();
  }
});

// set buttons events
$('.button--calculate').on('click', function () {
  calculate();
});

$('.button--clear').on('click', function () {
  clear();
});

$('.button--toggle').on('click', function () {

  if ($('.description-wrap').is(':hidden')) {
      $('.button--toggle').text('Hide description');
    } else if ($('.description-wrap').not(':hidden')) {
      $('.button--toggle').text('Show description');
    }

    $('.description-wrap').slideToggle('fast');
  });
  // console.log($('.main__input'));

  // button disable settings
    $('.button--calculate').prop('disabled', true);

//   Array.prototype.map.call($('.main__input'), (item) => {
//   console.log(item);
// });

// var positiveArr = Array.prototype.filter.call($('.main__input'). (item) => {
//   return item.value !== '';
// });

var inputsArr = [];
$('.main').on('input', function (e) {
  e.preventDefault();
  inputsArr = Array.prototype.filter.call($('.main__input'), item => {
    return item.value !== '';
  });

  if (inputsArr.length < 2) {
    $('.button--calculate').prop('disabled', true);
  } else if (inputsArr.length >= 2) {
    $('.button--calculate').prop('disabled', false);
  }

});

  // var inputsArr = [];
  // $('.main').on('change', function (e) {
  //   e.preventDefault();
  //   Array.prototype.map.call($('.main__input'), (item) => {
  //     if (item.value !== '') {
  //       inputsArr.push(item.value);
  //     } else if (item.value == '' && inputsArr.length > 3) {
  //       inputsArr.pop();
  //     }
  //     console.log(inputsArr);
  //   })
    // if (inputsArr.length < 2) {
    //   $('.button--calculate').prop('disabled', true);
    // } else if (inputsArr.length > 2) {
    //   $('.button--calculate').prop('disabled', false);
    // }
  // });

// thats all, falks
