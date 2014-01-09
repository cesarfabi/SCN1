/**
 * Range.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
(function(a){function R(d){var t=this,b=d.doc,E=0,C=1,D=2,T=true,F=false,S='startOffset',e='startContainer',g='endContainer',i='endOffset',j=tinymce.extend,k=d.nodeIndex;j(t,{startContainer:b,startOffset:0,endContainer:b,endOffset:0,collapsed:T,commonAncestorContainer:b,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:m,setEnd:q,setStartBefore:u,setStartAfter:v,setEndBefore:w,setEndAfter:x,collapse:y,selectNode:z,selectNodeContents:A,compareBoundaryPoints:B,deleteContents:G,extractContents:H,cloneContents:I,insertNode:J,surroundContents:K,cloneRange:L,toStringIE:a1});function l(){return b.createDocumentFragment()};function m(n,o){O(T,n,o)};function q(n,o){O(F,n,o)};function u(n){m(n.parentNode,k(n))};function v(n){m(n.parentNode,k(n)+1)};function w(n){q(n.parentNode,k(n))};function x(n){q(n.parentNode,k(n)+1)};function y(c){if(c){t[g]=t[e];t[i]=t[S]}else{t[e]=t[g];t[S]=t[i]}t.collapsed=T};function z(n){u(n);x(n)};function A(n){m(n,0);q(n,n.nodeType===1?n.childNodes.length:n.nodeValue.length)};function B(h,r){var s=t[e],c=t[S],f=t[g],n=t[i],o=r.startContainer,p=r.startOffset,b1=r.endContainer,c1=r.endOffset;if(h===0)return N(s,c,o,p);if(h===1)return N(f,n,o,p);if(h===2)return N(f,n,b1,c1);if(h===3)return N(s,c,b1,c1)};function G(){P(D)};function H(){return P(E)};function I(){return P(C)};function J(n){var s=this[e],c=this[S],f,o;if((s.nodeType===3||s.nodeType===4)&&s.nodeValue){if(!c){s.parentNode.insertBefore(n,s)}else if(c>=s.nodeValue.length){d.insertAfter(n,s)}else{f=s.splitText(c);s.parentNode.insertBefore(n,f)}}else{if(s.childNodes.length>0)o=s.childNodes[c];if(o)s.insertBefore(n,o);else s.appendChild(n)}};function K(n){var f=t.extractContents();t.insertNode(n);n.appendChild(f);t.selectNode(n)};function L(){return j(new R(d),{startContainer:t[e],startOffset:t[S],endContainer:t[g],endOffset:t[i],collapsed:t.collapsed,commonAncestorContainer:t.commonAncestorContainer})};function _(c,o){var f;if(c.nodeType==3)return c;if(o<0)return c;f=c.firstChild;while(f&&o>0){--o;f=f.nextSibling}if(f)return f;return c};function M(){return(t[e]==t[g]&&t[S]==t[i])};function N(f,o,h,p){var c,r,n,s,b1,c1;if(f==h){if(o==p)return 0;if(o<p)return-1;return 1}c=h;while(c&&c.parentNode!=f)c=c.parentNode;if(c){r=0;n=f.firstChild;while(n!=c&&r<o){r++;n=n.nextSibling}if(o<=r)return-1;return 1}c=f;while(c&&c.parentNode!=h){c=c.parentNode}if(c){r=0;n=h.firstChild;while(n!=c&&r<p){r++;n=n.nextSibling}if(r<p)return-1;return 1}s=d.findCommonAncestor(f,h);b1=f;while(b1&&b1.parentNode!=s)b1=b1.parentNode;if(!b1)b1=s;c1=h;while(c1&&c1.parentNode!=s)c1=c1.parentNode;if(!c1)c1=s;if(b1==c1)return 0;n=s.firstChild;while(n){if(n==b1)return-1;if(n==c1)return 1;n=n.nextSibling}};function O(s,n,o){var c,f;if(s){t[e]=n;t[S]=o}else{t[g]=n;t[i]=o}c=t[g];while(c.parentNode)c=c.parentNode;f=t[e];while(f.parentNode)f=f.parentNode;if(f==c){if(N(t[e],t[S],t[g],t[i])>0)t.collapse(s)}else t.collapse(s);t.collapsed=M();t.commonAncestorContainer=d.findCommonAncestor(t[e],t[g])};function P(h){var c,f=0,s=0,p,n,o,r,sp,ep;if(t[e]==t[g])return Q(h);for(c=t[g],p=c.parentNode;p;c=p,p=p.parentNode){if(p==t[e])return U(c,h);++f}for(c=t[e],p=c.parentNode;p;c=p,p=p.parentNode){if(p==t[g])return V(c,h);++s}n=s-f;o=t[e];while(n>0){o=o.parentNode;n--}r=t[g];while(n<0){r=r.parentNode;n++}for(sp=o.parentNode,ep=r.parentNode;sp!=ep;sp=sp.parentNode,ep=ep.parentNode){o=sp;r=ep}return W(o,r,h)};function Q(h){var f,s,c,n,o,p,r,b1,c1;if(h!=D)f=l();if(t[S]==t[i])return f;if(t[e].nodeType==3){s=t[e].nodeValue;c=s.substring(t[S],t[i]);if(h!=C){n=t[e];b1=t[S];c1=t[i]-t[S];if(b1===0&&c1>=n.nodeValue.length-1){n.parentNode.removeChild(n)}else{n.deleteData(b1,c1)}t.collapse(T)}if(h==D)return;if(c.length>0){f.appendChild(b.createTextNode(c))}return f}n=_(t[e],t[S]);o=t[i]-t[S];while(n&&o>0){p=n.nextSibling;r=$(n,h);if(f)f.appendChild(r);--o;n=p}if(h!=C)t.collapse(T);return f};function U(c,h){var f,n,o,p,s,r;if(h!=D)f=l();n=X(c,h);if(f)f.appendChild(n);o=k(c);p=o-t[S];if(p<=0){if(h!=C){t.setEndBefore(c);t.collapse(F)}return f}n=c.previousSibling;while(p>0){s=n.previousSibling;r=$(n,h);if(f)f.insertBefore(r,f.firstChild);--p;n=s}if(h!=C){t.setEndBefore(c);t.collapse(F)}return f};function V(s,h){var f,c,n,o,p,r;if(h!=D)f=l();n=Y(s,h);if(f)f.appendChild(n);c=k(s);++c;o=t[i]-c;n=s.nextSibling;while(n&&o>0){p=n.nextSibling;r=$(n,h);if(f)f.appendChild(r);--o;n=p}if(h!=C){t.setStartAfter(s);t.collapse(T)}return f};function W(s,c,h){var n,f,o,p,r,b1,c1,d1;if(h!=D)f=l();n=Y(s,h);if(f)f.appendChild(n);o=s.parentNode;p=k(s);r=k(c);++p;b1=r-p;c1=s.nextSibling;while(b1>0){d1=c1.nextSibling;n=$(c1,h);if(f)f.appendChild(n);c1=d1;--b1}n=X(c,h);if(f)f.appendChild(n);if(h!=C){t.setStartAfter(s);t.collapse(T)}return f};function X(r,h){var n=_(t[g],t[i]-1),p,c,f,o,s,b1=n!=t[g];if(n==r)return Z(n,b1,F,h);p=n.parentNode;c=Z(p,F,F,h);while(p){while(n){f=n.previousSibling;o=Z(n,b1,F,h);if(h!=D)c.insertBefore(o,c.firstChild);b1=T;n=f}if(p==r)return c;n=p.previousSibling;p=p.parentNode;s=Z(p,F,F,h);if(h!=D)s.appendChild(c);c=s}};function Y(r,h){var n=_(t[e],t[S]),c=n!=t[e],p,f,o,s,b1;if(n==r)return Z(n,c,T,h);p=n.parentNode;f=Z(p,F,T,h);while(p){while(n){o=n.nextSibling;s=Z(n,c,T,h);if(h!=D)f.appendChild(s);c=T;n=o}if(p==r)return f;n=p.nextSibling;p=p.parentNode;b1=Z(p,F,T,h);if(h!=D)b1.appendChild(f);f=b1}};function Z(n,c,f,h){var o,p,r,s,b1;if(c)return $(n,h);if(n.nodeType==3){o=n.nodeValue;if(f){s=t[S];p=o.substring(s);r=o.substring(0,s)}else{s=t[i];p=o.substring(0,s);r=o.substring(s)}if(h!=C)n.nodeValue=r;if(h==D)return;b1=d.clone(n,F);b1.nodeValue=p;return b1}if(h==D)return;return d.clone(n,F)};function $(n,h){if(h!=D)return h==C?d.clone(n,T):n;n.parentNode.removeChild(n)};function a1(){return d.create('body',null,I()).outerText}return t};a.Range=R;R.prototype.toString=function(){return this.toStringIE()}})(tinymce.dom);
