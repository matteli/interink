# coding: UTF-8
"""
iico.py
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
		self.OptionParser.add_option("--nblabel",
			action="store", type="int", 
			dest="nblabel", default='4',
			help="")
		self.OptionParser.add_option("--nbzone",
			action="store", type="int", 
			dest="nbzone", default='4',
			help="")
		
	def effect(self):
		if self.inMasterLayer()==False: return
		self.copy()
			
	def copy(self):
		dd=self.getiiNode(u'co')
		if dd==False:
			return
		dd.set(u'{' + inkex.NSS['interink'] + u'}tries', str(self.options.nbtries))
		if (self.options.correction==True):
			dd.set(u'{' + inkex.NSS['interink'] + u'}endcorrection', u"true")
		else:
			dd.set(u'{' + inkex.NSS['interink'] + u'}endcorrection', u"false")
		colabels=self.findFirstChild(dd, u'colabels')
		colabel=self.findFirstChild(colabels, u'colabel1s')
		if self.options.nblabel>1:
			for i in range(2, self.options.nblabel+1):
				colabel.set(u'id',u'colabel' + str(i) +u's')
				colabel.set(u'{' + inkex.NSS['interink'] + u'}ref', 'label'+str(i))
				colabel.set(u'transform',u'translate(0,'+ str(90*(i-1)) + ')')
				colabelcopy=self.copyNode(colabel)
				colabels.append(colabelcopy)
		colabel.set(u'id',u'colabel1s')
		colabel.set(u'{' + inkex.NSS['interink'] + u'}ref', 'label1')
		colabel.set(u'transform',u'')
		
		coobjects=self.findFirstChild(dd, u'coobjects')
		coobject=self.findFirstChild(coobjects, u'coobject1s')
		if self.options.nbzone>1:
			for i in range(2, self.options.nbzone+1):
				coobject.set(u'id',u'coobject' + str(i) + u's')
				coobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiZone' + str(i))
				coobject.set(u'{' + inkex.NSS['interink'] + u'}refwaited', 'label'+str(i))
				coobject.set(u'transform',u'translate(0,'+ str(90*(i-1)) + ')')
				coobjectcopy=self.copyNode(coobject)
				coobjects.append(coobjectcopy)
		coobject.set(u'id',u'coobject1s')
		coobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiZone1')
		coobject.set(u'{' + inkex.NSS['interink'] + u'}refwaited', u'label1')
		coobject.set(u'transform',u'')
		
		coreturn=self.findFirstChild(dd, u'coreturn')
		coreturn.set(u'transform',u'translate(0,'+ str(90*(self.options.nbzone-1)) + ')')
		cofeedback=self.findFirstChild(dd, u'cofeedback')
		cofeedback.set(u'transform',u'translate(0,'+ str(90*(self.options.nbzone-1)) + ')')
		
		self.pasteNodeOnLayer(dd)
		return
c = C()
c.affect()
