# coding: UTF-8
"""
iinew.py
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

import sys, copy, os
# Unix
#sys.path.append(u'/usr/share/inkscape/extensions')
# OS X
#sys.path.append(u'/Applications/Inkscape.app/Contents/Resources/extensions')
# Windows
#sys.path.append(u'C:\Program Files\Inkscape\share\extensions')
#try:
#   import wx
#   from wx.lib.mixins.listctrl import CheckListCtrlMixin, ListCtrlAutoWidthMixin, TextEditMixin
#except ImportError:
#   raise ImportError,u"The wxPython module is required to run this program"
import inkex
import iilib

class iiNew(iilib.iiLib):
    def __init__(self):
        # Call the base class constructor.
        iilib.iiLib.__init__(self)
        self.OptionParser.add_option("--nbquestions",
        action="store", type="int", 
        dest="nbquestions", default='0',
        help="")
        
        self.OptionParser.add_option("--scorm",
        action="store", type="inkbool", 
        dest="scorm", default='false',
        help="")
        
        self.version = u"0.4.0"



    '''def addLinkScript(self, nomScript):
        for node in self.document.xpath(u"//svg:script[@id='"+nomScript+u"']", namespaces=inkex.NSS):
            node.getparent().remove(node)
        scriptElm = inkex.etree.Element(inkex.addNS(u"script", u"svg"))
        scriptElm.set(u"{" + inkex.NSS[u"xlink"]+ u"}href", u"./" + nomScript)
        scriptElm.set(u"id",nomScript)
        self.document.getroot().append(scriptElm)'''
    
    def addInlineScript(self, scriptId, scriptFile):
        # Create new script node
        scriptElm = inkex.etree.Element(inkex.addNS(u"script", u"svg"))
        scriptElm.text = open(os.path.join(self.objectPath,scriptFile)).read()
        scriptElm.set(u"id",scriptId)
        self.document.getroot().append(scriptElm)
    
    def removeInLineScript(self, scriptId):
        # Find and delete old script node
        for node in self.document.xpath(u"//svg:script[@id='" + scriptId + "']", namespaces=inkex.NSS):
            node.getparent().remove(node)
        
    def effect(self):
        # Find and delete old script node
        '''for node in self.document.xpath(u"//svg:script[@id='iiFunc']", namespaces=inkex.NSS):
            node.getparent().remove(node)
        # Create new script node
        scriptElm = inkex.etree.Element(inkex.addNS(u"script", u"svg"))
        scriptElm.text = open(os.path.join(self.objectPath,"iiFunc.js")).read()
        scriptElm.set(u"id",u"iiFunc")
        self.document.getroot().append(scriptElm)'''
        
        self.removeInLineScript(u"iiLib")
        self.addInlineScript(u"iiLib", u"iiLib.js")
        
        self.removeInLineScript(u"APIWrapper")
        self.removeInLineScript(u"SCOFunctions")
        if (self.options.scorm == True):
            self.addInlineScript(u"APIWrapper",u"APIWrapper.js")
            self.addInlineScript(u"SCOFunctions",u"SCOFunctions.js")
        
        svgdoc=self.document.getroot()
        svgdoc.set("onload", "init(evt)")
        for child in svgdoc.iterdescendants():
            idsvg=child.get(u"id")
            if idsvg==u'interinkdoc':
                child.set(u'{'+inkex.NSS['interink']+u'}scoremaxi', str(self.options.nbquestions))
                child.set(u'{'+inkex.NSS['interink']+u'}scorm', str(self.options.scorm))
                child.set(u'{'+inkex.NSS['interink']+u'}version', self.version)
                return
        
        interink=self.getiiNode(u'interink')
        #interink = inkex.etree.Element(inkex.addNS(u"g", u"svg"))
        interink.set(u'{'+inkex.NSS['inkscape']+u'}groupmode',u'layer')
        interink.set(u'{'+inkex.NSS['inkscape']+u'}label',u'interinkdoc')
        interink.set(u'{'+inkex.NSS['interink']+u'}score', u'0')
        interink.set(u'{'+inkex.NSS['interink']+u'}scoremaxi', str(self.options.nbquestions))
        interink.set(u'{'+inkex.NSS['interink']+u'}scorm', str(self.options.scorm))
        interink.set(u'{'+inkex.NSS['interink']+u'}version', self.version)
        interink.set(u'{'+inkex.NSS['interink']+u'}type', u'root')
        interink.set(u'id',u'interinkdoc')
        clone=copy.deepcopy(interink)
        self.current_layer.append(clone)
        #self.pasteNodeOnLayer(interink)
c = iiNew()
c.affect()

