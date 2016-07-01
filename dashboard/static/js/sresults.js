

//function for expanding/collapsing div content

function toggle_tb(div_id_tb){
    var div = $(div_id_tb);
    $('#toggle').unbind("click").click(function(){
         //div.slideToggle('fast');
         
         if ($(this).attr('value') == 'Hide') {
            console.log(this + 'hide selected')
            div.animate({
                height: '0%'
                }).hide()
            $(this).attr('value','Show')
            
        } else {
            console.log(this + 'show selected')
            div.animate({
                height: '100%'
                }).show()
            $(this).attr('value','Hide')
        
            }
       });
}

//append a svg file based on selected question num to div-id: line-chart

function append_img(div_id){
    var div = $(div_id);
    var qnum = questionkey[sel_line]
    div.empty().prepend('<object data='+base+'static/image/' + 'q' + qnum + '.svg?1222259157.415" type="image/svg+xml" width="100%" />');
}

//build table using JSON data in jquery
function build_table(data,tb_id){

    var table = $(tb_id)
    console.log(table)
    $(".data-row").empty()
    for(var i = 0;i < data.length; i++){
        console.log(data[i]);
        var row = $("<tr>",{class: "data-row"});
        for(var j = 0; j < data[i].length; j++){
            var cell = $("<td>", {align:"center",valign:"middle"}).text(data[i][j]);
            console.log(data[i][j])
            row.append(cell)
        }
        table.append(row)
    }
}


var sel_line = null;

    //console.log(routes)
var questionkey = buildkey(questions);

for (var key in questionkey){
    var val = questionkey[key];
    console.log("Key: "+key+" Value:"+val);
}

//builds reference questionkey list
function buildkey(questions){
    var questionkey = {};
    for (var i = 0; i < questions.length; i++){
        questionkey[questions[i][1]] = questions[i][0];
    }

    return questionkey
}

function reset(){
    $("#surveyor-route").hide();
    $("#line-chart").hide();
    $("#surveyor-count").hide();
    $("#surveyor-pie-chart").hide();
    $("#route-count").hide();
    $("#route-pie-chart").hide();
    $("#wk-bar-chart").hide();
    $("#button-header").hide();
    $("#toggle").attr('value','Hide');
}


$('#filter_line a').on('click', function() {
    reset();
    sel_line = this.text
    console.log(sel_line)
    console.log(questionkey[sel_line])
    var qnum = questionkey[sel_line];
    var args = {"qnum":(questionkey[sel_line])};
    console.log("qnum: " + qnum)
    $("#line_btn").text(this.text+' ').append('<span class="caret"></span>');

    if (questionkey[sel_line] == 1) {
        console.log(questionkey[sel_line])
        
        $("#transfer").show();
        $("#line-chart").show();
        $("#button-header").show();
        $.getJSON('transferdata', args, function(data) {
            tb_id = "#transfer-table"
            div_id_ln = "#line-chart"
            div_id_tb = "#transfer"
            data = data.data;
            console.log(data);
            build_table(data,tb_id);
            append_img(div_id_ln);
            toggle_tb(div_id_tb);
            
        });

    }
    else if (questionkey[sel_line] == 300) {
        
        $("#surveyor-count").show();
        $("#surveyor-pie-chart").show();
        $("#button-header").show();
        $.getJSON('userdata', args, function(data) {
            tb_id = "#surveyor-pct"
            div_id = "#surveyor-pie-chart"
            div_id_tb = "#surveyor-count"
            data = data.data;
            console.log(data)
            build_table(data,tb_id);
            append_img(div_id);
            toggle_tb(div_id_tb);
           
        });
    }
    else if (questionkey[sel_line] == 310) {
      
        $("#route-count").show();
        $("#route-pie-chart").show();
        $("#button-header").show();
        
        
        $.getJSON('rtedata', args, function(data) {
            tb_id = "#rte-count"
            div_id_ch = "#route-pie-chart"
            div_id_tb = "#route-count"
            data = data.data;
            console.log(data)
            build_table(data,tb_id);
            append_img(div_id_ch);
            toggle_tb(div_id_tb);
           
        });
    }
    else if (questionkey[sel_line] == 320) {
        
        $("#wk-bar-chart").show();
        
        $.getJSON('surveywkd', args, function(data) {
            div_id = "#wk-bar-chart"
            data = data.data;
            console.log(data)
            append_img(div_id);
        });
    }

});