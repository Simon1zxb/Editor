var btn_configs = new Array(
  "bold|null|粗体",
  "italic|null|斜体",
  "underline|null|下划线",
  "undo|null|撤销",
  "redo|null|重做",
  "justifyLeft|null|左对齐",
  "justifyRight|null|右对齐",
  "justifyCenter|null|居中",
  "removeFormat|null|清除格式",
  "insertOrderedList|null|有序列表",
  "insertUnorderedList|null|无序列表",
  "superscript|null|上角标",
  "subscript|null|下角标",
);
var btn_not_active = new Array(
  "removeFormat","undo","redo","justifyCenter","justifyRight","justifyLeft",
);
var btns = $(".quick_set_button>div");
function  init_editor(){
  var editor = $("#editor").get(0).contentWindow.document;
  editor.contentEditable = true;
  editor.designMode = "on";
  for(var i = 0; i < btn_configs.length; i++){
    var btn_configs_command = btn_configs[i].split("|");
    var command = btn_configs_command[0], value = btn_configs_command[1], name = btn_configs_command[2];
    btns[i].title = name;
    btns[i].command = command;
    btns[i].active = 0;
    btns[i].command_value = value;
    btns[i].onclick = function(){
      var new_window = $("#editor").get(0).contentWindow;
      var flag = new_window.document.execCommand(this.command, false, this.command_value);
      new_window.focus();
    }
  }
}
var font_name_array = new Array("SimSun", "SimHei", "Microsoft YaHei", "FangSong", "KaiTi",
                        "Arial", "Courier New", "Impact", "PmingLiu", "Times New Roman");
var font_name_val_array = new Array("宋体", "黑体", "微软雅黑", "仿宋", "楷体",
                        "Arial", "Courier New", "Impact", "PmingLiu", "Times New Roman");
function select_font_name(){
  var index=$("#font_name_select").get(0).selectedIndex;
  var new_window = $("#editor").get(0).contentWindow;
  new_window.document.execCommand("fontName", false, font_name_array[index]);
  new_window.focus();
}
function select_font_size(){
  var index=$("#font_size_select").get(0).selectedIndex;
  var new_window = $("#editor").get(0).contentWindow;
  new_window.document.execCommand("fontSize", false, String(index+1));
  new_window.focus();
}
function get_editor_content(){
  var editor_content = $('#editor').contents().find('body').html();
  console.log(editor_content);
  return editor_content;
}
$('#editor').contents().find('html').html(getCookie('txt'));
$('#atittle').val(getCookie('txt_tittle'));
init_editor();
$("#editor").get(0).contentWindow.focus();
function frame_height_adapt(){
  var iframe = $("#editor").get(0);
  var height = iframe.contentWindow.document.body.scrollHeight;
  var lastChild = iframe.contentWindow.document.body.lastChild;
  if(lastChild !== null && lastChild.nodeType != 3){
    height = lastChild.offsetTop + lastChild.scrollHeight;
  }
  iframe.height = height;
}
function updata_ebuttons_active(){
    var new_window = $("#editor").get(0).contentWindow;
    for(var i=0; i<btns.length; i++)btns[i].active = 0;
    if(new_window.document.queryCommandState("bold"))$(".bold_button").get(0).active=1;
    if(new_window.document.queryCommandState("italic"))$(".italic_button").get(0).active=1;
    if(new_window.document.queryCommandState("underline"))$(".underline_button").get(0).active=1;
    if(new_window.document.queryCommandState("superscript"))$(".superscript_button").get(0).active=1;
    if(new_window.document.queryCommandState("subscript"))$(".subscript_button").get(0).active=1;
    if(new_window.document.queryCommandState("insertOrderedList"))$(".OrderedList_button").get(0).active=1;
    if(new_window.document.queryCommandState("insertUnorderedList"))$(".OrderedList_button").get(0).active=1;
    for(var i=0; i<btns.length; i++){
      if(btns[i].active == 1)$(btns[i]).addClass("button-active");
      else $(btns[i]).removeClass("button-active");
    }
     $(".font_size_select").val(new_window.document.queryCommandValue("fontSize"));
     var fontName = new_window.document.queryCommandValue("fontName");
     fontName=fontName.replace(/\"/g,"");
     for(var i=0; i < font_name_array.length; i++){
       if(font_name_array[i] == fontName){
         $(".font_name_select").val(font_name_val_array[i]);
         break;
       }
     }
}
function setCookie(name,value)
{
    var Days = 3;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function updata_content_cookie(){
    var editor_content = $('#editor').contents().find('body').html();
    setCookie('txt', editor_content);
    var title_content = $('#atittle').val();
    setCookie('txt_tittle', title_content);
    // console.log(editor_content);
}
function open_cookie(num){
  var new_cookie = getCookie("save"+String(num));
  if(new_cookie !== null){
    $('#editor').contents().find('html').html(new_cookie);
    var new_title = getCookie('tittle'+String(num));
    $('#atittle').val(new_title);
  }
}
function save_cookie(num){
  var editor_content = $('#editor').contents().find('body').html();
  setCookie("save"+String(num), editor_content);
  var title_content = $('#atittle').val();
  setCookie('tittle'+String(num), title_content);
  $(".save"+String(num)).get(0)["innerHTML"]=title_content.substring(0,7)+"<button onclick='open_cookie("+String(num)+")'>打开</button><button onclick='save_cookie("+String(num)+")'>覆盖</button>";
}
function init_Menu_list(){
  for(var num=1;num <4; num++){
    var title_content = getCookie('tittle'+String(num));
    if(title_content !== null){
      $(".save"+String(num)).get(0)["innerHTML"]=title_content.substring(0,7)+"<button onclick='open_cookie("+String(num)+")'>打开</button><button onclick='save_cookie("+String(num)+")'>覆盖</button>";
    }
  }
}
init_Menu_list();
window.setInterval(frame_height_adapt, 200);
window.setInterval(updata_ebuttons_active, 200);
window.setInterval(updata_content_cookie, 2000);
