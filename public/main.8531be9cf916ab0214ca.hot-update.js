self.webpackHotUpdatevanilla_boilerplate("main",{"./app/index.js":()=>{throw new Error('Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/app/index.js: Unexpected token, expected "(" (94:5)\n\n[0m [90m 92 |[39m \t\t[36mconst[39m request [33m=[39m [36mawait[39m window[33m.[39mfetch(url)[33m;[39m[0m\n[0m [90m 93 |[39m[0m\n[0m[31m[1m>[22m[39m[90m 94 |[39m \t\t[36mif[39m url contains [0m\n[0m [90m    |[39m \t\t   [31m[1m^[22m[39m[0m\n[0m [90m 95 |[39m[0m\n[0m [90m 96 |[39m \t\t[36mif[39m (request[33m.[39mstatus [33m===[39m [35m200[39m) {[0m\n[0m [90m 97 |[39m \t\t\t[36mconst[39m html [33m=[39m [36mawait[39m request[33m.[39mtext()[33m;[39m[0m\n    at constructor (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:353:19)\n    at Parser.raise (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:3277:19)\n    at Parser.unexpected (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:3297:16)\n    at Parser.expect (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:3601:28)\n    at Parser.parseHeaderExpression (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12497:10)\n    at Parser.parseIfStatement (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12596:22)\n    at Parser.parseStatementContent (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12258:21)\n    at Parser.parseStatementLike (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12229:17)\n    at Parser.parseStatementListItem (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12209:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12786:61)\n    at Parser.parseBlockBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12779:10)\n    at Parser.parseBlock (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12767:10)\n    at Parser.parseFunctionBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:11606:24)\n    at Parser.parseFunctionBodyAndFinish (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:11592:10)\n    at Parser.parseMethod (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:11550:31)\n    at Parser.pushClassMethod (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:13188:30)\n    at Parser.parseClassMemberWithIsStatic (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:13097:14)\n    at Parser.parseClassMember (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:13024:10)\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12978:14\n    at Parser.withSmartMixTopicForbiddingContext (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:11903:14)\n    at Parser.parseClassBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12960:10)\n    at Parser.parseClass (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12938:22)\n    at Parser.parseStatementContent (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12256:21)\n    at Parser.parseStatementLike (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12229:17)\n    at Parser.parseModuleItem (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12206:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12786:36)\n    at Parser.parseBlockBody (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12779:10)\n    at Parser.parseProgram (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12106:10)\n    at Parser.parseTopLevel (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:12096:25)\n    at Parser.parse (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:13895:10)\n    at parse (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/parser/lib/index.js:13937:38)\n    at parser (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/core/lib/parser/index.js:41:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/core/lib/transformation/normalize-file.js:64:37)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/core/lib/transformation/index.js:21:50)\n    at run.next (<anonymous>)\n    at transform (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/core/lib/transform.js:22:33)\n    at transform.next (<anonymous>)\n    at step (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:261:32)\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:223:11)\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:189:28\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/@babel/core/lib/gensync-utils/async.js:67:7\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:113:33\n    at step (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:287:14)\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:223:11)\n    at /Users/nonsoanetoh/Documents/Projects/lumos-vanilla/node_modules/gensync/index.js:37:40')}},(function(e){e.h=()=>"d5f6a6cc38b21fa7cbe3"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44NTMxYmU5Y2Y5MTZhYjAyMTRjYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiIyZ05BQUFBLEVBQW9CQyxFQUFJLElBQU0sc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YW5pbGxhLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkNWY2YTZjYzM4YjIxZmE3Y2JlM1wiKSJdLCJuYW1lcyI6WyJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiaCJdLCJzb3VyY2VSb290IjoiIn0=