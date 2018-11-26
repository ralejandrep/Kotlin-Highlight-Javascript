 /*!
  * kotlin code highlighter.
  * @author Rodrigo Alejandre Perez
  */


  /**
   * On window load, exec mainHighlight.
   */
  window.onload = function() {
    mainHighlight("kotlin");
  }

  /**
   *  select all the HTML elements with the class name codeLang.
   *
   * @param      {string}  codeLang  The code language.
   */
  function mainHighlight(codeLang) {
    var allElements = document.querySelectorAll("[class='" + codeLang + "']");
    for (var i=0;i<allElements.length;i++)
    	codeColor(allElements[i], codeLang);
  }

	/**
   * Define colors to code and replace the HTML code of the element given.
   *
   * @param      {<type>}  elementObj  The element object with the code.
   * @param      {string}  lang        The language
   */
  function codeColor(elementObj, lang) {
      var elementTxt = elementObj.innerHTML;
      keywordcolor = "mediumblue";     // global variable.
      commentcolor = "grey";           // global variable.
      stringcolor = "green";           // global variable.
      numbercolor =  "mediumblue";     // global variable.
      if(lang == "kotlin") {  
        elementTxt = kotlinMode(elementTxt);
      }
      elementObj.innerHTML = elementTxt;
  }  

  /**
   * Highlight the txt with HTML Code.
   *
   * @param      {string}  txt     The text with the code.
   * @return     {string}          returns the txt with the code highlighted.
   */
  function kotlinMode(txt) {
    var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, dftnuttpos, compos, comlinepos, keywordpos, numpos, mypos, y;
    while (true) {
      sfnuttpos = getPos(rest, "'", "'", stringMode);
      dftnuttpos = getPos(rest, '"""', '"""', stringMode);
      dfnuttpos = getPos(rest, '"', '"', stringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, "//", "\n", commentMode);     
      numpos = getNumPos(rest, numberMode);
      keywordpos = getKeywordPos("kotlin", rest, keywordMode);
      if (Math.max(sfnuttpos[0], dftnuttpos[0], compos[0], comlinepos[0], dfnuttpos[0], numpos[0], keywordpos[0]) == -1) {break;}
      mypos = getMinPos(sfnuttpos, dftnuttpos, compos, comlinepos, dfnuttpos, numpos, keywordpos);
      if (mypos[0] == -1) {break;}
      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }
    rest = done + rest;
    return rest;
  }

  /**
   * Gets the minimum position.
   *
   * @return     {Array}  The minimum position.
   */
  function getMinPos() {
    var i, arr = [];
    for (i = 0; i < arguments.length; i++) {
      if (arguments[i][0] > -1) {
        if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}
      }
    }
    if (arr.length == 0) {arr = arguments[i];}
    return arr;
  }

  /**
   * Gets the position.
   *
   * @param      {string}            txt     The text to search in.
   * @param      {(string|pattern)}  start   How it starts.
   * @param      {(string|pattern)}  end     How it ends.
   * @param      {function}          func    The function to generate HTML code.
   * @return     {Array}                     The position.
   */
  function getPos(txt, start, end, func) {
    var s, e;
    s = txt.search(start);
    e = txt.indexOf(end, s + (end.length));
    if (e == -1) {e = txt.length;}
    return [s, e + (end.length), func];
  }

	/**
   * Gets the number position.
   *
   * @param      {string}    txt     The text to search in.
   * @param      {function}  func    The function to generate HTML code.
   * @return     {Array}             The number position.
   */
  function getNumPos(txt, func) {
		var arr = [" ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "=", "\n"], i, j, c, startpos = 0, endpos, word;
		for(i=0;i<txt.length;i++) {
			for (j = 0; j < arr.length; j++) {
				c = txt.substr(i, arr[j].length);
				if(c == arr[j]) {
          endpos = i;
          if (startpos < endpos) {
          	word = txt.substring(startpos, endpos);
            	if(word.match(/^(([-0-9]{1,})|([-0-9abcdexflABCDEFL]{1,}[0-9abcdexflABCDEFL._]{1,}))$/g) != null)
              {
              	if(word.substr(0, 1) == "-") word = word.substr(1,word.length);
                	return [startpos, endpos, func]; 
              }
          } else {
          	word = txt.substring(startpos+1, txt.length);
              if(word.match(/^(([-0-9]{1,})|([-0-9abcdexflABCDEFL]{1,}[0-9abcdexflABCDEFL._]{1,}))$/g) != null)
              {
              	if(word.substr(0, 1) == "-") word = word.substr(1,word.length);
                	return [startpos+1, txt.length, func];
              }
          }
      		i += arr[j].length;
      		startpos = i;
      		i -= 1;
      		break;
				}
			}
		}
    return [-1, -1, func];
  }

  /**
   * Gets the keyword position.
   *
   * @param      {string}    typ     The code languaje.
   * @param      {string}    txt     The text to search in.
   * @param      {function}  func    The function to generate HTML code.
   * @return     {Array}             The keyword position.
   */
  function getKeywordPos(typ, txt, func) {
    var words, i, pos, rpos = -1, rpos2 = -1, patt = /\W/g, result = txt, keywords = [];
    if (typ == "kotlin") {
      words = ["val", "var", "package", "as", "break", "class", "continue", "do", "else", "for", "false", "fun", "if", "in", "interface", "is", "null", "object", "return", "super", "this", "throw", "true", "try", "typealias", "when", "while", "by", "catch", "construct", "delegate", "dynamic", "field", "file", "finally", "get", "import", "init", "param","property", "receiver", "set", "setparam", "where", "actual", "abstract","annotation", "companion", "const", "crossinline", "data", "enum", "expect","external", "final", "infix", "inline", "inner", "internal", "lateinit","noinline", "open", "operator", "out", "override", "private", "protected","public", "reified", "sealed", "suspend", "tailrec", "vararg", "it", "Int","Double", "Float", "Long", "Short", "Byte", "Char", "String", "fun"];
    }
    for (i = 0; i < words.length; i++) {
      pos = result.search(words[i]);
      if (pos > -1) {
        if (result.substr(pos + words[i].length,1).match(patt) && ( pos == 0 || result.substr(pos - 1,1).match(patt)) ) {
          	if (pos > -1 && (rpos == -1 || pos < rpos)) {
            	rpos = pos;
            	rpos2 = rpos + words[i].length;
          	}
        }
      } 
    }
    return [rpos, rpos2, func];
  }

  /**
   * Generate span with string color. 
   *
   * @param      {string}  txt     The String code text.
   * @return     {string}          The span with the string highlighted.
   */
  function stringMode(txt) {
    return "<span style=color:" + stringcolor + ">" + txt + "</span>";
  }

  /**
   * Generate span with keyword color
   *
   * @param      {string}  txt     The keyword code text.
   * @return     {string}          The span with the keyword highlighted.
   */
  function keywordMode(txt) {
    return "<span style='color:" + keywordcolor + "; font-weight:bold;'>" + txt + "</span>";
  }

  /**
   * Generate span with number color
   *
   * @param      {string}  txt     The number code text.
   * @return     {string}          The span with the number highlighted.
   */
  function numberMode(txt) {
    return "<span style=color:" + numbercolor + ">" + txt + "</span>";
  }

  /**
   * Generate span with comments color
   *
   * @param      {string}  txt     The comment code text.
   * @return     {string}          The span with the comments highlighted.
   */
  function commentMode(txt) {
    return "<span style=color:" + commentcolor + ">" + txt + "</span>";
  }
  

  /**
   * Prompt a custom log
   *
   * @param      {string}             fun      The function name where it is executed.
   * @param      {(Function|string)}  log      The log to prompt.
   * @param      {string}             execLog  The code executed to prompt the log.
   * @param      {number}             line     The line.
   */
  function log(fun, log, execLog = "", line = -1) {
    console.log(line==-1 ? "[ " + fun + " ] " + (execLog != "" ? "exec:'" + execLog + "' " : "") + "=> " + log : "[ " + fun + ":" + line + " ] " + (execLog != "" ? "exec:'" + execLog + "' " : "") + "=> " + log);
  }