'use strict';

// visibility settings
$('.description-text--more').hide();
$('.main__input-cell--Fe2O3').hide();
$('.main__output-cell--Fe2O3').hide();

// media querys options
if ($(window).width() < 600) {
  $('.main__output-area').hide();
}

// CONSTS
var NA2O_MOL = 61.979;
var K2O_MOL = 94.196;
var AL2O3_MOL = 101.961;
var MGO_MOL = 40.304;
var FEO_MOL = 71.846;
var CAO_MOL = 56.077;
var MNO_MOL = 70.938;
var TIO2_MOL = 79.879;
var SIO2_MOL = 60.084;
// var CL_MOL = 35.453;
var FE2O3_MOL = 159.692;

const KEYCODES = {
  ENTER: 13,
  SPACE: 32,
};

// magic divisor numbers
var thirteen = 13; // mineralSelectValueT
var fifteen = 15; // ???
var twentyThree = 23; // mineralSelectValueX
var fourtySix = 46; // 2 * mineralSelectValueX

// setting element values
var Na2O = 0, K2O = 0, Al2O3 = 0, MgO = 0, FeO = 0, CaO = 0, MnO = 0, TiO2 = 0, SiO2 = 0;
// Cl = 0;

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
// $('#Cl-input').on('input', function() {
//   Cl = this.value;
// });

