//iiFunc.js
//Copyright 2009-2010 Matthieu Nue
//
//This file is part of InterInk.
//
//    InterInk is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    InterInk is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with InterInk.  If not, see <http://www.gnu.org/licenses/>.

//general function
//window.onload = init;
//linkToLMS="";

// Creating a namespace dictionary. The standard Inkscape namespaces are taken from inkex.py.
var NSS = new Object();
NSS['sodipodi']='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd';
NSS['cc']='http://web.resource.org/cc/';
NSS['svg']='http://www.w3.org/2000/svg';
NSS['dc']='http://purl.org/dc/elements/1.1/';
NSS['rdf']='http://www.w3.org/1999/02/22-rdf-syntax-ns#';
NSS['inkscape']='http://www.inkscape.org/namespaces/inkscape';
NSS['xlink']='http://www.w3.org/1999/xlink';
NSS['xml']='http://www.w3.org/XML/1998/namespace';
NSS['interink']='http://www.interink.org/namespaces/interink';

function init(evt){
    var doc=findRootDoc(evt);
	var scorm=doc.getAttributeNS(NSS['interink'],'scorm');
    if (scorm == 'True') linkToLMS = "link";
    else linkToLMS = "";

	if (linkToLMS=="link") loadPage();
}

/*function hiddenAllDiapo(evt, without){
	var doc=findRootDoc(evt);
	var child = doc.firstChild;
	while (child!=null){
		if (child=="[object SVGGElement]"){
			number=child.getAttributeNS(NSS['inkscape'],'label');
			if (number!=without) child.setAttribute("visibility","hidden");
			else child.setAttribute("visibility","visible");
		}
		child=child.nextSibling;
	}
}*/

function findRootDoc(evt) {
	var svgdoc=evt.target.ownerDocument;
	var layer=svgdoc.getElementById("interinkdoc");
	return layer;
}

function getChildsTypeGoup(object, type, number){
	if (number==null) number=1;
	if (object==null) return null;
	var counter=0;
	var child = object.firstChild;
	
	while(child!=null){
		if (child=="[object SVGGElement]"){
			atr=child.getAttributeNS(NSS['interink'],'type');
			if (atr==type) ++counter;
			if (counter==number) break;
		} else {
			atr=null;
		}
		child=child.nextSibling;
	}
	return (child);
}

function getParentTypeGroup(object, type){
	while(object!=null){
		if (object=="[object SVGGElement]"){
			atr=object.getAttributeNS(NSS['interink'],'type');
			if (atr==type) break;
		}
		object = object.parentNode;
	}
	return object;
}

function isMasked(object){
	var mask=getChildsTypeGoup(object, "mask")
	var styleMask=mask.getAttributeNS(NSS['interink'],'mask');
	if (styleMask=="true") return true;
	else return false;
}

function masking(object, visible){
	var mask=getChildsTypeGoup(object,"mask");
	if (visible){
		mask.setAttribute("style","visibility:hidden");
		mask.setAttributeNS(NSS["interink"],"mask","false");
	} else {
		mask.setAttribute("style","visibility:visible");
		mask.setAttributeNS(NSS["interink"],"mask","true");
	}
}

function point (x, y){
	if (x=="undefined") var x=0;
	if (y=="undefined") var y=0;
    this.x = x;
    this.y = y;
}

function getTriesDone(question){
	var triesDone = parseInt(question.getAttributeNS(NSS['interink'],'triesdone'));
	++triesDone;
	question.setAttributeNS(NSS['interink'],'triesdone',triesDone);
	return triesDone;
}

function getTries(question){
	var tries = parseInt(question.getAttributeNS(NSS['interink'],'tries'));
	return tries;
}

function getEndCorrection(question){
	var endcorrection=question.getAttributeNS(NSS['interink'],'endcorrection');
	if (endcorrection=="true") return true;
	else return false;
}

function clearFeedbacks(question){
	var feedback=getChildsTypeGoup(question,"feedback",1);
	var feed=getChildsTypeGoup(feedback,"good",1);
	feed.setAttribute("style","visibility:hidden");
	var feed=getChildsTypeGoup(feedback,"false",1);
	feed.setAttribute("style","visibility:hidden");
	var feed=getChildsTypeGoup(feedback,"correction",1);
	feed.setAttribute("style","visibility:hidden");
	return feedback;
}

function removeActionOnAnswer(objects){
	objects.setAttribute("onmousedown","");
	objects.setAttribute("onmousemove","");
	objects.setAttribute("onmouseup","");
	objects.setAttribute("onclick","");
	objects.setAttribute("cursor","default");
}

function addScore(evt){
	var doc=findRootDoc(evt);
	var score=doc.getAttributeNS(NSS['interink'],'score');
	++score;
	doc.setAttributeNS(NSS['interink'],'score',score);
}

