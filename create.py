#coding:utf-8

import re, os
import os.path

#文件夹目录
rootdir = 'js/'

#模板文件
template = 'template.html'

#输出目录
outdir = 'case/'

#################################################################################################


#匹配注释行首
tab = re.compile(r'\s*\t*\*\s*\t*')

#匹配换行
wrap = re.compile(r'(\r|\n)')

#匹配 description
desc = re.compile(r'\s*\*\s*@fileoverview\s*')

#空格
space = '    '

#描述
description = ''

#匹配模板
jasmineTag = re.compile(r'\{JASMINE_CASE\}')

#匹配 js 地址
jspath = re.compile(r'\{JS_PATH\}')

#get description
def getDesc(source):
	desc = re.compile(r'\s*\*\s*@fileoverview\s*(.+)(\n|\r)')
	ret = desc.findall(source)
	if ret:
		return ret[0][0]
	return ''

#check spec start
def checkStart(line):
	start = re.compile(r'\s*\*\s*@spec\s*')
	if start.match(line):
		return 1
	return 0

#check spec end
def checkEnd(line):
	end = re.compile(r'^\s+\*\s*/')
	if end.match(line):
		return 1
	return 0

#get spec
def getSpec(source):

	#结果
	ret = []
	specList = []
	specDesc = ''

	#是否是用例
	isCase = 0

	#匹配 spec
	spec = re.compile(r'\s*\*\s*@spec\s*')

	for line in source:

		#匹配 spec description
		if spec.match(line):
			specDesc = wrap.sub('', line)
			specDesc = spec.sub('', specDesc)

		if checkEnd(line):
#			print line
#			print exampleEnd.match(line)
			isCase = 0
			if len(specList) > 0:
				specList.insert(0, specDesc)
				ret.append(specList)
				specList = []
				specDesc = ''

		#匹配用例
		if isCase:
			specList.append(tab.sub('', line))

		if checkStart(line):
#			print line 
#			print exampleStart.match(line)
			isCase = 1

	return ret

#crate spec
def createSpec(ret, source):

	#缩进个数
	ident = 1

	#代码
	code = []

	#匹配注释中心
	center = re.compile(r'\s*;?\s*=>\s*')

	if len(ret) > 0:

		#生成代码
		code.append('describe("' + wrap.sub('', getDesc(source)) + '", function() {')
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
				if center.search(text):
					code.append('expect(' + center.sub(').toBe(', text, 1) + ');')
				else:
					code.append(text);
				code.append('\n')

			ident -= 1
			code.append(ident * space)
			code.append('});')

		code.append('\n\n')
		ident -= 1
		code.append(ident * space)
		code.append('});')

#		print code

		#生成文件
		fi = open(template, 'r')
		testFi = open(outdir + f + '.html', 'w')
		html = fi.read()
		html = jspath.sub('../' + rootdir + f, html)
		testFi.write(jasmineTag.sub(''.join(code), html))
		testFi.close()
		fi.close()


#获取用例
for parent, dirnames, filename in os.walk(rootdir):

	for f in filename:

		path = os.path.join(parent, f)

		#获取用例
		ret = getSpec(open(path, 'r').readlines())

		#生成用例
		createSpec(ret, open(path, 'r').read())

