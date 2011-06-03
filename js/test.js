/**
 * @fileoverview test
 * @author nanzhi<nanzhienai@163.com>
 */

/**
 * ���Ժ���
 * @name Test
 * @namespace
 */
var Test = {

	/**
	 * simple method
	 * @param { String } str �ַ���
	 * @return { String } �ַ���
	 * @example
	 * 	Test.simple('hehe'); //print: 'HEHE'
	 */
	simple: function(str) {

		return str.toUpperCase();

	},

	/**
	 * complex method
	 * @param { String } json json �ַ���
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
