#coding:utf-8
#quote http://hi.baidu.com/tinylee/blog/item/763177c6820444199c163da8.html, thanks

import os, itertools

def all_equal(elements):
    return len(set(elements)) == 1

def common_prefix(*sequences):
    # if there are no sequences at all, we're done
	#print sequences
	if not sequences: 
		return [], []
    # loop in parallel on the sequences 
	common = []
	for elements in itertools.izip(*sequences): 
		#print elements
        # unless all elements are equal, bail out of the loop 
		if not all_equal(elements): 
			break 
        # got one more common element, append it and keep looping 
        common.append(elements[0])
    # return the common prefix and unique tails 
	#print common
	#print [ sequence[len(common) - 1:] for sequence in sequences ]
	return common, [ sequence[len(common) - 1:] for sequence in sequences ]

def relpath(p1, p2, sep=os.path.sep, pardir=os.path.pardir):
	common, (u1, u2) = common_prefix(p1.split(sep), p2.split(sep))
	if not common:
		return p2 
	if u2[0] == '.':
		u2 = u2[1:]
		length = len(u1) - 1
	else:
		length = len(u1)
	return sep.join([pardir] * length + u2)