function addScoreMaxi(evt){
	var doc=findRootDoc(evt);
	var score=doc.getAttributeNS(NSS['interink'],'scoretempmaxi');
	++score;
	doc.setAttributeNS(NSS['interink'],'scoretempmaxi',score);
}

function changeToCorrection(question){
	var kreturn=getChildsTypeGoup(question,"return");
	kreturn.setAttributeNS(NSS['interink'],'selected',"correction");
	var validate=getChildsTypeGoup(kreturn,"validate");
	validate.setAttribute("style","visibility:hidden");
	var correction=getChildsTypeGoup(kreturn,"correction");
	correction.setAttribute("style","visibility:visible");
}

function hiddenVisibleGroupButton(question,whichgroup, which, visible){
	var group=getChildsTypeGoup(question,whichgroup);
	var a=1;
	var button;
	while ((button=getChildsTypeGoup(group,which,a))!=null){
		masking(button, visible);
		//var mask=getChildsTypeGoup(button,"mask");
		a++;
		/*if (visible){
			mask.setAttribute("style","visibility:hidden");
			mask.setAttributeNS(NSS["interink"],"mask","false");
		} else {
			mask.setAttribute("style","visibility:visible");
			mask.setAttributeNS(NSS["interink"],"mask","true");
		}*/
	}
		
}

function hiddenVisibleButton(question, which, visible){
	var button=getChildsTypeGoup(question, which);
	masking(button, visible);
	/*var mask=getChildsTypeGoup(button,"mask");
	if (visible){
		mask.setAttribute("style","visibility:hidden");
		mask.setAttributeNS(NSS["interink"],"mask","false");
	} else {
		mask.setAttribute("style","visibility:visible");
		mask.setAttributeNS(NSS["interink"],"mask","true");
	}*/
}

function getElement(target, type){
	var child = target.firstChild;
	while (child!=null){
		/*if ((type=="rect" && child=="[object SVGRectElement]") ||
		(type=="text" && child=="[object SVGTextElement]") ||
		(type=="line" && child=="[object SVGLineElement]")
		) return child;*/
		if (child=="[object SVG" + type + "Element]") return child;
		child=child.nextSibling;
	}
	return false;
}

function getText(target){
	var textBalise=getElement(target, "Text");
	var textSpan=getElement(textBalise, "TSpan");
	if (textSpan==false) return textBalise;
	else return textSpan;
}

function First2UpperCase(texte) {
    var t = new Array();
    for(j=0 ; j < texte.length ;j++) {
    if(j == 0) t[j] = texte.substr(j,1).toUpperCase();
    else t[j] = texte.substr(j,1).toLowerCase();
    }
    return t.join('');
}

function giveResult(val)
{
	n = doLMSGetValue("cmi.interactions._count");
	s = "cmi.interactions." + n + "." + "result";
	doLMSSetValue(s , val);
	return;
}

function goodAnswer(evt,question,feedback){
	var feed=getChildsTypeGoup(feedback,"good");
	feed.setAttribute("style","visibility:visible");
	addScore(evt);
	addScoreMaxi(evt);
	var objects=getChildsTypeGoup(question,"objects");
	removeActionOnAnswer(objects);
	hiddenVisibleButton(question, "return", false);
	if (linkToLMS=="link") giveResult("correct");
}

function wrongAnswerNoCorrection(evt,question,feedback){
	var feed=getChildsTypeGoup(feedback,"false");
	feed.setAttribute("style","visibility:visible");
	addScoreMaxi(evt);
	hiddenVisibleButton(question, "return", false);
	var objects=getChildsTypeGoup(question,"objects");
	removeActionOnAnswer(objects);
	if (linkToLMS=="link") giveResult("wrong");
}

function wrongAnswerCorrection(evt,question,feedback){
	var feed=getChildsTypeGoup(feedback,"correction");
	feed.setAttribute("style","visibility:visible");
	addScoreMaxi(evt);
	changeToCorrection(question);
	var objects=getChildsTypeGoup(question,"objects");
	removeActionOnAnswer(objects);
	if (linkToLMS=="link") giveResult("wrong");
}

function continueQuestion(feedback){
	var feed=getChildsTypeGoup(feedback,"false");
	feed.setAttribute("style","visibility:visible");
}

function endQuizz(evt){
	var doc=findRootDoc(evt);
	var score=parseFloat(doc.getAttributeNS(NSS["interink"],"score"));
	var scoremaxi=parseFloat(doc.getAttributeNS(NSS["interink"],"scoremaxi"));
	var scoretempmaxi=parseFloat(doc.getAttributeNS(NSS["interink"],"scoretempmaxi"));
	var scoremaxitotal=max(score,scoremaxi)
	if (scoremaxitotal>0) var pcscore=score/scoremaxitotal*100;
	else var pcscore=0;
	if (linkToLMS=="link") doQuit("completed", pcscore );
}

function max(val1, val2){
	if (val1>val2)
		return val1
	else
		return val2
}

