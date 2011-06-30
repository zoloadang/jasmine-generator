jasmine creater:
===================================================================

jasmine creater 是什么?
---------------------------------

这是一款根据注释自动生成 jasmine 用例的工具, 可以帮你节省书写用例的时间, 目前支持生成 html 文件或者 js 文件.

使用条件:
---------------------------------

* js 注释遵循 jsdoc 规则(http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml);
* 本地安装 python 2.4 以上版本;

使用方法:
---------------------------------

* js 注释中增添了 <code>@spec</code> 标记, 支持两种用例定义方法:

	+ 简单模式:

		  可以将 example 和用例结合使用, example 就是用例:

				/**
				 * simple method
				 * @param { String } str a string charactor
				 * @return { String } result
				 * @spec simple
				 * @example
				 * 	Test.simple('hehe'); => 'HEHE'
				 */

	+ 复杂模式:

		  可能简单模式会影响 jsdoc 中 example 的输出, 这时可以将用例单独书写:

				/**
				 * complex method
				 * @param { String } json json string
				 * @return { Object }
				 * @example:
				 * 	Test.complex('{"a":"b", "c":"d"}'); => {"a": "b", "c": "d"}
				 * @spec complex1
				 * 	var ret1 = Test.complex('{"a":"b", "c":"d"}');
				 * 	ret1['a'] => 'b'	
				 * 	ret1['c'] => 'd'
				 * @spec complex2
				 * 	var ret2 = Test.complex('{"e":"f"}');
				 * 	ret2['e'] => 'f'	
				 */

  	其中 <code>=></code> 前边为要检测的语句, 后边为预期的结果.

* windows:

	修改 run.bat 文件中参数:

		python create.py root="js" out="case" template="template.html"

	其中 <code>root</code> 为需要生成用例的 js 文件夹, <code>out</code> 为输出用例的文件夹, <code>template</code> 为用例模板.

	运行 run.bat 文件, 或者直接在命令行下运行以上命令.

* ubuntu:

	命令行下运行:

		python create.py root="js" out="case" template="template.html"

* 在 Ant 中使用:

	需要引入 pyAntTasks-1.3.3.jar, 然后运行 python 即可, 示例文件在 build.xml 中:

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

欢迎大家试用并提出宝贵意见, 谢谢大家. (email: nanzhienai@163.com, blog: http://www.12sui.cn)

