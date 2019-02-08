var translate = require('@vitalets/google-translate-api');

var QUERY_BLACK_LIST = ['.', '|', '^', '$', '\\', '[', ']', '{', '}', '*', '+', '?', '(', ')', '&', '=', '\"', '\'', '\t', '\n'];

function preprocessWord(word) {
  word = word.trim()
  QUERY_BLACK_LIST.forEach(function(i) {
    word = word.replace(i, ' ')
  });
  var array = word.split('_')
  word = []

  array.forEach(function(itemWord) {
    var lastIndex = 0;
    var reg = /[a-z][A-Z]/g;
    var result;
    while (result = reg.exec(itemWord)) {
      word.push(itemWord.slice(lastIndex, result.index + 1));
      lastIndex = result.index + 1;
    }
    word.push(itemWord.slice(lastIndex));
  });

  return word.join(' ').trim();
}

function translateWord(word) {
  word = preprocessWord(word);

  // 判断如果有中文，则 zh-CN -> en
  var to = /[\u4e00-\u9fa5]/.test(word) ? 'en' : 'zh-CN';
  var from = to === 'en' ? 'zh-CN' : 'en';

  translate(word, {from: from , to: to, raw: true})
    .then(res => {
      try {
        // console.log(res.raw);
        process.stdout.write(processRaw(res.raw));
      } catch(err) {
        process.stderr.write(err.toString());
      }
      // console.log(processraw(res.raw));
      // process.stdout.write(res.text);
      // console.log(res);
      // console.log(res.text);
      //=> I speak English
      // console.log(res.from.language.iso);
      //=> nl
    })
    .catch(err => {
      process.stderr.write(err.toString());
      // console.error(err);
    });
}

function processRaw(raw) {
  if (!raw) return;

  var res = [];
  var json = JSON.parse(raw);
  var arr1 = json[0] && json[0][0];
  var arr2 = json[0] && json[0][1];

  if (arr1) {
    res.push(`${arr1[1]}${arr2[3] ? `(${arr2[3]})` : ''}`);
    res.push(' : ');
    res.push(`${arr1[0]}${arr2[2] ? `(${arr2[2]})` : ''} `);
    res.push('-- ');
    // res.push(`${arr1[0]}(${arr2[2] || ''})`);
    // res.push(arr1[0]);
  }

  // if (arr2) {
  //     res.push(arr2[2]);
  //     res.push(arr2[3]);
  // }

  var arr3 = json[1];
  arr3 && arr3.forEach(function(item) {
    var t = item.slice(1)[0];

    var str = t && t.reduce(function(acc, cur) {
      return acc += `${cur}、`;
    }, `[${item[0]}]. `);
    str = str && str.substr(0, str.length - 1) + '; ';
    str && res.push(str + ' ');
  });

  return res.join('');
}
// var a = 'process.allowedNodeEnvironmentFlags extends Set, but overrides Set.prototype.has to recognize several different possible flag representations. process.allowedNodeEnvironmentFlags.has() will return true in the following cases:'
// translateWord('name')

var word = process.argv.slice(2).join(' ');
if (word) {
    translateWord(word);
}