function getTranslateCoordinate(object){
	var x=0;
	var y=0;
	var translate=object.getAttribute("transform");
	if (translate==null) {
		var returnfunc=new point(x,y);
		return returnfunc;
	}
	var beginBracket=translate.lastIndexOf("translate(")+9;
	if (beginBracket==8){
		var returnfunc=new point(x,y);
		return returnfunc;
	}
	var comma=translate.indexOf(",",beginBracket);
	var endBracket=translate.indexOf(")",beginBracket);
	if (comma==-1 || comma>endBracket){
		x=parseInt(translate.substring(beginBracket+1,endBracket));
	}else{
		x=parseInt(translate.substring(beginBracket+1,comma));
		y=parseInt(translate.substring(comma+1,endBracket));
	}
	var returnfunc=new point(x,y);
	return returnfunc;
}

/*function getTranslateCoordinate(object){
	var x=0;
	var y=0;
	var translate=object.getAttribute("transform");
	if (translate==null) {
		var returnfunc=new point(x,y);
		return returnfunc;
	}
	var carac=0;
	do{
		transchar=translate.indexOf("translate", carac);
		scalechar=translate.indexOf("scale", carac);
		matrixchar=translate.indexOf("matrix", carac);
		var minchar=Math.min(transchar, scalechar, matrixchar);
		var beginBracket=translate.lastIndexOf("translate(")+9;
		if (beginBracket==8){
			var returnfunc=new point(x,y);
			return returnfunc;
		}
		var comma=translate.indexOf(",",beginBracket);
		var endBracket=translate.indexOf(")",beginBracket);
		if (comma==-1 || comma>endBracket){
			x=parseInt(translate.substring(beginBracket+1,endBracket));
		}else{
			x=parseInt(translate.substring(beginBracket+1,comma));
			y=parseInt(translate.substring(comma+1,endBracket));
		}
	}
	var returnfunc=new point(x,y);
	return returnfunc;
}*/

//end general function

//object change diapo
function edClic(evt){
	var evtTarget=evt.target;
	var object=getParentTypeGroup(evtTarget,"edend");
	if (isMasked(object)) return;
	masking(object,false);
	endQuizz(evt);
}

function cdNext(evt){
	var evtTarget = evt.target;
	var object=getParentTypeGroup(evtTarget,"cdnext");
	var next=object.getAttributeNS(NSS["interink"],"next");
	
	//recherche du calque parent au passeur
	while ((object = object.parentNode)!=null){
		var atr=object.getAttributeNS(NSS["inkscape"],"groupmode");
		if (atr=="layer") break;
	}
	
	if (object==null) {
		alert("Passeur de diapo pas dans un layer");
		return;
	}
	
	var hidelayer;
	//object.setAttribute("style","display:none");
	
	//Recherche le calque parent au calque rendu invisible
	do {
		hidelayer=object;
		while ((object = object.parentNode)!=null){
			var atr=object.getAttributeNS(NSS["inkscape"],"groupmode");
			if (atr=="layer") break;
		}
		if (object==null) {
			alert("Passeur de diapo dans le calque racine.");
			return;
		}
		var namelayerparent=object.getAttributeNS(NSS["inkscape"],"label");
		var done=false;
		var child = object.firstChild;
		do{
			if (child=="[object SVGGElement]"){
				var number=child.getAttributeNS(NSS["inkscape"],"label");
				var atr=object.getAttributeNS(NSS["inkscape"],"groupmode");
				if (atr=="layer" && number==next) {
					child.setAttribute("style","display:inline");
					done=true;
					break;
				}
			}
			child=child.nextSibling;
		} while (child!=null);
	}while (done==false && namelayerparent!="interinkdoc")
	
	if (done==false) alert("layer " + next +" introuvable")
	else hidelayer.setAttribute("style","display:none");;
		
}
// end object change diapo

// object multiple choice (mc)
function mcReturnClick(evt){
	var evtTarget = evt.target;
	var mcreturn=getParentTypeGroup(evtTarget, "return");
	if (isMasked(mcreturn)) return;
	var selected=mcreturn.getAttributeNS(NSS["interink"],"selected");
	
	if (selected=="validate") mcValidateClick(evt);
	else mcCorrectionClick(evt)
	
}

function mcValidateClick(evt){
	var evtTarget = evt.target;

	var question=getParentTypeGroup(evtTarget, "question");
	
	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	var good=true;
	var object;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		a++;
		if(object!=null && mcTestAnswer(object)==false) good=false;
	}
	
	var tries=getTries(question);
	var triesDone=getTriesDone(question);
	var ec=getEndCorrection(question);
	var feedback=clearFeedbacks(question);
	
	if (good==true) {
		//reponse bonne
		goodAnswer(evt,question,feedback);
	} else if (triesDone<tries)  {
		//reponse fausse
		continueQuestion(feedback);
	} else if (ec) {
		//derniere reponse fausse et correction
		wrongAnswerCorrection(evt,question,feedback);
	} else {
		//derniere reponse fausse sans correction
		wrongAnswerNoCorrection(evt,question,feedback);
	}
}

