/**
 * Created by Victor on 24/04/2015.
 */
var initTFN = function() {
    return { n1: 0, n2: 0, n3: 0 };
};

var add = function(TFN1, TFN2) {
    return {
        n1: TFN1.n1 + TFN2.n1,
        n2: TFN1.n2 + TFN2.n2,
        n3: TFN1.n3 + TFN2.n3
    };
};

var substract = function(TFN1, TFN2) {
    return {
        n1: TFN1.n1 - TFN2.n1,
        n2: TFN1.n2 - TFN2.n2,
        n3: TFN1.n3 - TFN2.n3
    };
};

var multiply = function(TFN, k) {
    if(TFN.constructor === Array) {
        var res = [];
        for (var i = 0; i < TFN.length; i++) {
            res.push(multiply(TFN[i], k));
        }
        return res;
    }
    else {
        return {
            n1: TFN.n1 * k,
            n2: TFN.n2 * k,
            n3: TFN.n3 * k
        };
    }
};

var cumSum = function(arrayTFN) {
    var res = initTFN();
    for (var i = arrayTFN.length - 1; i >= 0; i--) {
        res = add(res, arrayTFN[i]);
    };
    return res;
};

/**
 * Function that returns the Euclidean Fuzzy Near Compactness of tho Triangular Fuzzy Numbers.
 * @param  {Triangular Fuzzy Number} 	TFN1 	First Triangular Fuzzy Number.
 * @param  {Triangular Fuzzy Number} 	TFN2 	Second Triangular Fuzzy Number.
 * @return {Number}      Euclidean Fuzzy Near Compactness.
 */
var getEFNC = function(TFN1, TFN2) {
    var a1 = Math.pow(Math.abs(TFN1.n1 - TFN2.n1), 2),
        a2 = Math.pow(Math.abs(TFN1.n2 - TFN2.n2), 2),
        a3 = Math.pow(Math.abs(TFN1.n3 - TFN2.n3), 2);
    return Math.sqrt((a1 + a2 + a3) / 3);
};