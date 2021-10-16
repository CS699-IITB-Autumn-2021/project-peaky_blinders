/* Code lines numbers for animation change */

// ace editor configuration
var editor;

//Max stack size
var stack_size = 0;

//current code line number
var code_line_itr = 0;

// Total line number of code
code_line_count=22;

    // assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight;

var queue_obj=null;

var stack_content = [];
var top1=0; 
var size=stack_size;

function setUpEditor(){
    editor = ace.edit("editor");    //the html tag with id 'editor' contains the code to be highlighted
    editor.setTheme("ace/theme/cobalt");   // set the background theme to cobalt0
    editor.getSession().setMode("ace/mode/c_cpp");  // sets the langugage for key highlight as c_cpp (both c and c++)
    editor.setReadOnly(true);   // make the code section as read only
    Range = ace.require('ace/range').Range;    // Range Object to be used to identity line of code.
    
    // removing initial line markers :: removeMarker(Marker id)
    editor.session.removeMarker(1);
    editor.session.removeMarker(2);
    
    // adding marker to each line of code.
    const r = [];
    
    for(itr=0;itr<code_line_count;itr++)
    {   
        r[itr] = new Range(itr, 0,itr, 100);    // marking the range for  code line no <itr>
        r[itr].id = editor.session.addMarker(r[itr],"foo"+(itr+1),"fullLine");  // class foo<id_count> will act as an identifire for each line
        // console.log(itr);
    }
}

var parent_id = 'variable_set';
var temp = 'temp';
var heap = 'heap';
var constants = 'constants'

function loop() {
    if (code_line_itr != push_begin && code_line_itr != pop_begin && code_line_itr != 0) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    // if (stk_obj.top_val.classList.contains('box_label_active')) {
    //     stk_obj.top_val.classList.remove('box_label_active');
    // }
    stk_obj.removeHighlight();
    switch(code_line_itr) {
        default:
            break;
    }  
}

function enqueue(){
    queue_obj.enqueue(document.getElementById('enqueue_val').value);
}


function dequeue(){
    document.getElementById('dequeue_val').value = queue_obj.dequeue();
}


function createQueue(){
    if (!queue_obj) {
        queue_size = parseInt(document.getElementById("max_size").value);
        if(isNaN(queue_size))
            console.log('Error in size');
        else{
            queue_obj = new Queue(heap, queue_size,'queue');
            document.getElementById("enqueue").disabled = false;
            document.getElementById("dequeue").disabled = false;    
        }
    }
}  

// this function puts the loop() function  on interval call of 1000 milli sec
// i.e it is called after every 1000 milli sec of 1 sec
function loop_color(){
    interval = setInterval(loop,1000);
}

function reset(){
    if(queue_obj!=null)
        queue_obj.remove();
    queue_obj=null;
    document.getElementById("enqueue").disabled = true;
    document.getElementById("dequeue").disabled = true;    
}