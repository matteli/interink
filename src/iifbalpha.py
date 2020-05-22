# coding: UTF-8
"""
iifbalpha.py
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
		self.OptionParser.add_option("--nbanswers",
			action="store", type="int", 
			dest="nbanswers", default='1',
			help="")
			
		self.OptionParser.add_option("--tab",
			action="store", type="string", 
			dest="tab", default="answer1",
			help="The selected UI-tab when OK was pressed")
			
		self.OptionParser.add_option("--valueanswer1",
			action="store", type="string", 
			dest="valueanswer1", default='',
			help="")
		self.OptionParser.add_option("--message1",
			action="store", type="string", 
			dest="message1", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer2",
			action="store", type="string", 
			dest="valueanswer2", default='',
			help="")
		self.OptionParser.add_option("--message2",
			action="store", type="string", 
			dest="message2", default='Entrer le texte de la bonne réponse.',
			help="")
			
		self.OptionParser.add_option("--valueanswer3",
			action="store", type="string", 
			dest="valueanswer3", default='',
			help="")
		self.OptionParser.add_option("--message3",
			action="store", type="string", 
			dest="message3", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer4",
			action="store", type="string", 
			dest="valueanswer4", default='',
			help="")
		self.OptionParser.add_option("--message4",
			action="store", type="string", 
			dest="message4", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer5",
			action="store", type="string", 
			dest="valueanswer5", default='',
			help="")
		self.OptionParser.add_option("--message5",
			action="store", type="string", 
			dest="message5", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer6",
			action="store", type="string", 
			dest="valueanswer6", default='',
			help="")
		self.OptionParser.add_option("--message6",
			action="store", type="string", 
			dest="message6", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer7",
			action="store", type="string", 
			dest="valueanswer7", default='',
			help="")
		self.OptionParser.add_option("--message7",
			action="store", type="string", 
			dest="message7", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer8",
			action="store", type="string", 
			dest="valueanswer8", default='',
			help="")
		self.OptionParser.add_option("--message8",
			action="store", type="string", 
			dest="message8", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer9",
			action="store", type="string", 
			dest="valueanswer9", default='',
			help="")
		self.OptionParser.add_option("--message9",
			action="store", type="string", 
			dest="message9", default='Entrer le texte de la bonne réponse.',
			help="")

		self.OptionParser.add_option("--valueanswer10",
			action="store", type="string", 
			dest="valueanswer10", default='',
			help="")
		self.OptionParser.add_option("--message10",
			action="store", type="string", 
			dest="message10", default='Entrer le texte de la bonne réponse.',
			help="")
			
		
	def effect(self):
		if self.inMasterLayer()==False: return
		self.copy()
		
	
	def copy(self):
		iivalueanswer=['0']
		iimessage=['0']
		
		
		iivalueanswer.append(self.options.valueanswer1)
		iimessage.append(self.options.message1)
		iivalueanswer.append(self.options.valueanswer2)
		iimessage.append(self.options.message2)
		iivalueanswer.append(self.options.valueanswer3)
		iimessage.append(self.options.message3)
		iivalueanswer.append(self.options.valueanswer4)
		iimessage.append(self.options.message4)
		iivalueanswer.append(self.options.valueanswer5)
		iimessage.append(self.options.message5)
		iivalueanswer.append(self.options.valueanswer6)
		iimessage.append(self.options.message6)
		iivalueanswer.append(self.options.valueanswer7)
		iimessage.append(self.options.message7)
		iivalueanswer.append(self.options.valueanswer8)
		iimessage.append(self.options.message8)
		iivalueanswer.append(self.options.valueanswer9)
		iimessage.append(self.options.message9)
		iivalueanswer.append(self.options.valueanswer10)
		iimessage.append(self.options.message10)
		
		
		fb=self.getiiNode(u'fb')
		if fb==False:
			return
		fb.set(u'{' + inkex.NSS["interink"] + u'}tries', str(self.options.nbtries))
		if (self.options.correction==True):
			fb.set(u'{' + inkex.NSS["interink"] + u'}endcorrection', u"true")
		else:
			fb.set(u'{' + inkex.NSS["interink"] + u'}endcorrection', u"false")
		fbobjects=self.findFirstChild(fb, u'fbobjects')
		if fbobjects==False:return
		fbobject=self.findFirstChild(fbobjects, u'fbobject1s')
		if fbobject==False:return
		if self.options.nbanswers>1:
			for i in range(2, self.options.nbanswers+1):
				fbobject.set(u'id',u'fbobject' + str(i) +u's')
				fbobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiAnswer' + str(i))
				fbobject.set(u'{' + inkex.NSS["interink"] + u'}alphanum', u'alpha')
				fbobject.set(u'{' + inkex.NSS["interink"] + u'}answer', unicode(iivalueanswer[i],'iso-8859-1'))
				fbobject.set(u'{' + inkex.NSS["interink"] + u'}pcerror', u'')
				fbobject.set(u'{' + inkex.NSS["interink"] + u'}box', unicode(iimessage[i],'iso-8859-1'))
				fbobject.set(u'transform',u'translate(0,'+ str(50*(i-1)) + u')')
				fbobjectcopy=self.copyNode(fbobject)
				fbobjects.append(fbobjectcopy)
		fbobject.set(u'id',u'fbobject1s')
		fbobject.set(u'{' + inkex.NSS['inkscape'] + u'}label', u'iiAnswer1')
		fbobject.set(u'{' + inkex.NSS["interink"] + u'}alphanum', u'alpha')
		fbobject.set(u'{' + inkex.NSS["interink"] + u'}answer', unicode(iivalueanswer[1],'iso-8859-1'))
		fbobject.set(u'{' + inkex.NSS["interink"] + u'}pcerror', u'')
		fbobject.set(u'{' + inkex.NSS["interink"] + u'}box', unicode(iimessage[1],'iso-8859-1'))
		fbobject.set(u'transform','')
		fbreturn=self.findFirstChild(fb, u'fbreturn')
		fbreturn.set(u'transform',u'translate(0,'+ str(50*(self.options.nbanswers-1)) + ')')
		fbfeedback=self.findFirstChild(fb, u'fbfeedback')
		fbfeedback.set(u'transform',u'translate(0,'+ str(50*(self.options.nbanswers-1)) + ')')
		
		self.pasteNodeOnLayer(fb)
		return
c = C()
c.affect()
