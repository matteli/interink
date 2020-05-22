# coding: UTF-8
"""
iimc.py
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
#class C:
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
		self.OptionParser.add_option("--graphic",
			action="store", type="string", 
			dest="graphic", default='button',
			help="")
		self.OptionParser.add_option("--nbchoices",
			action="store", type="int", 
			dest="nbchoices", default='2',
			help="")
						
		self.OptionParser.add_option("--answer1",
			action="store", type="inkbool", 
			dest="answer1", default='false',
			help="")
		self.OptionParser.add_option("--answer2",
			action="store", type="inkbool", 
			dest="answer2", default='false',
			help="")
		self.OptionParser.add_option("--answer3",
			action="store", type="inkbool", 
			dest="answer3", default='false',
			help="")
		self.OptionParser.add_option("--answer4",
			action="store", type="inkbool", 
			dest="answer4", default='false',
			help="")
		self.OptionParser.add_option("--answer5",
			action="store", type="inkbool", 
			dest="answer5", default='false',
			help="")
		self.OptionParser.add_option("--answer6",
			action="store", type="inkbool", 
			dest="answer6", default='false',
			help="")
		self.OptionParser.add_option("--answer7",
			action="store", type="inkbool", 
			dest="answer7", default='false',
			help="")
		self.OptionParser.add_option("--answer8",
			action="store", type="inkbool", 
			dest="answer8", default='false',
			help="")
		self.OptionParser.add_option("--answer9",
			action="store", type="inkbool", 
			dest="answer9", default='false',
			help="")
		self.OptionParser.add_option("--answer10",
			action="store", type="inkbool", 
			dest="answer10", default='false',
			help="")
		
	def effect(self):
		if self.inMasterLayer()==False: return
		self.copy()
		return
			
	def copy(self):
		iianswer=['0']		
		iianswer.append(self.options.answer1)
		iianswer.append(self.options.answer2)
		iianswer.append(self.options.answer3)
		iianswer.append(self.options.answer4)
		iianswer.append(self.options.answer5)
		iianswer.append(self.options.answer6)
		iianswer.append(self.options.answer7)
		iianswer.append(self.options.answer8)
		iianswer.append(self.options.answer9)
		iianswer.append(self.options.answer10)

		if self.options.graphic==u'button':
			mc=self.getiiNode(u'mc1')
		elif self.options.graphic==u'case':
			mc=self.getiiNode(u'mc2')
		else :
			return

		if mc==False:
			return
		
		mc.set(u'{' + inkex.NSS["interink"] + u'}tries', str(self.options.nbtries))
		if (self.options.correction==True):
			mc.set(u'{' + inkex.NSS["interink"] + u'}endcorrection', u"true")
		else:
			mc.set(u'{' + inkex.NSS["interink"] + u'}endcorrection', u"false")
		mcobjects=self.findFirstChild(mc, u'mcobjects')
		mcobject=self.findFirstChild(mcobjects, u'mcobject1s')
		if self.options.nbchoices>1:
			for i in range(2, self.options.nbchoices+1):
				mcobject.set(u'id',u'mcobject' + str(i) +u's')
				mcobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiChoice' + str(i))
				if iianswer[i]==True:
					mcobject.set(u'{' + inkex.NSS["interink"] + u'}answer', u'true')
				else:
					mcobject.set(u'{' + inkex.NSS["interink"] + u'}answer', u'false')
				mcobject.set(u'transform',u'translate(0,'+ str(50*(i-1)) + u')')
				mcobjectcopy=self.copyNode(mcobject)
				mcobjects.append(mcobjectcopy)
		mcobject.set(u'id',u'mcobject1s')
		mcobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiChoice1')
		if iianswer[1]==True:
			mcobject.set(u'{' + inkex.NSS["interink"] + u'}answer', u'true')
		else:
			mcobject.set(u'{' + inkex.NSS["interink"] + u'}answer', u'false')
		mcobject.set(u'transform',u'')
		mcreturn=self.findFirstChild(mc, u'mcreturn')
		mcreturn.set(u'transform',u'translate(0,'+ str(50*(self.options.nbchoices-1)) + ')')
		mcfeedback=self.findFirstChild(mc, u'mcfeedback')
		mcfeedback.set(u'transform',u'translate(0,'+ str(50*(self.options.nbchoices-1)) + ')')
		
		self.pasteNodeOnLayer(mc)
		return
c = C()
c.affect()
#c.effect()
