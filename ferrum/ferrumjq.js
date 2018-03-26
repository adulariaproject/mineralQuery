'use strict';

// consts
var NA2O_MOL = 61.979;
var K2O_MOL = 94.196;
var AL2O3_MOL = 101.961;
var MGO_MOL = 40.304;
var FEO_MOL = 71.846;
var CAO_MOL = 56.077;
var MNO_MOL = 70.938;
var TIO2_MOL = 79.879;
var SIO2_MOL = 60.084;
var CL_MOL = 35.453;
var FE2O3_MOL = 159.692;

// setting element values
var Na2O = 0, K2O = 0, Al2O3 = 0, MgO = 0, FeO = 0, CaO = 0, MnO = 0, TiO2 = 0, SiO2 = 0, Cl = 0;

// setting inputs keypress event
$('.main__input').keypress(function(e) {
  if (e.which == 13) {
    calculate();
  }
});

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
$('#Cl-input').on('input', function() {
  Cl = this.value;
});

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
  var Cl_MolRatio = getMolRatio(Cl, CL_MOL);

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
  var Cl_cationRatio = Cl_MolRatio;

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
  var Cl_anionRatio = Cl_MolRatio;

  var FeO_negAnion = FeO_negMolRatio * 3;

  //calc using anion sums
  var getAnionRatioFactor = function () {
    return (Na2O_anionRatio + K2O_anionRatio + Al2O3_anionRatio + MgO_anionRatio + FeO_anionRatio + CaO_anionRatio + MnO_anionRatio + TiO2_anionRatio + SiO2_anionRatio + Cl_anionRatio) / 23;
  }

  //calc using anion sums with all arion Fe2O3
  var getAnionFerNegRatio = function () {
    return (Na2O_anionRatio + K2O_anionRatio + Al2O3_anionRatio + MgO_anionRatio + FeO_negAnion + CaO_anionRatio + MnO_anionRatio + TiO2_anionRatio + SiO2_anionRatio + Cl_anionRatio) / 23;
  }

  //calc using cation sums
  var getAmphiboleFactor =  function () {

    var amphiboleFactor = (Na2O_MolRatio + K2O_MolRatio + Al2O3_MolRatio + MgO_MolRatio + FeO_MolRatio + CaO_MolRatio + MnO_MolRatio + TiO2_MolRatio + SiO2_MolRatio + Cl_MolRatio) / 15;

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
    return getApfu(MgO_cationRatio) + getApfu(FeO_cationRatio) + getApfu(SiO2_cationRatio) + getApfu(Al2O3_cationRatio) + getApfu(TiO2_cationRatio);
  }

  var getApfuSummFactor = function () {
    return 13 / getApfuSumm();
  }

  // R's F function
  var getFerricFactor = function () {
    return 46 * (1 - getApfuSummFactor());
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
  var Cl_apfu = getApfu(Cl_cationRatio);

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
  var Cl_corr = Cl_apfu * getApfuSummFactor();

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
  var Cl_final = Cl_MolRatio / getAmphiboleFactor();

  var setToFixed = function (elem) {
    if (elem === 0) {
      return elem;
    } else {
      return elem.toFixed(2);
    }
};

  // amphibole table output
  $('.form__output-cell--Na2O').text(setToFixed(Na2O_final));
  $('.form__output-cell--K2O').text(setToFixed(K2O_final));
  $('.form__output-cell--Al2O3').text(setToFixed(Al2O3_final));
  $('.form__output-cell--MgO').text(setToFixed(MgO_final));
  $('.form__output-cell--FeO').text(setToFixed(FeO_final));
  $('.form__output-cell--CaO').text(setToFixed(CaO_final));
  $('.form__output-cell--MnO').text(setToFixed(MnO_final));
  $('.form__output-cell--TiO2').text(setToFixed(TiO2_final));
  $('.form__output-cell--SiO2').text(setToFixed(SiO2_final));
  $('.form__output-cell--Cl').text(setToFixed(Cl_final));

  // apfu table output
  var apfuTable = $('.apfu-table');

  $('.table__output--apfu-Na2O').text(setToFixed(Na2O_apfu));
  $('.table__output--apfu-K2O').text(setToFixed(K2O_apfu));
  $('.table__output--apfu-Al2O3').text(setToFixed(Al2O3_apfu));
  $('.table__output--apfu-MgO').text(setToFixed(MgO_apfu));
  $('.table__output--apfu-FeO').text(setToFixed(FeO_apfu));
  $('.table__output--apfu-CaO').text(setToFixed(CaO_apfu));
  $('.table__output--apfu-MnO').text(setToFixed(MnO_apfu));
  $('.table__output--apfu-TiO2').text(setToFixed(TiO2_apfu));
  $('.table__output--apfu-SiO2').text(setToFixed(SiO2_apfu));
  $('.table__output--apfu-Cl').text(setToFixed(Cl_apfu));

  // corr table output
  var corrTable = $('.corr-table');

  $('.table__output--corr-Na2O').text(setToFixed(Na2O_corr));
  $('.table__output--corr-K2O').text(setToFixed(K2O_corr));
  $('.table__output--corr-Al2O3').text(setToFixed(Al2O3_corr));
  $('.table__output--corr-MgO').text(setToFixed(MgO_corr));
  $('.table__output--corr-FeO').text(setToFixed(FeO_ferric));
  $('.table__output--ferr-FeO').text(setToFixed(getFerricFactor()));
  $('.table__output--corr-CaO').text(setToFixed(CaO_corr));
  $('.table__output--corr-MnO').text(setToFixed(MnO_corr));
  $('.table__output--corr-TiO2').text(setToFixed(TiO2_corr));
  $('.table__output--corr-SiO2').text(setToFixed(SiO2_corr));
  $('.table__output--corr-Cl').text(setToFixed(Cl_corr));

  // ferr table output
  var ferrTable = $('.ferr-table');

  $('.table__output--ferr-Na2O').text(setToFixed(Na2O_corr));
  $('.table__output--ferr-K2O').text(setToFixed(K2O_corr));
  $('.table__output--ferr-Al2O3').text(setToFixed(Al2O3_corr));
  $('.table__output--ferr-MgO').text(setToFixed(MgO_corr));
  $('.table__output--ferr-FeO').text(setToFixed(FeOneg_apfu));
  $('.table__output--ferr-FeO').text(setToFixed(FeO_ferric));
  $('.table__output--ferr-CaO').text(setToFixed(CaO_corr));
  $('.table__output--ferr-MnO').text(setToFixed(MnO_corr));
  $('.table__output--ferr-TiO2').text(setToFixed(TiO2_corr));
  $('.table__output--ferr-SiO2').text(setToFixed(SiO2_corr));
  $('.table__output--ferr-Cl').text(setToFixed(Cl_corr));

  // //tables visibility
  // if (getApfuSumm() <= 13)  {
  //   apfuTable.style.display = 'table';
  //   corrTable.style.display = 'none';
  //   ferrTable.style.display = 'none';
  // } else if (getApfuSumm() > 13 && getFerricFactor() > 0) {
  //   apfuTable.style.display = 'none';
  //   corrTable.style.display = 'table';
  //   ferrTable.style.display = 'none';
  // } else if (getApfuSumm() > 13 && getFerricFactor() < 0) {
  //   apfuTable.style.display = 'none';
  //   corrTable.style.display = 'none';
  //   ferrTable.style.display = 'table';
  // }

  //tables visibility
  if (getApfuSumm() <= 13)  {
    $('.apfu-table').show();
    $('.corr-table').hide();
    $('.ferr-table').hide();
  } else if (getApfuSumm() > 13 && getFerricFactor() > 0) {
    $('.apfu-table').hide();
    $('.corr-table').show();
    $('.ferr-table').hide();
  } else if (getApfuSumm() > 13 && getFerricFactor() < 0) {
    $('.apfu-table').hide();
    $('.corr-table').hide();
    $('.ferr-table').show();
  }

};

// set buttons events
$('.button--calculate').on('click', function () {
  calculate();
});
$('.button--clear').on('click', function () {
  clear();
});

// thats all, fu(l)cks