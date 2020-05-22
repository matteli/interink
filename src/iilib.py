# coding: UTF-8
"""
iilib.py
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


# These two lines are only needed if you don't put the script directly into
# the installation directory
import sys, copy, random, os, re
# Unix
#sys.path.append(u'/usr/share/inkscape/extensions')
# OS X
#sys.path.append(u'/Applications/Inkscape.app/Contents/Resources/extensions')
# Windows
#sys.path.append(u'C:\Program Files\Inkscape\share\extensions')

# We will use the inkex module with the predefined Effect base class.
import inkex
# The simplestyle module provides functions for style parsing.
from simplestyle import *

try:
	from lxml import etree
except:
	sys.exit(u'The fantastic lxml wrapper for libxml2 is required by inkex.py and therefore this extension. Please download and install the latest version from <http://cheeseshop.python.org/pypi/lxml/>, or install it through your package manager by a command like: sudo apt-get install python-lxml')


class iiLib(inkex.Effect):
	def __init__(self):
        # Call the base class constructor.
		inkex.Effect.__init__(self)
		# Define string option "--what" with "-w" shortcut and default value "World".
		#self.OptionParser.add_option("-m", "--max", action="store", type="float", dest="max", default=0.0, help="maximum segment length")
		extpath = os.path.dirname(sys.argv[0])
		extpath = os.path.abspath(extpath)
		self.objectPath=extpath+u"/iilib/"
		inkex.NSS["interink"] = u"http://www.interink.org/namespaces/interink"
	
	def copyNode(self, node):
		clone=copy.deepcopy(node)
		clone.set(u"id", self.uniqueId(clone.get(u"id")))
		for child in clone.iterdescendants():
			child.set(u"id", self.uniqueId(child.get(u"id")))
		return clone
	
	def pasteNodeOnLayer(self, node):
		clone=self.copyNode(node)
		self.current_layer.append(clone)
		return

	def uniqueId(self, id):
		#id="%s%04i"%(prefix,random.randint(0,9999))
		if (re.search(u'[0-9]{4}$',id)!=None):
			id=re.sub(u'[0-9]{4}$',unicode(random.randint(1000,9999)),id)
		else:
			id=re.sub('$',unicode(random.randint(1000,9999)),id)
		while len(self.document.getroot().xpath(u'//*[@id="%s"]' % id,namespaces=inkex.NSS)):
			#id="%s%04i"%(prefix,random.randint(0,9999))
			if (re.search(u'[0-9]{4}$',id)!=None):
				id=re.sub(u'[0-9]{4}$',unicode(random.randint(1000,9999)),id)
			else:
				id=re.sub(u'$',unicode(random.randint(1000,9999)),id)
		return(id)
		
	def parseSVG(self,file):
		#"""Parse document in specified file or on stdin"""
		try:
			stream = open(file,'r')
			doc=etree.parse(stream)
			stream.close()
		except:
			inkex.debug('File ' + str(file) + ' not found')
			doc=False	
		return (doc)
		
	def findFirstChild(self, node, id):
		for child in node.iterchildren():
			a=child.get(u"id")
			if a==id:
				return child
		inkex.debug(str(id) + ' not found in ' + str(node))
		return False
		
	def getiiNode(self, type):
		path=self.objectPath + type +u".svg"
		file=self.parseSVG(path)
		if file==False:
			return False
		svg=file.getroot()
		node=self.findFirstChild(svg, type)
		if node==False:
			inkex.debug('Corruption du fichier '+ path)
			return False
		return node
		
	def addLinkScript(self, nomScript):
		for node in self.document.xpath(u"//svg:script[@id='"+nomScript+u"']", namespaces=inkex.NSS):
			node.getparent().remove(node)
		scriptElm = inkex.etree.Element(inkex.addNS(u"script", u"svg"))
		scriptElm.set(u"{" + inkex.NSS[u"xlink"]+ u"}href", nomScript)
		scriptElm.set(u"id",nomScript)
		self.document.getroot().append(scriptElm)
		
	def inMasterLayer(self):
		layer=self.current_layer
		while layer!=None:
			if layer.get(u"{" + inkex.NSS[u"interink"]+ u"}type")=='root':
				return True
			layer=layer.getparent()
		inkex.debug("Vous devez sélectionner le calque 'interinkdoc' ou un calque enfant.")
		return False