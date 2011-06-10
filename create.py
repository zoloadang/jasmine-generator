#coding:utf-8

import re, os, sys
import os.path

#获取输出路径
args = sys.argv

#匹配 =
rootReg = re.compile(r'root=')
tempReg = re.compile(r'template=')
outReg = re.compile(r'out=')

for arg in args:
	#文件夹目录
	if rootReg.search(arg):
		rootdir = rootReg.sub('', arg)
	#模板文件
	if tempReg.search(arg):
		template = tempReg.sub('', arg)
	#输出目录
	if outReg.search(arg):
		outdir = outReg.sub('', arg)

#################################################################################################


#匹配换行
wrap = re.compile(r'(\r|\n)')

#空格
space = '    '

#get description
def getDesc(source):
	desc = re.compile(r'\s*\*\s*@fileoverview\s*(.+)(\n|\r)')
	ret = desc.findall(source)
	if ret:
		return ret[0][0]

#check spec start
def checkStart(line):
	start = re.compile(r'\s*\*\s*@spec\s*')
	return start.search(line)

#check spec end
def checkEnd(line):
	end = re.compile(r'^\s+\*\s*/')
	return end.search(line)

#check example start
def checkAt(line):
	at = re.compile(r'\s*\*\s*@')
	return at.search(line)

#get spec
def getSpec(source):

	#结果
	ret = []
	specList = []
	specDesc = ''

	#是否是用例
	isCase = 0

	#匹配注释行首
	tab = re.compile(r'\s*\t*\*\s*\t*')

	#匹配 spec
	spec = re.compile(r'\s*\*\s*@spec\s*')

	for line in source:

		#end
		if checkEnd(line) or (checkAt(line) and isCase > 2):
#			print line
#			print exampleEnd.match(line)
			isCase = 0
			if len(specList) > 0:
				specList.insert(0, specDesc)
				ret.append(specList)
				specList = []
				specDesc = ''

		#匹配 spec description
		if spec.match(line):
			specDesc = wrap.sub('', line)
			specDesc = spec.sub('', specDesc)

		#匹配用例
		if isCase:
			isCase += 1
			if not checkAt(line) or isCase > 2:
				specList.append(tab.sub('', line))

		#start
		if checkStart(line):
#			print line 
#			print exampleStart.match(line)
			isCase = 1

	return ret

#crate spec
def createSpec(ret, source, fname):

	#缩进个数
	ident = 1

	#代码
	code = []

	#匹配注释中心
	center = re.compile(r'\s*;?\s*=>\s*')

	#匹配模板
	jasmineTag = re.compile(r'\{JASMINE_CASE\}')

	#匹配 js 地址
	jspath = re.compile(r'\{JS_PATH\}')

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
		testFi = open(outdir + fname + '.html', 'w')
		html = fi.read()
		html = jspath.sub('../' + rootdir + fname, html)
		testFi.write(jasmineTag.sub(''.join(code), html))
		testFi.close()
		fi.close()


#run
def run():
	for parent, dirnames, filename in os.walk(rootdir):
		for f in filename:
			path = os.path.join(parent, f)
			#获取用例
			ret = getSpec(open(path, 'r').readlines())
			#生成用例
			createSpec(ret, open(path, 'r').read(), f)

run()