function mcCorrectionClick(evt){
	var evtTarget = evt.target;
	var question = getParentTypeGroup(evtTarget,"question");

	var objects=getChildsTypeGoup(question,"objects");
	var object;
	var a=1;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		++a;
		var goodanswer=object.getAttributeNS(NSS["interink"],"answer");
		mcAnswerSelect(object, goodanswer);
	}
	hiddenVisibleButton(question, "return", false);
}

function mcAnswerClick(evt){
	var evtTarget = evt.target;
	var object=getParentTypeGroup(evtTarget, "object");
	
	
	var selected=object.getAttributeNS(NSS["interink"],"selected");
	
	if (selected=="false"){
		selected="true";
	}else{
		selected="false";
	}
	mcAnswerSelect(object, selected);
}

function mcAnswerSelect(object, selection){
	object.setAttributeNS(NSS["interink"],"selected",selection);
	
	if (selection=="true"){
		var sel=getChildsTypeGoup(object, "selected")
		if (sel!=null) sel.setAttribute("style","visibility:visible");
		sel=getChildsTypeGoup(object, "notselected")
		if (sel!=null) sel.setAttribute("style","visibility:hidden");
	} else {
		var sel=getChildsTypeGoup(object, "notselected")
		if (sel!=null) sel.setAttribute("style","visibility:visible");
		sel=getChildsTypeGoup(object, "selected")
		if (sel!=null) sel.setAttribute("style","visibility:hidden");
	}	
}

function mcTestAnswer(object){
	var answer=object.getAttributeNS(NSS["interink"],"answer");
	var selected=object.getAttributeNS(NSS["interink"],"selected");
	if(answer==selected) return true;
	else return false;
}
// end object multiple choice

// object drag and drop
function ddInit(question){
	if (question.getAttribute("ddinit")=="true") return;
	question.setAttribute("ddinit","true");
	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	var object;
	while ((object=getChildsTypeGoup(objects,"object",a))!=null){
		++a;
		ddLetOriginTransform(object);
	}
	hiddenVisibleButton(question, "reset", true);
}

function ddDownObject(evt){
	
	ddChangeDrag(evt,true);
	
	var evtTarget = evt.target;
	var object=getParentTypeGroup(evtTarget,"object");
	var ref=object.getAttributeNS(NSS["interink"],"ref");
	var question=getParentTypeGroup(evtTarget,"question");
	var targets=getChildsTypeGoup(question,"targets");
	var target;
	var a=1;
	while((target=getChildsTypeGoup(targets,"target",a))!=null){
		++a;
		var op=target.getAttributeNS(NSS["interink"],"objectpresent");
		if(ref==op) return;
	}
	ddLetOrigin(evt,object);
	ddInit(question);
	var objects=getParentTypeGroup(object,"objects");
	objects.setAttributeNS(NSS["interink"],"selected",ref)
}

function ddLetOrigin(evt,object){
	var trans=new point;
	trans=getTranslateCoordinate(object);
	var x1=(evt.clientX)-trans.x;
	var y1=(evt.clientY)-trans.y;
	var target = evt.target;
	var question=getParentTypeGroup(target,"question");
	question.setAttributeNS(NSS["interink"],"x1",x1);
	question.setAttributeNS(NSS["interink"],"y1",y1);
}

function ddLetOriginTransform(object){
	var trans=new point;
	trans=getTranslateCoordinate(object);
	object.setAttributeNS(NSS["interink"],"xo",trans.x);
	object.setAttributeNS(NSS["interink"],"yo",trans.y);
}

function ddGetOriginTransform(object){
	var x=parseInt(object.getAttributeNS(NSS["interink"],"xo"));
	var y=parseInt(object.getAttributeNS(NSS["interink"],"yo"));
	var returnfunc=new point(x,y)
	return returnfunc;
}

function ddGetOrigin(evt){
	var target = evt.target;
	var question=getParentTypeGroup(target,"question");
	var x=question.getAttributeNS(NSS["interink"],"x1");
	x=parseInt(x);
	var y=question.getAttributeNS(NSS["interink"],"y1");
	y=parseInt(y);
	var returnfunc=new point(x,y)
	return returnfunc;
}

function ddIsDrag(evt){
	var target = evt.target;
	var question=getParentTypeGroup(target,"question");
	var drag=question.getAttributeNS(NSS["interink"],"drag");
	if (drag=="true") return true;
	else return false;
}

function ddChangeDrag(evt,dragged){
	var target = evt.target;
	var question=getParentTypeGroup(target,"question");
	if (dragged) question.setAttributeNS(NSS["interink"],"drag","true");
	else question.setAttributeNS(NSS["interink"],"drag","false");
}

