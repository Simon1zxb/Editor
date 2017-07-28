var senstive_word_list = new Array();
var panctuation_en = new Array();
var panctuation_ch = new Array();
var panctuation_flag = "en";

function random_name(){
  var show_info = $("#show_info").get(0);
  show_info.innerHTML=Math.random();
}
function filter_html_flag(str){
  str = str.replace(/<\/?[^>]*>/g,'');
  return str;
}
function init_senstive_word_list (){
  $.getJSON("senstive_word.json", function(data){
    $.each(data.senstive,function (i, item){
      senstive_word_list[i]=item.value;
    });
  });
}
function init_panctuation_list(){
  console.log("ok");
  $.getJSON("panctuation_list.json", function(data){
    $.each(data.panctuation,function (i, item){
      panctuation_en[i]=item.en;
      panctuation_ch[i]=item.ch;
    });
  });
}
function filter_senstive(){
    var editor_content = $('#editor').contents().find('body').html();
    editor_content = editor_content.replace(/<strike>/g,'');
    editor_content = editor_content.replace(/<\/strike>/g,'');
    for(var i=0; i < senstive_word_list.length; i++){
      var reg = new RegExp(senstive_word_list[i],'g');
      editor_content = editor_content.replace(reg, senstive_word_list[i].strike());
    }
    $('#editor').contents().find('body').html(editor_content);
}
function unify_panctuation(){
  var editor_content = $('#editor').contents().find('body').html();
  console.log(panctuation_en);
  console.log(panctuation_ch);
  for(var i = 0; i < panctuation_ch.length; i++){
    if(panctuation_flag == "en"){
      var reg = new RegExp(panctuation_ch[i],'g');
      editor_content.replace(reg, panctuation_en[i]);
      panctuation_flag = "ch";
    }
    else{
      var reg = new RegExp(panctuation_en[i],'g');
      editor_content.replace(reg, panctuation_ch[i]);
      panctuation_flag = "en";
    }
  }
  $("#fbtn_panctuation").get(0).value = "统一标点"+ panctuation_flag;
  $('#editor').contents().find('html').html(editor_content);
}
function show_Menu_dropdown(){
  $(".Menu-dropdown").css("visibility", "visible");
}
function hide_Menu_dropdown(){
  $(".Menu-dropdown").css("visibility", "hidden");
}
init_senstive_word_list();
init_panctuation_list();