//calculate function
var calculate = function () {


  var getMolRatio = function (elem, mol) {
    return elem / mol;
  }


  var Fe3_ratio = (FeO * 1.1113); // all iron is Fe2O3

  // mol ratios
  var Na2O_MolRatio = getMolRatio(Na2O, NA2O_MOL);
  var K2O_MolRatio = getMolRatio(K2O, K2O_MOL);
  var Al2O3_MolRatio = getMolRatio(Al2O3, AL2O3_MOL);
  var MgO_MolRatio = getMolRatio(MgO, MGO_MOL);
  var FeO_MolRatio = getMolRatio(FeO, FEO_MOL);
  var CaO_MolRatio = getMolRatio(CaO, CAO_MOL);
  var MnO_MolRatio = getMolRatio(MnO, MNO_MOL);
  var TiO2_MolRatio = getMolRatio(TiO2, TIO2_MOL);
  var SiO2_MolRatio = getMolRatio(SiO2, SIO2_MOL);
  // var Cl_MolRatio = getMolRatio(Cl, CL_MOL);

  var FeO_negMolRatio = Fe3_ratio / FE2O3_MOL;

  // cation ratios
  var Na2O_cationRatio = Na2O_MolRatio * 2;
  var K2O_cationRatio = K2O_MolRatio * 2;
  var Al2O3_cationRatio = Al2O3_MolRatio * 2;
  var MgO_cationRatio = MgO_MolRatio;
  var FeO_cationRatio = FeO_MolRatio;
  var CaO_cationRatio = CaO_MolRatio;
  var MnO_cationRatio = MnO_MolRatio;
  var TiO2_cationRatio = TiO2_MolRatio;
  var SiO2_cationRatio = SiO2_MolRatio;
  // var Cl_cationRatio = Cl_MolRatio;

  var FeO_negCation = FeO_negMolRatio * 2;

  // anion ratios
  var Na2O_anionRatio = Na2O_MolRatio;
  var K2O_anionRatio = K2O_MolRatio;
  var Al2O3_anionRatio = Al2O3_MolRatio * 3;
  var MgO_anionRatio = MgO_MolRatio;
  var FeO_anionRatio = FeO_MolRatio;
  var CaO_anionRatio = CaO_MolRatio;
  var MnO_anionRatio = MnO_MolRatio;
  var TiO2_anionRatio = TiO2_MolRatio * 2;
  var SiO2_anionRatio = SiO2_MolRatio * 2;
  // var Cl_anionRatio = Cl_MolRatio;

  var FeO_negAnion = FeO_negMolRatio * 3;

  //calc using anion sums
  var getAnionRatioFactor = function () {
    return (Na2O_anionRatio + K2O_anionRatio + Al2O3_anionRatio + MgO_anionRatio + FeO_anionRatio + CaO_anionRatio + MnO_anionRatio + TiO2_anionRatio + SiO2_anionRatio) / mineralSelectValueX; // originally 23
    //  + Cl_anionRatio
  }

  //calc using anion sums with all arion Fe2O3
  var getAnionFerNegRatio = function () {
    return (Na2O_anionRatio + K2O_anionRatio + Al2O3_anionRatio + MgO_anionRatio + FeO_negAnion + CaO_anionRatio + MnO_anionRatio + TiO2_anionRatio + SiO2_anionRatio) / mineralSelectValueX; // originally 23
    //  + Cl_anionRatio
  }

  //calc using cation sums
  var getAmphiboleFactor =  function () {

    var amphiboleFactor = (Na2O_MolRatio + K2O_MolRatio + Al2O3_MolRatio + MgO_MolRatio + FeO_MolRatio + CaO_MolRatio + MnO_MolRatio + TiO2_MolRatio + SiO2_MolRatio) / fifteen;
    //  + Cl_MolRatio

    return amphiboleFactor;
  }

  var getApfu = function (mineral) {
    return mineral / getAnionRatioFactor();
  }

  var FeO_negApfu = function () {
    return FeO_negCation / getAnionFerNegRatio();
  }

  // R's S function
  var getApfuSumm = function () {
    if (mineralSelectValueX == 23) {
      return getApfu(MgO_cationRatio) +
      getApfu(FeO_cationRatio) +
      getApfu(SiO2_cationRatio) +
      getApfu(Al2O3_cationRatio) +
      getApfu(TiO2_cationRatio);
    } else if (mineralSelectValueX == 6 || mineralSelectValueX == 12) {
      return getApfu(Na2O_cationRatio) +
      getApfu(K2O_cationRatio) +
      getApfu(Al2O3_cationRatio) +
      getApfu(MgO_cationRatio) +
      getApfu(FeO_cationRatio) +
      getApfu(CaO_cationRatio) +
      getApfu(MnO_cationRatio) +
      getApfu(SiO2_cationRatio) +
      getApfu(TiO2_cationRatio);
    } else {
      console.log('wrong select value!');
      return false;
    }
  }

  var getApfuSummFactor = function () {
    return mineralSelectValueT / getApfuSumm(); //originally 13
  }

  // R's F function
  var getFerricFactor = function () {
    return 2 * mineralSelectValueX * (1 - getApfuSummFactor()); // originally 46
  }

  // apfu
  var Na2O_apfu = getApfu(Na2O_cationRatio);
  var K2O_apfu = getApfu(K2O_cationRatio);
  var Al2O3_apfu = getApfu(Al2O3_cationRatio);
  var MgO_apfu = getApfu(MgO_cationRatio);
  var FeO_apfu = getApfu(FeO_cationRatio);
  var CaO_apfu = getApfu(CaO_cationRatio);
  var MnO_apfu = getApfu(MnO_cationRatio);
  var TiO2_apfu = getApfu(TiO2_cationRatio);
  var SiO2_apfu = getApfu(SiO2_cationRatio);
  // var Cl_apfu = getApfu(Cl_cationRatio);

  var FeOneg_apfu = getApfu(FeO_negMolRatio);

  // corrected
  var Na2O_corr = Na2O_apfu * getApfuSummFactor();
  var K2O_corr = K2O_apfu * getApfuSummFactor();
  var Al2O3_corr = Al2O3_apfu * getApfuSummFactor();
  var MgO_corr = MgO_apfu * getApfuSummFactor();
  var FeO_corr = FeO_apfu * getApfuSummFactor();
  var CaO_corr = CaO_apfu * getApfuSummFactor();
  var MnO_corr = MnO_apfu * getApfuSummFactor();
  var TiO2_corr = TiO2_apfu * getApfuSummFactor();
  var SiO2_corr = SiO2_apfu * getApfuSummFactor();
  // var Cl_corr = Cl_apfu * getApfuSummFactor();

  // R's ferric_mineral_1$negative_iron_check function
  var FeO_ferric = FeO_corr - getFerricFactor();

  // final values for stage one (amphibole)
  var Na2O_final = Na2O_MolRatio / getAmphiboleFactor();
  var K2O_final = K2O_MolRatio / getAmphiboleFactor();
  var Al2O3_final = Al2O3_MolRatio / getAmphiboleFactor();
  var MgO_final = MgO_MolRatio / getAmphiboleFactor();
  var FeO_final = FeO_MolRatio / getAmphiboleFactor();
  var CaO_final = CaO_MolRatio / getAmphiboleFactor();
  var MnO_final = MnO_MolRatio / getAmphiboleFactor();
  var TiO2_final = TiO2_MolRatio / getAmphiboleFactor();
  var SiO2_final = SiO2_MolRatio / getAmphiboleFactor();
  // var Cl_final = Cl_MolRatio / getAmphiboleFactor();

  var setToFixed = function (elem) {
    if (elem === 0) {
      return elem;
    } else {
      return elem.toFixed(2);
    }
  };

  //output visibility
  if (getApfuSumm() <= mineralSelectValueT)  {

    $('.main__input-cell--Fe2O3').slideUp('fast');
    $('.main__output-cell--Fe2O3').slideUp('fast');

    $('#Na2O-output').text(setToFixed(Na2O_apfu));
    $('#K2O-output').text(setToFixed(K2O_apfu));
    $('#Al2O3-output').text(setToFixed(Al2O3_apfu));
    $('#MgO-output').text(setToFixed(MgO_apfu));
    $('#FeO-output').text(setToFixed(FeO_apfu));
    // $('#Fe2O3-output').text(setToFixed(Fe2O3_apfu));
    $('#CaO-output').text(setToFixed(CaO_apfu));
    $('#MnO-output').text(setToFixed(MnO_apfu));
    $('#TiO2-output').text(setToFixed(TiO2_apfu));
    $('#SiO2-output').text(setToFixed(SiO2_apfu));
    // $('#Cl-output').text(setToFixed(Cl_apfu));

  } else if (getApfuSumm() > mineralSelectValueT && getFerricFactor() > 0) {  //getFerricFactor()

    if ($(window).width() >= 600) {
      $('.main__input-cell--Fe2O3').slideDown('fast');
      $('.main__output-cell--Fe2O3').slideDown('fast');

      $('#Na2O-output').text(setToFixed(Na2O_corr));
      $('#K2O-output').text(setToFixed(K2O_corr));
      $('#Al2O3-output').text(setToFixed(Al2O3_corr)); //
      $('#MgO-output').text(setToFixed(MgO_corr));
      $('#FeO-output').text(setToFixed(FeO_ferric));
      $('#Fe2O3-output').text(setToFixed(getFerricFactor()));
      $('#CaO-output').text(setToFixed(CaO_corr));
      $('#MnO-output').text(setToFixed(MnO_corr));
      $('#TiO2-output').text(setToFixed(TiO2_corr));
      $('#SiO2-output').text(setToFixed(SiO2_corr));
      // $('#Cl-output').text(setToFixed(Cl_corr));
    } else {
      // $('.main__input-cell--Fe2O3').slideDown('fast');
      $('.main__output-cell--Fe2O3').slideDown('fast');

      $('#Na2O-output').text(setToFixed(Na2O_corr));
      $('#K2O-output').text(setToFixed(K2O_corr));
      $('#Al2O3-output').text(setToFixed(Al2O3_corr)); //
      $('#MgO-output').text(setToFixed(MgO_corr));
      $('#FeO-output').text(setToFixed(FeO_ferric));
      $('#Fe2O3-output').text(setToFixed(getFerricFactor()));
      $('#CaO-output').text(setToFixed(CaO_corr));
      $('#MnO-output').text(setToFixed(MnO_corr));
      $('#TiO2-output').text(setToFixed(TiO2_corr));
      $('#SiO2-output').text(setToFixed(SiO2_corr));
      // $('#Cl-output').text(setToFixed(Cl_corr));
    }

  } else if (getApfuSumm() > mineralSelectValueT && getFerricFactor() < 0) { //FeO_ferric

    if ($(window).width() >= 600) {
      $('.main__input-cell--Fe2O3').slideDown('fast');
      $('.main__output-cell--Fe2O3').slideDown('fast');

      $('#Na2O-output').text(setToFixed(Na2O_corr));
      $('#K2O-output').text(setToFixed(K2O_corr));
      $('#Al2O3-output').text(setToFixed(Al2O3_apfu));
      $('#MgO-output').text(setToFixed(MgO_corr));
      $('#FeO-output').text(setToFixed(FeOneg_apfu));
      $('#Fe2O3-output').text(setToFixed(FeO_ferric));
      $('#CaO-output').text(setToFixed(CaO_corr));
      $('#MnO-output').text(setToFixed(MnO_corr));
      $('#TiO2-output').text(setToFixed(TiO2_corr));
      $('#SiO2-output').text(setToFixed(SiO2_corr));
      // $('#Cl-output').text(setToFixed(Cl_corr));
    } else {
      // $('.main__input-cell--Fe2O3').slideDown('fast');
      $('.main__output-cell--Fe2O3').slideDown('fast');

      $('#Na2O-output').text(setToFixed(Na2O_corr));
      $('#K2O-output').text(setToFixed(K2O_corr));
      $('#Al2O3-output').text(setToFixed(Al2O3_apfu));
      $('#MgO-output').text(setToFixed(MgO_corr));
      $('#FeO-output').text(setToFixed(FeOneg_apfu));
      $('#Fe2O3-output').text(setToFixed(FeO_ferric));
      $('#CaO-output').text(setToFixed(CaO_corr));
      $('#MnO-output').text(setToFixed(MnO_corr));
      $('#TiO2-output').text(setToFixed(TiO2_corr));
      $('#SiO2-output').text(setToFixed(SiO2_corr));
      // $('#Cl-output').text(setToFixed(Cl_corr));
    }
  }

  //media settings
  if ($(window).width() < 600) {
    $('.main__output-area').slideDown('fast', function () {
      $('html, body').animate({ scrollTop: $(document).height() }, 'fast');
    });
  }

};

