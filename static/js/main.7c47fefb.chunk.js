(this["webpackJsonpcamaew-up"]=this["webpackJsonpcamaew-up"]||[]).push([[0],{114:function(e,a,t){e.exports={cellwidth:"120px",cellheight:"120px",cellmargin:"3px",tokenwidth:"80px",tokenheight:"30px",tokenmargin:"5px"}},115:function(e,a,t){},141:function(e,a){},145:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(23),c=t.n(l),o=t(9),i=t(88),m=t(43),s=t(19),u=t(78);function d(e,a){for(var t=new Array(e),n=0;n<e;n++)t[n]=Object(s.cloneDeep)(a);return t}function p(e){var a=Array.from(new Array(e.numCats),(function(e,a){return a}));return a.sort((function(a,t){return 100*(e.cats[t][0]-e.cats[a][0])+(e.cats[t][1]-e.cats[a][1])})),a}function f(e,a){e.dice=Array(e.numCats).fill(0);for(var t=0;t<a.numPlayers;t++)e.players[t].smallBets=Array(e.numCats).fill([]),b(e,t);e.smallStack=Array(e.numCats).fill([2,3,5])}function v(e,a){e.dice=Array(e.numCats).fill(0);for(var t=p(e),n=0;n<a.numPlayers;n++){var r=0;r+=Object(s.sum)(e.players[n].smallBets[t[0]]),r+=e.players[n].smallBets[t[1]].length;for(var l=2;l<e.numCats;l++)r-=e.players[n].smallBets[t[l]].length;e.players[n].coins+=r}}function y(e,a,t){var n=e.dice.filter((function(e){return 0===e})).length,r=a.random.Die(n)-1,l=a.random.Die(3),c=0,o=0;for(o=0;o<e.numCats;o++)if(0===e.dice[o]){if(c===r){e.dice[o]=l,e.lastDiceRolled=o;break}c++}return o===e.numCats&&console.error("Something's wrong. The dice probably didn't get reset."),function(e,a,t,n){var r=e.cats[t][0],l=[];if(r>=0){var c=e.board[r].stack,o=c.indexOf(t);l=c.slice(o),e.board[r].stack=e.board[r].stack.slice(0,o)}else l=[t];var i=e.board[r+n].stack.length;e.board[r+n].stack=e.board[r+n].stack.concat(l);for(var m=0;m<l.length;m++)e.cats[l[m]]=[r+n,i+m];e.cleanUp=r+n}(e,0,o,l),null!=t&&(e.players[t].coins+=1),[o,l]}function E(e,a,t,n){e.board[t].mod={playerID:a,type:n},e.players[a].modPos=t}function b(e,a){e.players[a].modPos>-1&&(e.board[e.players[a].modPos].mod=null,e.players[a].modPos=-1)}function g(e,a){e.logArray.push(a)}var h={name:"CamaewUp",plugins:[Object(u.EffectsPlugin)({effects:{endTurn:{},roll:{create:function(e){return e},duration:1},rollDone:{create:function(e){return e},duration:.2},rollReset:{create:function(e){return e}},moveFwd:{create:function(e){return e},duration:.3},modTape:{create:function(e){return e},duration:.3},modCucumber:{create:function(e){return e},duration:.3},something:{}}})],setup:function(e,a){var t={dice:Array(a.numCats).fill(0),cats:Array(a.numCats).fill([-1,-1]),board:d(a.numTiles+3,{stack:[],mod:null}),players:d(e.numPlayers,{coins:3,smallBets:Array(a.numCats).fill([]),betCards:Array(a.numCats).fill(!0),modPos:-1}),smallStack:Array(a.numCats).fill([2,3,5]),bigStack:{win:[],lose:[]},logArray:[],numCats:a.numCats,numTiles:a.numTiles,numPlayers:e.numPlayers,lastDiceRolled:-1,cleanUp:-1};g(t,{move:"text",text:"Welcome!"});for(var n=0;n<t.numCats;n++)y(t,e);return f(t,e),t},moves:{roll:function(e,a,t){var n=Object(s.cloneDeep)(e.cats),r=Object(s.cloneDeep)(e.board),l=y(e,a,t),c=Object(o.a)(l,2),i=c[0],m=c[1];a.effects.roll(i),a.effects.rollDone(m),a.effects.rollReset(e.dice.slice());for(var u=0;u<m;u++)a.effects.moveFwd({catID:i,roll:u,preCats:n,preBoard:r});(g(e,{playerID:t,move:"roll",catID:i,roll:m}),function(e,a){var t=e.board[e.cleanUp].mod;if(null!==t){g(e,{move:"mod",mod:t.type}),e.players[t.playerID].coins+=1;var n=e.board[e.cleanUp].stack.slice();e.board[e.cleanUp].stack=[];var r=999;"tape"===t.type?(r=e.cleanUp-1,a.effects.modTape({cellNum:e.cleanUp,preCats:Object(s.cloneDeep)(e.cats),prevStack:e.board[e.cleanUp-1].stack.slice(),stack:n}),e.board[r].stack=n.concat(e.board[r].stack)):"cucumber"===t.type&&(r=e.cleanUp+1,a.effects.modCucumber({cellNum:e.cleanUp,preCats:Object(s.cloneDeep)(e.cats),destHeight:e.board[r].stack.length,stack:n}),e.board[r].stack=e.board[r].stack.concat(n));for(var l=0;l<e.board[r].stack.length;l++)e.cats[e.board[r].stack[l]]=[r,l]}}(e,a),e.cleanUp>=e.numTiles)&&(v(e,a),function(e,a){for(var t=p(e),n=[1,2,3,5,8],r=0;r<e.bigStack.win.length;r++){var l=e.bigStack.win[r];l.bet===t[0]?e.players[l.playerID].coins+=n.pop():e.players[l.playerID].coins-=1,0===n.length&&(n=[1])}for(var c=[1,2,3,5,8],o=0;o<e.bigStack.lose.length;o++){var i=e.bigStack.lose[o];i.bet===t[e.numCats-1]?e.players[i.playerID].coins+=c.pop():e.players[i.playerID].coins-=1,0===c.length&&(c=[1])}}(e),g(e,{move:"text",text:"Winners: "+function(e){for(var a=[e.players[0].coins],t=[0],n=1;n<e.numPlayers;n++)e.players[n].coins>a?(a=e.players[n].coins,t=[n]):e.players[n].coins===a&&t.push(n);return t}(e)}),g(e,{move:"text",text:"--- End of game ---"}));0===e.dice.filter((function(e){return 0===e})).length&&(g(e,{move:"text",text:"--- End of small round ---"}),v(e,a),f(e,a))},makeSmallBet:function(e,a,t,n){var r=function(e,a,t){var n=e.smallStack[t].pop();return e.players[a].smallBets[t].push(n),n}(e,t,n);g(e,{playerID:t,move:"smallBet",catID:n,card:r})},makeBigBet:function(e,a,t,n,r){!function(e,a,t,n){e.bigStack[n].push({playerID:a,bet:t}),e.players[a].betCards[t]=!1}(e,t,n,r),g(e,{playerID:t,move:"bigBet",side:r})},placeMod:function(e,a,t,n,r){E(e,t,n,r),g(e,{playerID:t,move:"placeMod",cellID:n,type:r})},removeMod:function(e,a,t){b(e,t),g(e,{playerID:t,move:"removeMod",cellID:e.players[t].modPos})},flipMod:function(e,a,t){var n="tape"===e.board[e.players[t].modPos].mod.type?"cucumber":"tape",r=e.players[t].modPos;b(e,t),E(e,t,r,n),g(e,{playerID:t,move:"flipMod",cellID:e.players[t].modPos})},moveMod:function(e,a,t,n,r){b(e,t),E(e,t,n,r),g(e,{playerID:t,move:"placeMod",cellID:n,type:r})}},turn:{moveLimit:1,onEnd:function(e,a){},onMove:function(e,a){}},minPlayers:2,maxPlayers:8},C=t(150),k=t(89);function D(e){var a=e.data,t=e.onJoinClick,n=e.onCreateClick;return r.a.createElement("div",{id:"entry-container",className:"lobby"},r.a.createElement("div",{id:"entry-server"},r.a.createElement(C.a.Label,null,"Server"),r.a.createElement(C.a.Control,{type:"text",value:a.serverPath,onChange:a.onServerPathChange})),r.a.createElement("div",null,r.a.createElement(k.a,{variant:"primary",onClick:t,size:"lg"},"Join Game")),r.a.createElement("div",null,r.a.createElement(k.a,{variant:"primary",onClick:n,size:"lg"},"Create Game")))}function I(e){var a=e.data,t=e.onJoinJoinClick;return r.a.createElement("div",{className:"lobby"},r.a.createElement("div",null,r.a.createElement(C.a.Label,null,"Name"),r.a.createElement(C.a.Control,{type:"text",value:a.name,onChange:a.onNameChange})),r.a.createElement("div",{id:"join-gameid"},r.a.createElement(C.a.Label,null,"Game ID"),r.a.createElement(C.a.Control,{type:"text",value:a.gameID,onChange:a.onGameIDChange})),r.a.createElement("div",{id:"lobby-join",className:"center"},r.a.createElement(C.a.Label,null,"Join Game"),r.a.createElement(k.a,{variant:"primary",onClick:t,disabled:!a.gameID||!a.name},"Join"),r.a.createElement(k.a,{variant:"secondary",onClick:a.backToEntry},"Back")))}var S=t(151),O=t(80);function N(e){var a=e.data,t=e.onCreateCreateClick;return r.a.createElement("div",{className:"lobby"},r.a.createElement("div",null,r.a.createElement(C.a.Label,null,"Name"),r.a.createElement(C.a.Control,{type:"text",value:a.name,onChange:a.onNameChange})),r.a.createElement("div",null,r.a.createElement(C.a.Label,null,"Number of players"),r.a.createElement(S.a,{type:"radio",name:"numPlayers",value:a.numPlayers,onChange:a.onNumPlayersChange},r.a.createElement(O.a,{value:2},"2"),r.a.createElement(O.a,{value:3},"3"),r.a.createElement(O.a,{value:4},"4"),r.a.createElement(O.a,{value:5},"5"),r.a.createElement(O.a,{value:6},"6"),r.a.createElement(O.a,{value:7},"7"),r.a.createElement(O.a,{value:8},"8"))),r.a.createElement("div",null,r.a.createElement(C.a.Label,null,"Number of cats"),r.a.createElement(S.a,{type:"radio",name:"numCats",value:a.numCats,onChange:a.onNumCatsChange},r.a.createElement(O.a,{value:3},"3"),r.a.createElement(O.a,{value:4},"4"),r.a.createElement(O.a,{value:5},"5"),r.a.createElement(O.a,{value:6},"6"))),r.a.createElement("div",null,r.a.createElement(C.a.Check,{type:"checkbox",label:"Veil mode"}),r.a.createElement(C.a.Check,{type:"checkbox",label:"Random seat"})),r.a.createElement("div",null,r.a.createElement(k.a,{variant:"primary",onClick:t,disabled:!a.name},"Create"),r.a.createElement(k.a,{variant:"secondary",onClick:a.backToEntry},"Back")))}var j=t(149);function P(e){var a,t,n,l=e.data,c=e.startGame,i=r.a.useState(null),m=Object(o.a)(i,2),s=m[0],u=m[1],d=r.a.useState(0),p=Object(o.a)(d,2),f=p[0],v=p[1],y=r.a.useState(-1),E=Object(o.a)(y,2),b=E[0],g=E[1],h=r.a.useState(""),C=Object(o.a)(h,2),D=C[0],I=C[1],S=r.a.useState(!1),O=Object(o.a)(S,2),N=O[0],P=O[1],T=r.a.useCallback((function(){fetch(l.serverPathFull+"/"+l.gameID,{method:"get"}).then((function(e){return e.json()})).then((function(e){return u(e)}))}),[l.gameID,l.serverPathFull]),w=r.a.useCallback((function(){T();for(var e=0;e<s.players.length;e++)if(null==s.players[e].name)return e}),[s,T]),x=r.a.useCallback((function(){var e=w(),a={playerID:e,playerName:l.name};fetch(l.serverPathFull+"/"+s.roomID+"/join",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(a){I(a.playerCredentials),g(e),T()}))}),[l.name,w,s,l.serverPathFull,T]);function B(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a={playerID:b,credentials:D};fetch(l.serverPathFull+"/"+s.roomID+"/leave",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(){e&&T()})),g(-1)}return r.a.useEffect((function(){var e=setInterval((function(){T()}),2e3);return function(){clearInterval(e)}})),r.a.useEffect((function(){null!=s&&v((function(){for(var e=0,a=0;a<s.players.length;a++)null!=s.players[a].name&&e++;return e}))}),[s,D,b,x]),null==s?(T(),r.a.createElement("div",null,"Connecting... ",l.serverPath)):r.a.createElement("div",{className:"lobby"},r.a.createElement("div",null,"gameID: ",s.roomID),r.a.createElement("div",null,s.players.map((function(e,a){return r.a.createElement("div",{key:a},e.id," - ",e.name)}))),r.a.createElement("div",null,r.a.createElement(k.a,{variant:"secondary",onClick:x,disabled:b>=0},"Sit"),r.a.createElement(k.a,{variant:"secondary",onClick:B,disabled:b<0||1===f},"Stand"),r.a.createElement(k.a,{variant:"secondary",onClick:function(){P(!0)}},"Leave"),r.a.createElement(k.a,{variant:"primary",onClick:function(){return c(l.serverPath,l.gameID,b,D)},disabled:f<s.players.length},"Start")),(t=N,n=P,void 0===(a={header:"Leaving",body:"Are you sure you'd like to leave?",confirm:"Leave"}).confirm&&(a.confirm="Confirm"),r.a.createElement(j.a,{show:t,onHide:function(){return n(!1)}},a.header&&r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,a.header)),r.a.createElement(j.a.Body,null,a.body),r.a.createElement(j.a.Footer,null,r.a.createElement(k.a,{variant:"secondary",onClick:function(){return n(!1)}},"Close"),r.a.createElement(k.a,{variant:"primary",onClick:function(){B(!1),l.backToEntry(),n(!1)}},a.confirm)))))}function T(e){var a=e.startGame,t=r.a.useState(""),n=Object(o.a)(t,2),l=n[0],c=n[1],i=r.a.useState("entry"),m=Object(o.a)(i,2),s=m[0],u=m[1],d=r.a.useState(""),p=Object(o.a)(d,2),f=p[0],v=p[1],y=r.a.useState(4),E=Object(o.a)(y,2),b=E[0],g=E[1],h=r.a.useState(5),C=Object(o.a)(h,2),k=C[0],S=C[1];var O=r.a.useState("https://camaew-up.herokuapp.com"),j=Object(o.a)(O,2),T=j[0],w=j[1];function x(e){return fetch(T+"/games/CamaewUp/create",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()}))}function B(){u("wait")}r.a.useEffect((function(){if(console.log(Object({NODE_ENV:"production",PUBLIC_URL:"/camaew-up",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_AGENT),"host"===Object({NODE_ENV:"production",PUBLIC_URL:"/camaew-up",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_AGENT){x({numPlayers:2,setupData:{test:!0,numCats:5,numTiles:16}}).then((function(e){console.log(e.gameID),fetch(T+"/games/CamaewUp/"+e.gameID+"/join",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerID:0,playerName:"Host"})}).then((function(e){return e.json()})).then((function(t){a(T,e.gameID,0,t.playerCredentials)}))}))}else"client"===Object({NODE_ENV:"production",PUBLIC_URL:"/camaew-up",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_AGENT&&fetch(T+"/games/CamaewUp/").then((function(e){return e.json()})).then((function(e){var t=e.rooms.pop().gameID;fetch(T+"/games/CamaewUp/"+t+"/join",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({playerID:1,playerName:"Client"})}).then((function(e){return e.json()})).then((function(e){a(T,t,1,e.playerCredentials)}))}))}),[]);var M={name:l,gameID:f,numPlayers:b,numCats:k,serverPath:T,serverPathFull:T+"/games/CamaewUp",onServerPathChange:function(e){w(e.target.value)},onNameChange:function(e){c(e.target.value)},onGameIDChange:function(e){v(e.target.value)},onNumPlayersChange:function(e){g(e)},onNumCatsChange:function(e){S(e)},backToEntry:function(){u("entry")}};return"entry"===s?r.a.createElement(D,{data:M,onJoinClick:function(){u("join")},onCreateClick:function(){u("create")}}):"join"===s?r.a.createElement(I,{data:M,onJoinJoinClick:function(){B()}}):"create"===s?r.a.createElement(N,{data:M,onCreateCreateClick:function(){x({numPlayers:b,setupData:{numCats:k,numTiles:16}}).then((function(e){v(e.gameID),B()}))}}):"wait"===s?r.a.createElement(P,{data:M,startGame:a}):void 0}var w=t(18);function x(e){var a=e.cards;function t(e){e.dataTransfer.setData("betID",e.target.getAttribute("bet_id"))}return r.a.createElement("div",null,r.a.createElement("div",{className:"section"},"Bet Cards"),r.a.createElement("div",{className:"flex"},a.map((function(e,a){return e?r.a.createElement("div",{className:"tokencolor-".concat(a," betcard"),bet_id:a,draggable:"true",onDragStart:t,key:"betCards"+a},"X"):null}))))}function B(e){var a=e.hasMod,t=e.playerID;return r.a.createElement("div",null,r.a.createElement("div",{className:"section"},"Mod Tile"),r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"modcard",draggable:a,player_id:t,onDragStart:function(e){e.dataTransfer.setData("playerID",e.target.getAttribute("player_id")),e.dataTransfer.setData("type","place")}},a?"X":"\u2013")))}var M=t(84),_=t.n(M);function A(e){var a=e.bets;return r.a.createElement(r.a.Fragment,null,a.map((function(e,a){return r.a.createElement(r.a.Fragment,{key:"smallBets"+a},e.map((function(e){return r.a.createElement("div",{className:"tokencolor-".concat(a," card")},e)})))})))}function L(e){var a=e.name,t=e.data;return r.a.createElement("div",{className:"player-card"},r.a.createElement("div",null,r.a.createElement("img",{alt:a||"Player",src:"https://api.adorable.io/avatars/100/".concat(a||"Player",".png")})),r.a.createElement("div",{className:"player-details"},r.a.createElement("div",null,a||"Player"),r.a.createElement("div",null,r.a.createElement("img",{src:_.a,alt:"Coins",height:16})," ",t.coins),r.a.createElement(A,{bets:t.smallBets})))}function U(e){var a=e.playerID,t=(e.currentPlayer,e.players),n=e.gameMetadata;return r.a.createElement("div",null,t.map((function(e,a){return r.a.createElement(L,{name:n[a].name,data:e,key:"player"+a})})),r.a.createElement(x,{cards:t[a].betCards}),r.a.createElement(B,{hasMod:-1===t[a].modPos,playerID:a}))}function F(e){var a=e.cellData,t=e.cell_id,n=e.isExtra,l=e.playerID,c=e.gameMetadata,o=e.prePlaceMod,i=(e.preMoveMod,e.preFlipMod);return r.a.createElement("div",{className:"cell ".concat(n?"cell-extra":""),onDragOver:function(e){e.preventDefault()},onDrop:function(e){e.preventDefault(),o(Number(t),e.dataTransfer.getData("type"))}},r.a.createElement("div",{className:"cell-content"}),a.mod&&r.a.createElement("div",{className:"cell-mod card ".concat(a.mod.type),onClick:function(){i(Number(t))},draggable:l===a.mod.playerID,onDragStart:function(e){e.dataTransfer.setData("type","move")}},c[a.mod.playerID].name||"\u2013"))}var R=t(57),G=t.n(R),J=t(14);function H(e){var a=e.G,t=e.playerID,n=e.gameMetadata,l=e.placeMod,c=e.moveMod,i=e.removeMod,m=e.flipMod,s=r.a.useState(!1),u=Object(o.a)(s,2),d=u[0],p=u[1],f=r.a.useState(!1),v=Object(o.a)(f,2),y=v[0],E=v[1],b=r.a.useState(null),g=Object(o.a)(b,2),h=g[0],C=g[1],D=r.a.useState(null),I=Object(o.a)(D,2),S=I[0],O=I[1],N=r.a.useState(a.cats),P=Object(o.a)(N,2),T=P[0],w=P[1];function x(e,n){if("place"===n&&a.players[t].modPos>-1)console.error("Player has already placed his/her mod.");else if(a.board[e].stack.length>0)console.error("Cannot place mod where cats are.");else if(e>0&&null!==a.board[e-1].mod&&a.board[e-1].mod.playerID!==t||e<a.board.length-1&&null!==a.board[e+1].mod&&a.board[e+1].mod!==t)console.error("Cannot place mod adjacent to an existing mod.");else if(null===a.board[e].mod)C(e),O(n),p(!0);else{if(a.board[e].mod.playerID===t)return;console.error("Cannot place mod on top of an existing mod.")}}function B(e){C(e),E(!0)}function M(){return r.a.createElement(j.a,{show:d,onHide:function(){return p(!1)}},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"Placing Mod")),r.a.createElement(j.a.Body,null,"Which kind of mod would you like to place?"),r.a.createElement(j.a.Footer,null,r.a.createElement(k.a,{variant:"secondary",onClick:function(){return p(!1)}},"Cancel"),r.a.createElement(k.a,{variant:"danger",onClick:function(){"place"===S?l(t,h,"tape"):"move"===S&&c(t,h,"tape"),p(!1)}},"Tape"),r.a.createElement(k.a,{variant:"success",onClick:function(){"place"===S?l(t,h,"cucumber"):"move"===S&&c(t,h,"cucumber"),p(!1)}},"Cucumber")))}function _(){return r.a.createElement(j.a,{show:y,onHide:function(){return E(!1)}},r.a.createElement(j.a.Header,{closeButton:!0},r.a.createElement(j.a.Title,null,"Flipping Mod")),r.a.createElement(j.a.Body,null,"Would you like to flip the mod?"),r.a.createElement(j.a.Footer,null,r.a.createElement(k.a,{variant:"secondary",onClick:function(){return E(!1)}},"Cancel"),r.a.createElement(k.a,{variant:"outline-primary",onClick:function(){i(t),E(!1)}},"Remove"),r.a.createElement(k.a,{variant:"primary",onClick:function(){m(t),E(!1)}},"Flip")))}var A=["(\ua3ff \u11ba \ua3ff)","(=^ \u25e1 ^=)","(=\u272a\u11bd\u272a=)","(=\u0da0\u11bd\u0da0=)","(\u2257\u11bd\u2257)","( \u033f\u2013\u11ba \u033f\u2013)"];function L(e){return Number(G.a[e].substring(0,G.a[e].length-2))}var U={width:L("cellwidth"),height:L("cellheight"),margin:L("cellmargin")},R={width:L("tokenwidth"),height:L("tokenheight"),margin:L("tokenmargin")};return Object(J.useEffectListener)("moveFwd",(function(e){var a,t=e.catID,n=e.roll,r=e.preCats,l=e.preBoard,c=r[t][0],o=r,i=l[c].stack,m=i.indexOf(t);a=i.slice(m);for(var s=l[c+1+n].stack.length,u=0;u<a.length;u++)o[a[u]]=[c+1+n,s+u];w(o)}),[]),Object(J.useEffectListener)("modCucumber",(function(e){for(var a=e.cellNum,t=e.preCats,n=e.destHeight,r=e.stack,l=t,c=0;c<r.length;c++)l[r[c]]=[a+1,n+c];w(l)}),[]),Object(J.useEffectListener)("modTape",(function(e){for(var a=e.cellNum,t=e.preCats,n=e.prevStack,r=e.stack,l=t,c=0;c<r.length;c++)l[r[c]]=[a-1,c];for(var o=0;o<n.length;o++)l[n[o]][1]=r.length+o;w(l)}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"cell-container"},a.board.map((function(e,l){return r.a.createElement(F,{cellData:e,key:l,cell_id:l,isExtra:l>=a.numTiles,playerID:t,gameMetadata:n,prePlaceMod:x,preFlipMod:B})})),T.map((function(e,a){return r.a.createElement("div",{className:"cat tokencolor-".concat(a),id:"cattoken-".concat(a),key:"cat_stack_tmp"+a,style:(t=e,{left:"".concat(t[0]*(U.width+2*U.margin)+U.margin+(U.width-R.width)/2,"px"),top:"".concat(U.height+U.margin-(t[1]+1)*(R.height+R.margin),"px")})},A[a],r.a.createElement("br",null));var t}))),r.a.createElement(M,null),r.a.createElement(_,null))}var W=t(10);function K(e){var a=e.rollClick,t=r.a.useState(null),n=Object(o.a)(t,2),l=n[0],c=n[1],i=r.a.useState(null),m=Object(o.a)(i,2),u=m[0],d=m[1],p=null;return Object(J.useEffectListener)("roll",(function(e){d(e),p=setInterval((function(){c(Object(s.random)(1,3))}),100)}),[]),Object(J.useEffectListener)("rollDone",(function(e){clearInterval(p),c(e)}),[]),Object(J.useEffectListener)("rollReset",(function(e){c(null),d(null)}),[]),r.a.createElement("div",{id:"main-dice",className:"rolled-dice tokencolor-".concat(u),onClick:a},l?r.a.createElement("div",{className:"dice-text-wrapper"},l):r.a.createElement("div",{className:"dice-text-wrapper no-dice"},"Roll"))}function z(e){var a=e.stack,t=e.tokenID,n=e.makeSmallBet;return r.a.createElement("div",{className:"small-stack",onClick:function(){return e=t,void(a.length>0&&n(e));var e}},r.a.createElement("div",{className:"small-card card-blank"}),a.map((function(e){return r.a.createElement("div",{className:"small-card tokencolor-".concat(t),key:"small-card"+e},e)})))}function V(e){var a=e.stack,t=e.dice,n=e.makeSmallBet,l=e.rollClick,c=r.a.useState(t),i=Object(o.a)(c,2),m=i[0],s=i[1];return Object(J.useEffectListener)("rollReset",(function(e){s(e)}),[]),r.a.createElement("div",{id:"camp"},Object(W.a)(Array(a.length)).map((function(e,t){return r.a.createElement("div",{className:"tent",key:"tent"+t,style:{transform:"translateX(-50%) rotate(".concat(-15*(a.length-1)/2+15*t,"deg)")}},r.a.createElement(z,{stack:a[t],tokenID:t,makeSmallBet:n}),r.a.createElement("div",{className:"rolled-dice ".concat(m[t]&&"tokencolor-".concat(t))},m[t]?r.a.createElement("div",{className:"dice-text-wrapper"},m[t]):r.a.createElement("div",{className:"dice-text-wrapper no-dice"})))})),r.a.createElement(K,{rollClick:l}))}function X(e){var a=e.stack,t=e.playerID,n=e.makeBigBet,l=e.side;return r.a.createElement("div",{className:"betzone betzone-".concat(l),onDragOver:function(e){e.preventDefault()},onDrop:function(e){e.preventDefault(),n(t,Number(e.dataTransfer.getData("betID")),l)}},"".concat(l,": ").concat(a[l].length))}t(114);function q(e){var a=e.G,t=e.ctx,n=e.moves,l=e.playerID,c=e.gameMetadata;e.gameID,Object(w.a)(e,["G","ctx","moves","playerID","gameMetadata","gameID"]);return l=Number(l),r.a.createElement("div",{id:"game"},r.a.createElement("div",{className:"panel",id:"main"},r.a.createElement(V,{stack:a.smallStack,dice:a.dice,makeSmallBet:function(e){return n.makeSmallBet(l,e)},rollClick:function(){return n.roll(l)}}),r.a.createElement("div",{className:"betarea"},r.a.createElement(X,{stack:a.bigStack,playerID:l,makeBigBet:n.makeBigBet,side:"lose"}),r.a.createElement(X,{stack:a.bigStack,playerID:l,makeBigBet:n.makeBigBet,side:"win"}))),r.a.createElement("div",{className:"panel",id:"players"},r.a.createElement(U,{playerID:l,currentPlayer:t.currentPlayer,players:a.players,gameMetadata:c})),r.a.createElement("div",{className:"panel",id:"board"},r.a.createElement(H,{G:a,playerID:l,gameMetadata:c,placeMod:n.placeMod,moveMod:n.moveMod,removeMod:n.removeMod,flipMod:n.flipMod})))}var Q=t(87),Y=t(60),Z=(t(115),null),$=Object(Q.a)();Y.a.initialize("UA-2995735-5"),Y.a.pageview(window.location.pathname+window.location.search);var ee=function(){var e=Object(n.useState)("lobby"),a=Object(o.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)({}),s=Object(o.a)(c,2),u=s[0],d=s[1];return Object(n.useEffect)((function(){"game"===t.name&&$.push("?"+t.gameID)}),[t.name,t.gameID]),"lobby"===t?r.a.createElement("div",null,r.a.createElement(T,{startGame:function(e,a,t,n){d({gameID:a,playerID:t,credentials:n});var r=Object(J.EffectsBoardWrapper)(q,{updateStateAfterEffects:!0});Z=Object(i.a)({game:h,board:r,multiplayer:Object(m.b)({server:e}),debug:!1}),l("game")}})):"game"===t?r.a.createElement("div",null,r.a.createElement(Z,{gameID:u.gameID,playerID:String(u.playerID),credentials:u.credentials})):void 0};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ee,null)),document.getElementById("root"))},57:function(e,a,t){e.exports={cellwidth:"120px",cellheight:"120px",cellmargin:"3px",tokenwidth:"80px",tokenheight:"30px",tokenmargin:"5px"}},84:function(e,a,t){e.exports=t.p+"static/media/coin.33f54324.svg"},92:function(e,a,t){e.exports=t(145)}},[[92,1,2]]]);
//# sourceMappingURL=main.7c47fefb.chunk.js.map