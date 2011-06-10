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
	 * 	Test.simple('hehe'); => 'HEHE'
	 */
	simple: function(str) {

		return str.toUpperCase();

	},

	/**
	 * complex method
	 * @param { String } json json string
	 * @return { Object }
	 * @example:
	 * 	Test.complex('{"a":"b", "c":"d"}'); => {"a": "b", "c": "d"}
	 * @spec complex
	 * 	var ret = Test.complex('{"a":"b", "c":"d"}');
	 * 	ret['a'] => 'b'	
	 * 	ret['b'] => 'd'
	 */
	complex: function(json) {

		return eval('(' + json + ')');

	}

};
