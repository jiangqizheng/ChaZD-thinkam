var api = {
    key: 1116151381,
    keyfrom : "youdaocidian"
};

var urls = {
    dict : "http://fanyi.youdao.com/openapi.do?keyfrom=" + api.keyfrom +"&key="+ api.key +"&type=data&doctype=json&version=1.1&q=",
    voice : "http://dict.youdao.com/dictvoice?audio="
};

var settings = {
    selectMode : "mouseSelect",     //划词的形式：直接划词 | Ctrl+划词
    showPosition : "near",   //划词翻译结果显示的位置
    //duration : 5,           //翻译结果显示的时间
    toggleKey : "ctrl",
    showTips : true         //是否显示Tips
}

var frames = {
    //title frame
    titleContainer : "<div class=\"title-container\">#{1}#{2}</div>",
    titleWord : "<div class=\"title-word\">#{1}#{2}</div>",
    voiceContainer : "<div class=\"voice-container\" data-src=\"#{1}\" title=\"#{2}\"></div>",
    titleTranslation : "<div class=\"title-translation\" title=\"结果来自有道翻译\">#{1}</div>",

    //basic frame
    basicContainer : "<div class=\"basic-container\">#{1}#{2}</div>",

    //basic phonetic frame
    phoneticContainer : "<div class=\"phonetic-container\">#{1}#{2}</div>",
    ukPhoneticContainer : "<div class=\"uk-phonetic-container\">#{1}</div>",
    usPhoneticContainer : "<div class=\"us-phonetic-container\">#{1}</div>",

    //basic explain frame
    explainsContainer : "<div class=\"explains-container\">#{1}</div>",
    explainsList : "<ul class=\"explains-list\">#{1}</ul>",
    explain : "<li class=\"explains-item\">#{1}<span class=\"explains-item-value\">#{2}</span></li>",
    propertyContainer : "<b class=\"property-container\" title=\"#{1}\">#{2}</b>",

    //web explain frame
    webExplainsContainer : "<div class=\"web-explains-container\"><div class=\"web-title\">网络释义及短语</div>#{1}</div>",
    webEplainsList : "<ul class=\"web-explains-list\">#{1}</ul>",
    webEplain : "<li><span class=\"web-key\">#{1}</span><span class=\"web-value\">#{2}</span></li>"
}

//判断一个初始化后的对象是否为空
function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}

/*
 * 文本模板函数fmt, @greatghoul
 * 参考TransIt。
 */
function fmt() {
    var args = arguments;
    return args[0].replace(/#{(.*?)}/g, function (match, prop) {
        return function (obj, props) {
            var prop = /\d+/.test(props[0]) ? parseInt(props[0]) : props[0];
            if (props.length > 1) {
                return arguments.callee(obj[prop], props.slice(1));
            } else {
                return obj[prop];
            }
        }(typeof args[1] === 'object' ? args[1] : args, prop.split(/\.|\[|\]\[|\]\./));
    });
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}