// getting <select> value
var mineralSelectValueX = +$('#mineral-select')[0].value;
var mineralSelectValueT = 13;
$('#mineral-select').on('change', function() {
  mineralSelectValueX = +$('#mineral-select')[0].value;
  if (mineralSelectValueX == 23) { //amphibole
    mineralSelectValueT = 13;
  } else if (mineralSelectValueX == 6) { //pyroxine
    mineralSelectValueT = 4;
  } else if (mineralSelectValueX == 12) { //garnet
    mineralSelectValueT = 8;
  }
})

var clear = function () {
  Na2O = 0;
  K2O = 0;
  Al2O3 = 0;
  MgO = 0;
  FeO = 0;
  // Fe2O3 = 0;
  CaO = 0;
  MnO = 0;
  TiO2 = 0;
  SiO2 = 0;
  // Cl = 0;
  $('.main__input').val('');
  $('.main__output').text('');
  inputsArr.length = 0;

  $('.main__input-cell--Fe2O3').slideUp('fast');
  $('.main__output-cell--Fe2O3').slideUp('fast');

  $('.button--calculate-ferrum').prop('disabled', true);

  //media settings
  if ($(window).width() < 600) {
    $('.main__output-area').slideUp('fast');
  }
};

// setting inputs keypress event
$(document).keydown(function(e) {
  if (e.which == 13 && inputsArr.length >= 2) {
    $('.button--calculate-ferrum').addClass('button--calculate-ferrum-active');
  }
});

$(document).keyup(function(e) {
  if (e.which == 13 && inputsArr.length >= 2) {
    $('.button--calculate-ferrum').removeClass('button--calculate-ferrum-active');
    calculate();
  }
});

// set buttons events
$('.button--calculate-ferrum').on('click', function () {
  calculate();
});

$('.button--clear').on('click', function () {
  clear();
});

// button disable settings
$('.button--calculate-ferrum').prop('disabled', true);

var inputsArr = [];
$('.main').on('input', function (e) {
  e.preventDefault();
  inputsArr = Array.prototype.filter.call($('.main__input'), item => {
  return item.value !== '';
});

if (inputsArr.length < 2) {
  $('.button--calculate-ferrum').prop('disabled', true);
} else if (inputsArr.length >= 2) {
  $('.button--calculate-ferrum').prop('disabled', false);
}

});

// thats all, fu(l)cks
