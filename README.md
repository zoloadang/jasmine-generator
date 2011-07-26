jasmine creater:
===================================================================

jasmine creater 是什么?
---------------------------------

这是一款根据注释自动生成 jasmine 用例的工具, 可以帮你节省书写用例的时间, 目前支持生成 html 文件或者 js 文件.

使用条件:
---------------------------------

* js 注释遵循 jsdoc 规则(http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml);
* 本地安装 `python 2.4` 以上版本(暂不支持 3.x 版本);

注释写法:
---------------------------------

在 js 注释中增添 `@spec` 标记, 如果跟 `@example` 并用, 必须写在 `@example` 标签之前, 该标签与函数无关, 你可以将用例注释写在文件中的任何地方, 但是建议与函数写在一起:

* 简单模式:

  	可以将 example 和用例结合使用, example 就是用例:

		/**
		 * simple method
		 * @param { String } str a string charactor
		 * @return { String } result
		 * @spec simple
		 * @example
		 * 		Test.simple('hehe'); => 'HEHE'
		 * 		Test.simple('haha'); -> 'HAHA'
		 */

* 高级模式:

  	可能简单模式会影响 jsdoc 中 example 的输出, 这时可以将用例单独书写:

		/**
		 * complex method
		 * @param { String } json json string
		 * @return { Object }
		 * @example:
		 * 		Test.complex('{"a":"b", "c":"d"}'); => {"a": "b", "c": "d"}
		 * @spec complex1
		 * 		var ret1 = Test.complex('{"a":"b", "c":"d"}');
		 * 		ret1['a'] => 'b'	
		 * 		ret1['c'] => 'd'
		 * @spec complex2
		 * 		var ret2 = Test.complex('{"e":"f"}');
		 * 		ret2['e'] => 'f'	
		 */

其中 `=>` 或者 `->` 前边为要检测的语句, 后边为预期的结果.


运行脚本:
---------------------------------

* windows:

	将以下代码保存在 run.bat 文件中:

		python create.py root="js" out="case" template="template.html" restore="true"

	运行 run.bat 文件, 或者直接在命令行下运行以上命令.

* ubuntu:

	命令行下运行:

		python create.py root="js" out="case" template="template.html"

* 在 Ant 中使用:

	需要引入 pyAntTasks-1.3.3.jar, 然后运行 python 即可, 示例文件在 build.xml 中:

		<?xml version="1.0" encoding="utf-8"?>
		<project name="build jasmine case" default="build" basedir=".">

			<!-- 定义变量 -->
			<property name="root" value="root=example/js"/>
			<property name="out" value="out=example/case"/>

			<!-- compile -->
			<target name="compile">
				<taskdef name="py-run" classname="org.pyant.tasks.PythonRunTask" classpath="pyAntTasks-1.3.3.jar"/>
			</target>

			<!-- case -->
			<target name="runcase" depends="compile">
				<py-run script="create.py">
					<arg value="${root}"/>
					<arg value="${out}"/>
					<arg value="template=example/template.html"/>
				</py-run>
				<py-run script="create.py">
					<arg value="${root}"/>
					<arg value="${out}"/>
					<arg value="template=example/template.js"/>
				</py-run>
			</target>

			<target name="build" depends="runcase"> </target>
			
		</project>

	将以上代码保存在 build.xml 中, 然后命令行进入目录, 运行 ant runcase.

参数说明:
---------------------------------

* root: 该参数为文件的源路径, 也就是你要生成用例的 js 文件所在的文件夹目录, 主要不要在路径后边加 `/`;
* out: 该参数为用例文件的输出路径, 如果路径不存在则会自动创建, 主要不要在路径后边加 `/`;
* template: 该参数为用例输出模板路径, 可以为 .js 或者 .html 文件, 文件中的 `{JASMINE_CASE}` 将被替换为用例内容, `{JS_PATH}` 将被替换为当前 js 文件的路径, `{JS_NAME}` 将被替换为 js 文件名, 示例模块可以在 `example/template.html` 中找到;
* restore: 如果你需要转换 jsdoc 注释中的 `&lt; &gt;` 为 `< >` 时, 需要添加此参数, value 值为 `true`;

问题报告/意见建议:
---------------------------------

https://github.com/nanzhi/jasmine-creater/issues
