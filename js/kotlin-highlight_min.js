 /*!
  * kotlin code highlighter.
  * @author Rodrigo Alejandre Perez
  */
function mainHighlight(e){for(var n=document.querySelectorAll("[class='"+e+"']"),t=0;t<n.length;t++)codeColor(n[t],e)}function codeColor(e,n){var t=e.innerHTML;keywordcolor="mediumblue",commentcolor="grey",stringcolor="green",numbercolor="mediumblue","kotlin"==n&&(t=kotlinMode(t)),e.innerHTML=t}function kotlinMode(e){for(var n,t,r,o,l,i,s,a,c=e,u="";n=getPos(c,"'","'",stringMode),r=getPos(c,'"""','"""',stringMode),t=getPos(c,'"','"',stringMode),o=getPos(c,/\/\*/,"*/",commentMode),l=getPos(c,"//","\n",commentMode),s=getNumPos(c,numberMode),i=getKeywordPos("kotlin",c,keywordMode),-1!=Math.max(n[0],r[0],o[0],l[0],t[0],s[0],i[0])&&-1!=(a=getMinPos(n,r,o,l,t,s,i))[0];)-1<a[0]&&(u+=c.substring(0,a[0]),u+=a[2](c.substring(a[0],a[1])),c=c.substr(a[1]));return c=u+c}function getMinPos(){var e,n=[];for(e=0;e<arguments.length;e++)-1<arguments[e][0]&&(0==n.length||arguments[e][0]<n[0])&&(n=arguments[e]);return 0==n.length&&(n=arguments[e]),n}function getPos(e,n,t,r){var o,l;return o=e.search(n),-1==(l=e.indexOf(t,o+t.length))&&(l=e.length),[o,l+t.length,r]}function getNumPos(e,n){var t,r,o,l,i=[" ",";","(","+",")","[","]",",","&",":","{","}","/","-","*","|","%","=","\n"],s=0;for(t=0;t<e.length;t++)for(r=0;r<i.length;r++)if(e.substr(t,i[r].length)==i[r]){if(s<(o=t)){if(null!=(l=e.substring(s,o)).match(/^(([-0-9]{1,})|([-0-9abcdexflABCDEFL]{1,}[0-9abcdexflABCDEFL._]{1,}))$/g))return"-"==l.substr(0,1)&&(l=l.substr(1,l.length)),[s,o,n]}else if(null!=(l=e.substring(s+1,e.length)).match(/^(([-0-9]{1,})|([-0-9abcdexflABCDEFL]{1,}[0-9abcdexflABCDEFL._]{1,}))$/g))return"-"==l.substr(0,1)&&(l=l.substr(1,l.length)),[s+1,e.length,n];s=t+=i[r].length,t-=1;break}return[-1,-1,n]}function getKeywordPos(e,n,t){var r,o,l,i=-1,s=-1,a=/\W/g,c=n;for("kotlin"==e&&(r=["val","var","package","as","break","class","continue","do","else","for","false","fun","if","in","interface","is","null","object","return","super","this","throw","true","try","typealias","when","while","by","catch","construct","delegate","dynamic","field","file","finally","get","import","init","param","property","receiver","set","setparam","where","actual","abstract","annotation","companion","const","crossinline","data","enum","expect","external","final","infix","inline","inner","internal","lateinit","noinline","open","operator","out","override","private","protected","public","reified","sealed","suspend","tailrec","vararg","it","Int","Double","Float","Long","Short","Byte","Char","String","fun"]),o=0;o<r.length;o++)-1<(l=c.search(r[o]))&&c.substr(l+r[o].length,1).match(a)&&(0==l||c.substr(l-1,1).match(a))&&-1<l&&(-1==i||l<i)&&(s=(i=l)+r[o].length);return[i,s,t]}function stringMode(e){return"<span style=color:"+stringcolor+">"+e+"</span>"}function keywordMode(e){return"<span style='color:"+keywordcolor+"; font-weight:bold;'>"+e+"</span>"}function numberMode(e){return"<span style=color:"+numbercolor+">"+e+"</span>"}function commentMode(e){return"<span style=color:"+commentcolor+">"+e+"</span>"}window.onload=function(){mainHighlight("kotlin")};