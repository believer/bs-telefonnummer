// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Riktnummer = require("./Riktnummer.bs.js");

function clean(phoneNumber) {
  var normalized = phoneNumber.replace("(0)", "").replace(/\D+/gi, "");
  var withPhone = function (from) {
    return "0" + normalized.substr(from);
  };
  var pn = normalized.substring(0, 4);
  if (pn.startsWith("0046")) {
    return withPhone(4);
  } else if (pn.startsWith("460")) {
    return withPhone(3);
  } else if (pn.startsWith("46")) {
    return withPhone(2);
  } else {
    return normalized;
  }
}

var Normalize = {
  clean: clean
};

function make(phoneNumber) {
  return "tel:" + clean(phoneNumber);
}

var Link = {
  make: make
};

function replacer(regex, replaceWithOpt, param) {
  var replaceWith = replaceWithOpt !== undefined ? replaceWithOpt : "$1-$2 $3 $4";
  return function (param) {
    return param.replace(regex, replaceWith);
  };
}

function fiveDigit(areaCode) {
  return new RegExp("^(\\d{" + String(areaCode) + "})(\\d{3})(\\d{2})$");
}

function sixDigit(areaCode) {
  return new RegExp("^(\\d{" + String(areaCode) + "})(\\d{2})(\\d{2})(\\d{2})$");
}

function sevenDigit(areaCode) {
  return new RegExp("^(\\d{" + String(areaCode) + "})(\\d{3})(\\d{2})(\\d{2})$");
}

function eightDigit(areaCode) {
  return new RegExp("^(\\d{" + String(areaCode) + "})(\\d{3})(\\d{3})(\\d{2})$");
}

var regex = /^08/;

var sixDigit$1 = replacer(sixDigit(2), undefined, undefined);

var sevenDigit$1 = replacer(sevenDigit(2), undefined, undefined);

var eightDigit$1 = replacer(eightDigit(2), undefined, undefined);

var regex$1 = /^0(1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|7[0235-9]|9[09])/;

var fiveDigit$1 = replacer(fiveDigit(3), "$1-$2 $3", undefined);

var sixDigit$2 = replacer(sixDigit(3), undefined, undefined);

var sevenDigit$2 = replacer(sevenDigit(3), undefined, undefined);

var sixDigit$3 = replacer(sixDigit(4), undefined, undefined);

function digits(value) {
  if (regex.test(value)) {
    return "Two";
  } else if (regex$1.test(value)) {
    return "Three";
  } else {
    return "Four";
  }
}

var phoneNumbers = [
  "888",
  "333",
  "222",
  "147"
];

var valid = /^07(0|2|3|6|9)\d{7}$/;

function findValidByRiktnummer(digits, trailingDigits) {
  var codes = Riktnummer.validRiktnummer.filter(function (param) {
            return param[0].length === digits;
          }).map(function (param) {
          return param[0];
        }).join("|");
  return new RegExp("^(" + codes + ")\\d{5," + String(trailingDigits) + "}$");
}

var validTwoDigit = /^08\d{6,7}$/;

var validThreeDigit = findValidByRiktnummer(3, 7);

var validFourDigit = findValidByRiktnummer(4, 6);

function typeOfNumber(number) {
  if (number.normalize().startsWith("07")) {
    return /* Mobile */1;
  } else if (phoneNumbers.includes(number)) {
    return /* VoiceMail */0;
  } else {
    return /* Landline */2;
  }
}

function parse(phoneNumber) {
  var match = typeOfNumber(phoneNumber);
  switch (match) {
    case /* VoiceMail */0 :
        return "Röstbrevlåda";
    case /* Mobile */1 :
        return Curry._1(sevenDigit$2, clean(phoneNumber));
    case /* Landline */2 :
        var pn = clean(phoneNumber);
        var match$1 = digits(pn);
        var match$2 = pn.length;
        var tmp;
        var exit = 0;
        if (match$1 === "Two") {
          switch (match$2) {
            case 8 :
                tmp = sixDigit$1;
                break;
            case 9 :
                tmp = sevenDigit$1;
                break;
            case 10 :
                tmp = eightDigit$1;
                break;
            default:
              exit = 1;
          }
        } else if (match$1 === "Three") {
          switch (match$2) {
            case 8 :
                tmp = fiveDigit$1;
                break;
            case 9 :
                tmp = sixDigit$2;
                break;
            case 10 :
                tmp = sevenDigit$2;
                break;
            default:
              exit = 1;
          }
        } else if (match$1 === "Four") {
          tmp = sixDigit$3;
        } else {
          exit = 1;
        }
        if (exit === 1) {
          tmp = (function (param) {
              return pn;
            });
        }
        return tmp(pn);
    
  }
}

function isValid(phoneNumber) {
  if (/[a-z]/gi.test(phoneNumber)) {
    return false;
  }
  var normalized = clean(phoneNumber);
  var digits$1 = digits(normalized);
  var typeOfNumber$1 = typeOfNumber(normalized);
  switch (typeOfNumber$1) {
    case /* VoiceMail */0 :
        return true;
    case /* Mobile */1 :
        return valid.test(normalized);
    case /* Landline */2 :
        if (digits$1 === "Three") {
          return validThreeDigit.test(normalized);
        } else if (digits$1 === "Four") {
          return validFourDigit.test(normalized);
        } else {
          return validTwoDigit.test(normalized);
        }
    
  }
}

var Validate = {
  isValid: isValid
};

exports.Validate = Validate;
exports.Normalize = Normalize;
exports.Link = Link;
exports.typeOfNumber = typeOfNumber;
exports.parse = parse;
/* sixDigit Not a pure module */
