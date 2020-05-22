# coding: UTF-8
"""
iidd.py
Copyright 2009-2010 Matthieu Nué

This file is part of InterInk.
#
#    InterInk is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    InterInk is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with InterInk.  If not, see <http://www.gnu.org/licenses/>.
"""

import sys
import inkex
import iilib


class C(iilib.iiLib):
	def __init__(self):
		iilib.iiLib.__init__(self)
		self.OptionParser.add_option("--nbtries",
			action="store", type="int", 
			dest="nbtries", default='2',
			help="")
		self.OptionParser.add_option("--correction",
			action="store", type="inkbool", 
			dest="correction", default='true',
			help="")
		self.OptionParser.add_option("--nbobjects",
			action="store", type="int", 
			dest="nbobjects", default='4',
			help="")
		self.OptionParser.add_option("--nbtargets",
			action="store", type="int", 
			dest="nbtargets", default='4',
			help="")
		
	def effect(self):
		if self.inMasterLayer()==False: return
		self.copy()
			
	def copy(self):
		dd=self.getiiNode(u'dd')
		if dd==False:
			return
		dd.set(u'{' + inkex.NSS['interink'] + u'}tries', str(self.options.nbtries))
		if (self.options.correction==True):
			dd.set(u'{' + inkex.NSS['interink'] + u'}endcorrection', u"true")
		else:
			dd.set(u'{' + inkex.NSS['interink'] + u'}endcorrection', u"false")
		ddtargets=self.findFirstChild(dd, u'ddtargets')
		ddtarget=self.findFirstChild(ddtargets, u'ddtarget1s')
		if self.options.nbtargets>1:
			for i in range(2, self.options.nbtargets+1):
				ddtarget.set(u'id',u'ddtarget' + str(i) +u's')
				ddtarget.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiTarget' + str(i))
				ddtarget.set(u'{' + inkex.NSS['interink'] + u'}objectwaited', u'object' + str(i))
				ddtarget.set(u'transform',u'translate(0,'+ str(90*(i-1)) + u')')
				ddtargetcopy=self.copyNode(ddtarget)
				ddtargets.append(ddtargetcopy)
		ddtarget.set(u'id',u'ddtarget1s')
		ddtarget.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiTarget1')
		ddtarget.set(u'{' + inkex.NSS['interink'] + u'}objectwaited', u'object1')
		ddtarget.set(u'transform',u'')
		
		ddobjects=self.findFirstChild(dd, u'ddobjects')
		ddobject=self.findFirstChild(ddobjects, u'ddobject1s')
		if self.options.nbobjects>1:
			for i in range(2, self.options.nbobjects+1):
				ddobject.set(u'id',u'ddobject' + str(i) + u's')
				ddobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiObject' + str(i))
				ddobject.set(u'{' + inkex.NSS['interink'] + u'}ref', 'object'+str(i))
				ddobject.set(u'transform',u'translate(0,'+ str(90*(i-1)) + u')')
				ddobjectcopy=self.copyNode(ddobject)
				ddobjects.append(ddobjectcopy)
		ddobject.set(u'id',u'ddobject1s')
		ddobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiObject1')
		ddobject.set(u'{' + inkex.NSS['interink'] + u'}ref', u'object1')
		ddobject.set(u'transform',u'')
		
		if (self.options.nbobjects>self.options.nbtargets):
			maxnb=self.options.nbobjects
		else:
			maxnb=self.options.nbtargets
		
		ddreturn=self.findFirstChild(dd, u'ddreturn')
		ddreturn.set(u'transform',u'translate(0,'+ str(90*(maxnb-1)) + ')')
		ddreset=self.findFirstChild(dd, u'ddreset')
		ddreset.set(u'transform',u'translate(0,'+ str(90*(maxnb-1)) + ')')
		ddfeedback=self.findFirstChild(dd, u'ddfeedback')
		ddfeedback.set(u'transform',u'translate(0,'+ str(90*(maxnb-1)) + ')')
		
		self.pasteNodeOnLayer(dd)
		return
c = C()
c.affect()
