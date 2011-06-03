/**
 * @fileoverview test
 * @author nanzhi<nanzhienai@163.com>
 */

/**
 * ²âÊÔº¯Êý
 * @name Test
 * @namespace
 */
var Test = {

	/**
	 * simple method
	 * @param { String } str ×Ö·û´®
	 * @return { String } ×Ö·û´®
	 * @example
	 * 	Test.simple('hehe'); //print: 'HEHE'
	 */
	simple: function(str) {

		return str.toUpperCase();

	},

	/**
	 * complex method
	 * @param { String } json json ×Ö·û´®
	 * @return { Object }
	 * @example:
	 * 	Test.complex('{"a":"b", "c":"d"}'); //print: {"a": "b", "c": "d"}
	 * @spec
	 * 	var ret = Test.complex('{"a":"b", "c":"d"}');
	 * 	ret['a'] -> 'b'	
	 * 	ret['b'] -> 'd'
	 */
	complex: function(json) {

		return eval('(' + json + ')');

	}

};