function ddMoveObject(evt){
	if (ddIsDrag(evt)){
		var ddx2=parseInt(evt.clientX);
		var ddy2=parseInt(evt.clientY);
		var target = evt.target;
		var objects=getParentTypeGroup(target,"objects");
		var ref=objects.getAttributeNS(NSS["interink"],"selected");
		if (ref!=""){
			var a=1;
			var object;
			while((object=getChildsTypeGoup(objects,"object",a))!=null){
				++a;
				var refobj=object.getAttributeNS(NSS["interink"],"ref");
				if (refobj==ref) break;
			}
			
			var ori=new point;
			ori=ddGetOrigin(evt);
			
			object.setAttribute("transform","translate(" + (ddx2-ori.x) + "," + (ddy2-ori.y) + ")");
		}
	}
}

function ddCorrectionClick(evt){
	var evtTarget = evt.target;
	var question=getParentTypeGroup(evtTarget,"question");
	ddReset(question);
	var targets=getChildsTypeGoup(question,"targets");
	//var targets=getChildsTypeGoup(question, "targets");
	coor=getTranslateCoordinate(targets);
	var a=1;
	var target;
	while((target=getChildsTypeGoup(targets,"target",a))!=null){
		++a;
		var refobjwaited=target.getAttributeNS(NSS["interink"],"objectwaited");
		//coordonnee et taille de la cible
		var xt=coor.x;
		var yt=coor.y;
		var dxt;
		var dyt;
		
		if ((child=getElement(target,"Rect"))==false) return;
		xt+=parseInt(child.getAttribute("x"));
		yt+=parseInt(child.getAttribute("y"));
		dxt=parseInt(child.getAttribute("width"));
		dyt=parseInt(child.getAttribute("height"));
		
		var transTarget=new point;
		transTarget=getTranslateCoordinate(target);
		xt+=transTarget.x;
		yt+=transTarget.y;
		
	
		var objects=getChildsTypeGoup(question,"objects");
		var b=1;
		var object;
		while((object=getChildsTypeGoup(objects,"object",b))!=null){
			++b;
			var refobj=object.getAttributeNS(NSS["interink"],"ref");
			if (refobj==refobjwaited){
				//coordonnee et taille de l'objet deplace
				var trans=new point;
				trans=getTranslateCoordinate(objects);
				var xoObjs=trans.x;
				var yoObjs=trans.y;
				trans=getTranslateCoordinate(object);
				var xoObj=trans.x;
				var yoObj=trans.y;
				var sensRect=getChildsTypeGoup(object,"sensitiverect");
				if ((rectChild=getElement(sensRect,"Rect"))==false) return;
				var xoRect=parseInt(rectChild.getAttribute("x"));
				var yoRect=parseInt(rectChild.getAttribute("y"));
				dxo=parseInt(rectChild.getAttribute("width"));
				dyo=parseInt(rectChild.getAttribute("height"));
				
				var xe=xt-xoRect-xoObjs+dxt/2-dxo/2;
				var ye=yt-yoRect-yoObjs+dyt/2-dyo/2;
				object.setAttribute("transform","translate(" + xe + "," + ye + ")");
			}
		}
	}
	hiddenVisibleButton(question, "return", false);
}

function ddUpObject(evt){
	if (ddIsDrag(evt)){
		ddChangeDrag(evt,false);
		var evtTarget = evt.target;
		var question=getParentTypeGroup(evtTarget,"question");
		
		var objects=getParentTypeGroup(evtTarget,"objects");
		var ref=objects.getAttributeNS(NSS["interink"],"selected");
		objects.setAttributeNS(NSS["interink"],"selected","");
		if (ref!=""){
			var a=1;
			var object;
			while((object=getChildsTypeGoup(objects,"object",a))!=null){
				++a;
				var refobj=object.getAttributeNS(NSS["interink"],"ref");
				if (refobj==ref) break;
			}
			//coordonnee et taille de l'objet deplace
			var trans=new point;
			trans=getTranslateCoordinate(objects);
			var xoObjs=trans.x;
			var yoObjs=trans.y;
			trans=getTranslateCoordinate(object);
			var xoObj=trans.x;
			var yoObj=trans.y;
			var sensRect=getChildsTypeGoup(object,"sensitiverect");
			if ((rectChild=getElement(sensRect,"Rect"))==false) return;
			var xoRect=parseInt(rectChild.getAttribute("x"));
			var yoRect=parseInt(rectChild.getAttribute("y"));
			dxo=parseInt(rectChild.getAttribute("width"));
			dyo=parseInt(rectChild.getAttribute("height"));

			var targets=getChildsTypeGoup(question, "targets");
			coor=getTranslateCoordinate(targets);
			var a=1;
			while((target=getChildsTypeGoup(targets,"target",a))!=null){
				++a;
				var objectpresent=target.getAttributeNS(NSS["interink"],"objectpresent");
				
				var xt=coor.x;
				var yt=coor.y;
				var dxt;
				var dyt;
				
				if ((child=getElement(target,"Rect"))==false) return;
				xt+=parseInt(child.getAttribute("x"));
				yt+=parseInt(child.getAttribute("y"));
				dxt=parseInt(child.getAttribute("width"));
				dyt=parseInt(child.getAttribute("height"));
				
				var transTarget=new point;
				transTarget=getTranslateCoordinate(target);
				xt+=transTarget.x;
				yt+=transTarget.y;
				
				var xo=xoObjs+xoObj+xoRect;
				var yo=yoObjs+yoObj+yoRect;

				if (objectpresent=="" && xo>=xt && yo>=yt && (xo+dxo)<=(xt+dxt) && (yo+dyo)<=(yt+dyt)){
					var xe=xt-xoRect-xoObjs+dxt/2-dxo/2;
					var ye=yt-yoRect-yoObjs+dyt/2-dyo/2;
					object.setAttribute("transform","translate(" + xe + "," + ye + ")");
					var ref=object.getAttributeNS(NSS["interink"],"ref");
					target.setAttributeNS(NSS["interink"],"objectpresent",ref);
					return;
				}
				trans=ddGetOriginTransform(object);
				object.setAttribute("transform","translate(" + trans.x + "," + trans.y + ")");
			}
		}	
	}
}

