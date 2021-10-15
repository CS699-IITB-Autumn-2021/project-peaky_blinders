/* Code lines numbers for animation change */
func_name = 1;
var_declare = 2;
for_loop = 3;
temp_assign = 4;
j_assign = 5;
while_loop = 6;
element_movement = 7;
j_decrement = 8;
while_end = 9;
element_place = 10;
for_end = 11;
func_end = 12;

// Total line number of code
code_line_count=12;

// ace editor configuration
var editor;

//current code line number
var code_line_itr = func_name;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight;

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


// array and search numbers
arr_itr=0;
arr=[];
arrElmSet=null;
arr_n=0;
arr_H_ele1=null;
arr_H_ele2=null;
index_i=null;
element_at_i=0;
index_j=null;
element_at_j=0;
temp=null;
temp_element = 0;
i_val = 0; 
j_val = 0;
parent_id = "animation_box";

// assigning unique element id's to any new div 
id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

set_arr_list_Elm=[];


function insertion_sort () {
    for (let i=1; i<arr_n; i++) {
        index_i.innerHTML = i;
        temp.innerHTML = arr[i];
        temp_element = arr[i];
        let j = i-1;
        while (arr[j] > temp_element && j >= 0){
            index_j.innerHTML = j;
            arr[j+1] = arr[j];
            arrElmSet[j+1].innerHTML = arr[j];
            j--;
        }
        arr[j+1] = temp_element;
        arrElmSet[j+1].innerHTML = temp_element;
        temp.innerHTML = 0;
        console.log(i + " " + j);
    }
}

function loop() {
    
    if (code_line_itr != func_name && code_line_itr != 0) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    
    unhighlightBoxELement(index_i);
    unhighlightBoxELement(index_j);
    unhighlightBoxELement(temp);
    unhighlightBoxELement(arr_H_ele1);
    unhighlightBoxELement(arr_H_ele2);

    switch(code_line_itr) {
        case func_name:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case var_declare:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            i_val = 0;
            index_i = draw_variable('index_i', 0, parent_id);
            index_i.innerHTML = i_val;
            index_j = draw_variable('index_j', '', parent_id);
            j_val = 0;
            index_j.innerHTML = j_val;
            temp = draw_variable('temp', '', parent_id);
            temp_element = 0;
            temp.innerHTML = temp_element;
            highlightBoxELement(index_i);
            highlightBoxELement(index_j);
            highlightBoxELement(temp);
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case for_loop:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            if (i_val+1 == arr_n) {
                code_line_itr = for_end;
            }
            highlightBoxELement(index_i);
            i_val++;
            index_i.innerHTML = i_val;
            code_line_itr++;
            break;
        case temp_assign:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(temp);
            temp_element = arr[i_val];
            temp.innerHTML = temp_element;
            code_line_itr++;
            break;
        case j_assign:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            highlightBoxELement(index_j);
            j_val = i_val - 1;
            index_j.innerHTML = j_val;
            code_line_itr++;
            break;
        case while_loop:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            arr_H_ele1 = arrElmSet[j_val];
            highlightBoxELement(arrElmSet[j_val]);
            highlightBoxELement(temp);
            highlightBoxELement(index_j);
            if (arr[j_val] > temp_element && j_val >= 0) {
                code_line_itr++; 
            }
            else {
                code_line_itr = while_end;
            }
            break;
        case element_movement:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            arr[j_val+1] = arr[j_val];
            arrElmSet[j_val+1].innerHTML = arr[j_val];
            arr_H_ele1 = arrElmSet[j_val];
            arr_H_ele2 = arrElmSet[j_val+1];
            highlightBoxELement(arrElmSet[j_val]);
            highlightBoxELement(arrElmSet[j_val+1]);
            code_line_itr++;
            break;
        case j_decrement:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            j_val--;
            index_j.innerHTML = j_val;
            highlightBoxELement(index_j);
            code_line_itr = while_loop;
            break;
        case while_end:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case element_place:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            arr[j_val+1] = temp_element;
            arrElmSet[j_val+1].innerHTML = temp_element;
            highlightBoxELement(temp);
            arr_H_ele1 = arrElmSet[j_val+1];
            highlightBoxELement(arrElmSet[j_val+1]);
            code_line_itr = for_loop;
            break;
        case for_end:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case func_end:
            document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
            line_rem_highlight = code_line_itr;
            removeBoxElm(index_i);
            removeBoxElm(index_j);
            removeBoxElm(temp);
            code_line_itr++;
            break;
    }

}

function loop_color(){
    interval = setInterval(loop,1000);
}

function setSize(){
    arr_n = parseInt(document.getElementById('max_size_array').value);
    arr=[];
    for(i=0;i<arr_n;i++){
        elm = create_html_element('input','input_array_set');
        elm.setAttribute('class','array_value_input');
        elm.setAttribute('id','arr_input_search'+i);
        elm.value=arr_n - i;
        arr.push(parseInt(document.getElementById('arr_input_search'+i).value));
        set_arr_list_Elm.push(elm);
    }
    document.getElementById('set_Array_value').disabled = false;
    EnableCtrlButtons(rst);
}

function set_Array_value(){
    arr=[];
    for(itr=0;itr<arr_n;itr++){
        arr.push(parseInt(document.getElementById('arr_input_search'+itr).value));
    }
    arrElmSet =  draw_array('arr',arr,arr_n,parent_id); 
    EnableCtrlButtons();
}

function reset(){
    code_line_itr=func_name;
    for(i=0;i<arr_n;i++){
        if(arrElmSet!=null)
            removeBoxElm(arrElmSet[i]);
        if(set_arr_list_Elm!=null)
            set_arr_list_Elm[i].remove();
    }
    document.getElementById('max_size_array').value='';
    document.getElementById('set_Array_value').disabled = true;
    removeBoxElm(index_i);
    removeBoxElm(index_j);
    removeBoxElm(temp);
    disbaleCtrlButtons();
}