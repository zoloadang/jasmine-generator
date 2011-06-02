/**
 * @fileoverview 获取当前 host.
 * @author 释然<nanzhienai@163.com>
 */
//子曰: 人而无信, 不知其可也. 大车无倪, 小车无杌, 其何以行之哉! <论语 - 为政>
;(function(K, T) {

	var D = K.DOM,
		h = location.host,
		DAILY_REG = /(?:(.+)\.)*daily\.(.+?)\.net/i,
		FORMAL_REG = /(?:(.+)\.)*([^.]+?)\.com/i,
		HOST_REG = /\{(.+?)Server\}/i,
		EMPTY = '',
		uri;

	/**
	 * 获取当前 host
	 * @name T.uri
	 */
	uri = {

		/**
		 * @lends T.uri
		 * @static
		 */

		/**
		 * 判断是否是 daily
		 * @private
		 */
		_checkDaily: function() {

			return h.indexOf('.daily.') > -1;

		},

		/**
		 * 获取 server 地址
		 * @param { String } url 需要获取的 server 地址.
		 * @param { Boolean } addStamp 是否添加时间戳.
		 * @return { String } 修改后的 server 地址.
		 * @spec test server address
		 * @example:
		 * 		TS.uri.getServer('http://jianghu.{taobaoServer}/home.htm'); //print: 'http://jianghu.taobao.com/home.htm'
		 * 		TS.uri.getServer('http://www.{tmallServer}/index.html'); //print: 'http://www.tmall.com/index.html'
		 */
		getServer: function(url, addStamp) {

			var host = this,
				m = HOST_REG.exec(url),
				server,
				ret;

			if (!(m && m[1])) {

				ret = url;

			} else {

				server = m[1];

				if (!host._checkDaily()) {

					ret = url.replace(HOST_REG, server + '.com');

				} else {

					ret = url.replace(HOST_REG, 'daily.' + server + '.net');

				}

			}

			if (addStamp) {

				return host.addStamp(ret);

			}

			return ret;

		},

		/**
		 * 获取 cdn 地址
		 * @param { String } url 需要修改的 url, 可选.
		 * @return { String } 如果没有设置 url 则返回 host.
		 * @spec test cdn address
		 * @example:
		 * 		TS.uri.getCdn('p/sns/1.0/tbra-sns.js'); //print: 'http://a.tbcdn.cn/p/sns/1.0/tbra-sns.js'
		 */
		getCdn: function(url) {

			var host = this,
				cdn = host._checkDaily() ? 'http://assets.daily.taobao.net/' : 'http://a.tbcdn.cn/';

			return url ? (cdn + url) : cdn;

		},

		/**
		 * 添加时间戳
		 * @param { String } url 需要添加时间戳的 url.
		 * @return { String } 添加时间戳后的 url.
		 * @spec test timestamp
		 * @example:
		 * 		TS.uri.addStamp('http://www.12sui.cn/'); //print: 'http://www.12sui.cn/?t=1232421394'
		 */
		addStamp: function(url) {

			var mark = this._checkQmark(url) ? '&' : '?',
				day = new Date().getTime();

			return url + mark + 't=' + day;

		},

		/**
		 * 检查是否包含 ?
		 * @private
		 * @param { String } url 需要检查的 url.
		 * @return { Boolean } 如果含有 ?, 返回 true, 否则返回 false.
		 */
		_checkQmark: function(url) {

			return url.indexOf('?') > -1;

		},

		/**
		 * 构建 url
		 * @param { String } url 初始 url.
		 * @param { String | Object } params 要拼接的参数串.
		 * @return { String } 构建好的字符串.
		 */
		buildUri: function(url, params) {

			var mark = this._checkQmark(url) ? '&' : '?';

			return url + mark + (K.isPlainObject(params) ? K.param(params) : params);

		},

		/**
		 * encode 编码, 与 escape 不同, 不会对英文标点之类的编码, 另外如果对象中 value 值为对象或者数组, 不会做处理
		 * @param { String Object } str 需要编码的字符串或者对象.
		 * @return { String } 编码后的字符串.
		 */
		encode: function(str) {

			var regexp = /[^\x00-\xff]/g,
				m, s, _str = EMPTY,
				i;

			if (K.isPlainObject(str)) {

				for (i in str) {

					var value = str[i];

					if (K.isString(value)) {

						value = value.replace(/(%|&|\?|#)/g, function(nul, k) {
								   return escape(k);
							 }).replace(/\+/g, '%2b');

					}

					_str += i + '=' + value + '&';

				}

			} else {

				_str = str;

			}

			if (!K.isString(_str)) {

				return false;

			}

			s = _str;

			while (m = regexp.exec(_str)) {

				s = s.split(m[0]).join(escape(m[0]).split('%').join('\\'));

			}

			return s;

		}

	};

	return T.uri = uri;

})(KISSY, TS);