function ddResetClick(evt){
	var evtTarget=evt.target;
	var reset=getParentTypeGroup(evtTarget,"reset");
	if (isMasked(reset)) return;
	ddChangeDrag(evt,false);
	var question=getParentTypeGroup(evtTarget,"question");
	ddReset(question);
}

function ddReset(question){
	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	var object;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		++a;
		trans=ddGetOriginTransform(object);
		object.setAttribute("transform","translate(" + trans.x + "," + trans.y + ")");
	}
	
	var targets=getChildsTypeGoup(question,"targets");
	a=1;
	var target;
	while((target=getChildsTypeGoup(targets,"target",a))!=null){
		++a;
		target.setAttributeNS(NSS["interink"],"objectpresent","");
	}
	return;
}

function ddReturnClick(evt){
	var object = evt.target;
	var question=getParentTypeGroup(object, "question");
	ddInit(question);
	var kreturn=getParentTypeGroup(object, "return");
	if (isMasked(kreturn)) return;
	var selected=kreturn.getAttributeNS(NSS["interink"],"selected");
	
	if (selected=="validate") ddValidateClick(evt);
	else ddCorrectionClick(evt);
	
}

function ddValidateClick(evt){
	var object = evt.target;
	var question=getParentTypeGroup(object,"question");
	var targets=getChildsTypeGoup(question,"targets");
	
	var good=true;
	
	var a=1;
	while((target=getChildsTypeGoup(targets,"target",a))!=null){
		++a;
		var ow=target.getAttributeNS(NSS["interink"],"objectwaited");
		var op=target.getAttributeNS(NSS["interink"],"objectpresent");
		if (ow!=op) {
			good=false;
			break;
		}
	}

	var tries=getTries(question);
	var triesDone=getTriesDone(question);
	var ec=getEndCorrection(question);
	var feedback=clearFeedbacks(question);
	if (good==true) {
		//reponse bonne
		goodAnswer(evt,question,feedback);
		hiddenVisibleButton(question, "reset", false);
	} else if (triesDone<tries)  {
		//reponse fausse
		continueQuestion(feedback);
	} else if (ec) {
		//derniere reponse fausse et correction
		wrongAnswerCorrection(evt,question,feedback);
		hiddenVisibleButton(question, "reset", false);
	} else {
		//derniere reponse fausse sans correction
		wrongAnswerNoCorrection(evt,question,feedback);
		hiddenVisibleButton(question, "reset", false);
	}
}

// end object

//object Fill in Blank
function fbAnswerClick(evt){
	var evtTarget=evt.target;
	var object=getParentTypeGroup(evtTarget,"object");
	var pr=object.getAttributeNS(NSS["interink"],"box");
	var userText=prompt(pr);
	var text=getChildsTypeGoup(object,"text");
	var svgtext=getText(text);
	var child = svgtext.firstChild;
    child.data = userText;
    return;
}

function fbReturnClick(evt){
	var object = evt.target;
	var kreturn=getParentTypeGroup(object, "return");
	if (isMasked(kreturn)) return;
	var selected=kreturn.getAttributeNS(NSS["interink"],"selected");
	
	if (selected=="validate") fbValidateClick(evt);
	else fbCorrectionClick(evt)
	
}

