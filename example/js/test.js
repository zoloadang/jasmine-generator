/**
 * @fileoverview test
 * @author nanzhi<nanzhienai@163.com>
 */

/**
 * test function
 * @name Test
 * @namespace
 */
var Test = {

	/**
	 * simple method
	 * @param { String } str a string charactor
	 * @return { String } result
	 * @spec simple
	 * @example
	 * 		Test.simple('hehe'); => 'HEHE'
	 */
	simple: function(str) {

		return str.toUpperCase();

	},

	/**
	 * complex method
	 * @param { String } json json string
	 * @return { Object }
	 * @example
	 * 		Test.complex('{"a":"b", "c":"d"}'); => {"a": "b", "c": "d"}
	 * @spec complex1
	 * 		var ret1 = Test.complex('{"a":"b", "c":"d"}');
	 * 		ret1['a'] => 'b'	
	 * 		ret1['c'] => 'd'
	 * @spec complex2
	 * 		var ret2 = Test.complex('{"e":"f"}');
	 * 		ret2['e'] => 'f'	
	 */
	complex: function(json) {

		return eval('(' + json + ')');

	},

	/**
	 * sum method
	 * @param { Number } a one number
	 * @param { Number } b anthor number
	 * @return { Number } sum
	 * @spec get sum
	 * @example
	 * 		var a = 3 * 3,
	 * 			b = 10 / 5;
	 * 		Test.sum(a, b) // => 11; 
	 */
	sum: function(a, b) {

		return a + b;

	}

};
