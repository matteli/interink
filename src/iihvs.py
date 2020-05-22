# coding: UTF-8
"""
iihvs.py
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

import sys, copy
import inkex
import iilib


class C(iilib.iiLib):
#class C:
	def __init__(self):
		iilib.iiLib.__init__(self)
		self.OptionParser.add_option("--slide",
			action="store", type="string", 
			dest="slide", default='horizontale',
			help="")
		
	def effect(self):
		if self.inMasterLayer()==False: return
		self.copy()
	
	def copy(self):
		if self.options.slide==u'horizontale':
			object=self.getiiNode(u'hs')
			if object==False:
				return
		else:
			inkex.debug('Scroller verticale non implanté')
			object=self.getiiNode(u'vs')
			if object==False:
				return
		self.pasteNodeOnLayer(object)		
		return
c = C()
c.affect()