function fbValidateClick(evt){
	var object = evt.target;

	var question=getParentTypeGroup(object, "question");
	
	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	var good=true;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		a++;
		var alphanum=object.getAttributeNS(NSS["interink"],"alphanum");
		if(object!=null && ((alphanum=="num" && fbTestNumAnswer(object)==false) 
		|| (alphanum=="alpha" && fbTestAlphaAnswer(object)==false))) {
			good=false;
			break;
		}
	}
	
	var tries=getTries(question);
	var triesDone=getTriesDone(question);
	var ec=getEndCorrection(question);
	var feedback=clearFeedbacks(question);
	
	if (good==true) {
		//reponse bonne
		goodAnswer(evt,question,feedback);
	} else if (triesDone<tries)  {
		//reponse fausse
		continueQuestion(feedback);
	} else if (ec) {
		//derniere reponse fausse et correction
		wrongAnswerCorrection(evt,question,feedback);
	} else {
		//derniere reponse fausse sans correction
		wrongAnswerNoCorrection(evt,question,feedback);
	}
}

function fbCorrectionClick(evt){
	var object = evt.target;
	var question = getParentTypeGroup(object,"question");

	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		++a;
		var goodanswer=object.getAttributeNS(NSS["interink"],"answer");
		var text=getChildsTypeGoup(object,"text");
		var svgtext=getText(text);
		var child = svgtext.firstChild;
		child.data = goodanswer;
	}
	hiddenVisibleButton(question, "return", false);
}

function fbTestNumAnswer(object){
	var answer=parseFloat(object.getAttributeNS(NSS["interink"],"answer"));
	var pcerror=parseFloat(object.getAttributeNS(NSS["interink"],"pcerror"));
	var text=getChildsTypeGoup(object,"text");
	var svgtext=getText(text);
	var child = svgtext.firstChild;
    var userVal = parseFloat(child.data);

	if (userVal>=(answer*(100-pcerror)/100) && userVal<=(answer*(100+pcerror)/100)) return true;
	else return false;
}

function fbTestAlphaAnswer(object){
	var answer=object.getAttributeNS(NSS["interink"],"answer");
	var text=getChildsTypeGoup(object,"text");
	var svgtext=getText(text);
	var child = svgtext.firstChild;
    var userVal = child.data;
    
    if(userVal==answer) return true;
	else return false;
}
//end object

//object cursor
function csDownButton(evt){
	var evtTarget=evt.target;
	var button=getParentTypeGroup(evtTarget,"button");
	csChangeDrag(evt,true);
	csLetOrigin(evt,button);
	csLetOriginTransform(button);
}

function csMoveButton(evt){
	if (csIsDrag(evt)){
		csPlaceButton(evt);
	}
}

function csGetMaxLine(button){
	var cursor=getParentTypeGroup(button,"cursor");
	var line=getChildsTypeGoup(cursor,"line");
	var SVGline=getElement(line, "Line");
	var x1=SVGline.getAttribute("x1");
	var x2=SVGline.getAttribute("x2");
	return (Math.abs(x2-x1));
}

function csUpButton(evt){
	if (csIsDrag(evt)){
		csChangeDrag(evt,false);
		csPlaceButton(evt);
	}	
}

function csChangeDrag(evt,dragged){
	var target = evt.target;
	var button=getParentTypeGroup(target,"button");
	if (dragged) button.setAttributeNS(NSS["interink"],"drag","true");
	else button.setAttributeNS(NSS["interink"],"drag","false");
}

function csIsDrag(evt){
	var target = evt.target;
	var button=getParentTypeGroup(target,"button");
	var drag=button.getAttributeNS(NSS["interink"],"drag");
	if (drag=="true") return true;
	else return false;
}

function csLetOrigin(evt,button){
	var trans=new point;
	trans=getTranslateCoordinate(button);
	var x1=(evt.clientX)-trans.x;
	button.setAttributeNS(NSS["interink"],"x1",x1);
}

function csLetOriginTransform(button){
	var trans=new point;
	trans=getTranslateCoordinate(button);
	button.setAttributeNS(NSS["interink"],"posCur",trans.x);
}

function csGetOrigin(button){
	var x=button.getAttributeNS(NSS["interink"],"x1");
	x=parseInt(x);
	return x;
}

function csGetOriginTransform(button){
	var x=button.getAttributeNS(NSS["interink"],"posCur");
	x=parseInt(x);
	return x;
}

function csPlaceButton(evt){
	var x2=parseInt(evt.clientX);
	var evtTarget = evt.target;
	var button=getParentTypeGroup(evtTarget,"button");
	var x1=csGetOrigin(button);
	var max=csGetMaxLine(button);
	if (x2>=x1 && ((x2-x1)<=max)) {
		button.setAttribute("transform","translate(" + (x2-x1) + ")");
		var pc=(x2-x1)/max;
		var cursor=getParentTypeGroup(evtTarget,"cursor");
		cursor.setAttribute("pc",pc);
		csToParent(cursor, pc);
	}
	return;
}

function csToParent(cursor, pc){
	var object = cursor.parentNode;
	var type_object=object.getAttributeNS(NSS["interink"],"type");
	if (type_object=="hs"){
		hsMove(object, pc);
	}
	return;
}
//end object

