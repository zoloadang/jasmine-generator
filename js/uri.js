/**
 * @fileoverview ��ȡ��ǰ host.
 * @author ��Ȼ<nanzhienai@163.com>
 */
//��Ի: �˶�����, ��֪���Ҳ. ������, С�����, �������֮��! <���� - Ϊ��>
;(function(K, T) {

	var D = K.DOM,
		h = location.host,
		DAILY_REG = /(?:(.+)\.)*daily\.(.+?)\.net/i,
		FORMAL_REG = /(?:(.+)\.)*([^.]+?)\.com/i,
		HOST_REG = /\{(.+?)Server\}/i,
		EMPTY = '',
		uri;

	/**
	 * ��ȡ��ǰ host
	 * @name T.uri
	 */
	uri = {

		/**
		 * @lends T.uri
		 * @static
		 */

		/**
		 * �ж��Ƿ��� daily
		 * @private
		 */
		_checkDaily: function() {

			return h.indexOf('.daily.') > -1;

		},

		/**
		 * ��ȡ server ��ַ
		 * @param { String } url ��Ҫ��ȡ�� server ��ַ.
		 * @param { Boolean } addStamp �Ƿ����ʱ���.
		 * @return { String } �޸ĺ�� server ��ַ.
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
		 * ��ȡ cdn ��ַ
		 * @param { String } url ��Ҫ�޸ĵ� url, ��ѡ.
		 * @return { String } ���û������ url �򷵻� host.
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
		 * ���ʱ���
		 * @param { String } url ��Ҫ���ʱ����� url.
		 * @return { String } ���ʱ������ url.
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
		 * ����Ƿ���� ?
		 * @private
		 * @param { String } url ��Ҫ���� url.
		 * @return { Boolean } ������� ?, ���� true, ���򷵻� false.
		 */
		_checkQmark: function(url) {

			return url.indexOf('?') > -1;

		},

		/**
		 * ���� url
		 * @param { String } url ��ʼ url.
		 * @param { String | Object } params Ҫƴ�ӵĲ�����.
		 * @return { String } �����õ��ַ���.
		 */
		buildUri: function(url, params) {

			var mark = this._checkQmark(url) ? '&' : '?';

			return url + mark + (K.isPlainObject(params) ? K.param(params) : params);

		},

		/**
		 * encode ����, �� escape ��ͬ, �����Ӣ�ı��֮��ı���, ������������� value ֵΪ�����������, ����������
		 * @param { String Object } str ��Ҫ������ַ������߶���.
		 * @return { String } �������ַ���.
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
