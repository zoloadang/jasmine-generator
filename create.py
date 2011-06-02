#coding:utf-8

import re, os
import os.path

#文件夹目录
rootdir = 'js/'

#模板文件
template = 'template.html'

#输出目录
outdir = 'case/'

#匹配 example
exampleStart = re.compile(r'^\s+\*\s*@example\:?\s*')
exampleEnd = re.compile(r'^\s+\*\s*/')

#匹配注释行首
tab = re.compile(r'\s*\t*\*\s*\t*')

#匹配注释中心
center = re.compile(r'\s*;?\s*//print\:\s*')

#匹配换行
wrap = re.compile(r'(\r|\n)')

#匹配 description
desc = re.compile(r'\s*\*\s*@fileoverview\s*')

#匹配 spec
spec = re.compile(r'\s*\*\s*@spec\s*')

#是否是用例
isCase = 0

#结果
ret = []

#代码
code = []

#缩进个数
ident = 1

#空格
space = '    '

#描述
description = ''

#匹配模板
jasmineTag = re.compile(r'\{JASMINE_CASE\}')

#匹配 js 地址
jspath = re.compile(r'\{JS_PATH\}')

#获取用例
for parent, dirnames, filename in os.walk(rootdir):

	for f in filename:

		path = os.path.join(parent, f)

		source = open(path, 'r').readlines()

		specList = []
		specDesc = ''

		for line in source:

			#匹配描述
			if desc.match(line):
				description = desc.sub('', line)

			#匹配 spec description
			if spec.match(line):
				specDesc = wrap.sub('', line)
				specDesc = spec.sub('', specDesc)

			if exampleEnd.match(line):
#				print line
#				print exampleEnd.match(line)
				isCase = 0
				if len(specList) > 0:
					specList.insert(0, specDesc)
					ret.append(specList)
					specList = []
					specDesc = ''

			#匹配用例
			if isCase:
				specList.append(tab.sub('', line))

			if exampleStart.match(line):
#				print line 
#				print exampleStart.match(line)
				isCase = 1

		#生成用例
		if len(ret) > 0:

			#生成代码
			code.append('describe("' + wrap.sub('', description) + '", function() {')
			ident += 2

			for alone in ret:

				code.append('\n\n')

				code.append(ident * space)
				ident += 1

				code.append('it("' + alone.pop(0) + '", function() {')

				code.append('\n')

				for case in alone:
					text = wrap.sub('', case)
					code.append(ident * space)
					code.append('expect(' + center.sub(').toBe(', text, 1) + ');')
					code.append('\n')

				ident -= 1
				code.append(ident * space)
				code.append('});')

			code.append('\n\n')
			ident -= 1
			code.append(ident * space)
			code.append('});')

#			print code

			#生成文件
			fi = open(template, 'r')
			testFi = open(outdir + f + '.html', 'w')
			html = fi.read()
			html = jspath.sub('../' + rootdir + f, html)
			testFi.write(jasmineTag.sub(''.join(code), html))
			testFi.close()
			fi.close()