//object horizontalScroller hs
function hsMove(object, pc){
	var rectscroller=getChildsTypeGoup(object,"rectangle");
	var rect=getElement(rectscroller,"Rect");
	var width=parseInt(rect.getAttribute("width"));
	var x=parseInt(rect.getAttribute("x"));
	var s=1-pc;
	var t=pc*(x+width);
	rectscroller.setAttribute("transform","matrix(" + s + ",0,0,1," + t + ",0)");
	return;
}
//end object

//object copy_style co
function coSelectStyle(evt){
	var evtTarget=evt.target;
	var ref=evtTarget.getAttributeNS(NSS["interink"],"ref");
	var labels=getParentTypeGroup(evtTarget,"labels");
	labels.setAttributeNS(NSS["interink"],"styleselected",ref);
	return;
}

function coApplyStyle(evt){
	var evtTarget=evt.target;
	//recuperation du style selectionne
	var root=getParentTypeGroup(evtTarget,"question");
	var labels=getChildsTypeGoup(root,"labels");
	var ref=labels.getAttributeNS(NSS["interink"],"styleselected");
	if (ref=="") return;
	
	var stylepasted=coStyleSelected(labels, ref);
	/*var child = labels.firstChild;
	var stylepasted=null;
	do{
		if (child=="[object SVGRectElement]"){
			var lab=child.getAttributeNS(NSS["interink"],"ref");
			if (lab==ref) {
				var stylepasted=child.getAttribute("style");
				break;
			}
		}
		child=child.nextSibling;
	} while (child!=null);
	if (stylepasted==null){
		alert("bug");
		return;
	}*/
	
	pasteStyleSelected(evtTarget, stylepasted, ref);
	/*evtTarget.setAttribute("style",stylepasted);
	var zone=getParentTypeGroup(evtTarget,"zone");
	zone.setAttributeNS(NSS["interink"],"ref",ref);*/
	return;
}

function pasteStyleSelected(target, stylepasted, ref){
	//target.setAttribute("style",stylepasted);
	var object=getParentTypeGroup(target,"object");
	var child = object.firstChild;
	do{
		if (child=="[object SVGPathElement]"){//a completer
			child.setAttribute("style",stylepasted);
		}
		child=child.nextSibling;
	} while (child!=null);
	object.setAttributeNS(NSS["interink"],"ref",ref);
}

function coStyleSelected(group, ref){
	var child = group.firstChild;
	var stylepasted=null;
	do{
		if (child=="[object SVGRectElement]"){
			var lab=child.getAttributeNS(NSS["interink"],"ref");
			if (lab==ref) {
				var stylepasted=child.getAttribute("style");
				break;
			}
		}
		child=child.nextSibling;
	} while (child!=null);
	if (stylepasted==null){
		alert("bug");
	}
	return stylepasted;
}

function coReturnClick(evt){
	var object = evt.target;
	var kreturn=getParentTypeGroup(object, "return");
	if (isMasked(kreturn)) return;
	var selected=kreturn.getAttributeNS(NSS["interink"],"selected");
	
	if (selected=="validate") coValidateClick(evt);
	else coCorrectionClick(evt)
	
}

function coValidateClick(evt){
	var evtTarget = evt.target;

	var question=getParentTypeGroup(evtTarget, "question");
	
	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	var good=true;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		a++;
		if (object!=null){
			var ref=object.getAttributeNS(NSS["interink"],"ref");
			var refwaited=object.getAttributeNS(NSS["interink"],"refwaited");
			if(ref!=refwaited) {
				good=false;
				break;
			}
		}
	}
	
	var tries=getTries(question);
	var triesDone=getTriesDone(question);
	var ec=getEndCorrection(question);
	var feedback=clearFeedbacks(question);
	
	if (good==true) {
		//reponse bonne
		goodAnswer(evt,question,feedback);
	} else if (triesDone<tries)  {
		//reponse fausse
		continueQuestion(feedback);
	} else if (ec) {
		//derniere reponse fausse et correction
		wrongAnswerCorrection(evt,question,feedback);
	} else {
		//derniere reponse fausse sans correction
		wrongAnswerNoCorrection(evt,question,feedback);
	}
}

function coCorrectionClick(evt){
	var evtTarget = evt.target;
	var question = getParentTypeGroup(evtTarget,"question");
	

	var objects=getChildsTypeGoup(question,"objects");
	var a=1;
	while((object=getChildsTypeGoup(objects,"object",a))!=null){
		++a;
		var refwaited=object.getAttributeNS(NSS["interink"],"refwaited");
		
		var root=getParentTypeGroup(evtTarget,"question");
		var labels=getChildsTypeGoup(root,"labels");		
		var stylepasted=coStyleSelected(labels, refwaited);
		
		pasteStyleSelected(object, stylepasted, refwaited);
	}
	hiddenVisibleButton(question, "return", false);
}

//end object
