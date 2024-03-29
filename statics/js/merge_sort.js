 /* Code lines numbers for animation change */
var mergesort_func_start = 1;
var curr_size_dec = 2;
var left_start_dec = 3;
var for_loop_1 = 5;
var for_loop_2 = 6;
var mid_ass = 7;
var right_end_ass= 8;
var merge_call = 10;
var for_loop_1_end = 11;
var for_loop_2_end = 12;
var mergesort_func_end = 13;

var merge_func_start = 15;
var index_dec = 16;
var L_size_cal = 17;
var R_size_cal = 18;
var LR_dec = 19;
var for_loop_3 = 21;
var L_ele_ass = 22;
var for_loop_4 = 24;
var R_ele_ass = 25;
var ijk_ass = 27;
var while_loop_1 = 29;
var if_cond = 30;
var arr_ele_ass_1 = 31;
var if_end = 32;
var else_cond = 33;
var arr_ele_ass_2 = 34;
var else_end = 35;
var while_loop_1_end = 36;
var while_loop_2 = 37;
var arr_ele_ass_3 = 38;
var while_loop_2_end = 39;
var while_loop_3 = 40;
var arr_ele_ass_4 = 41;
var while_loop_3_end = 42;
var merge_func_end = 43;
var main = 45;
var arr_decl = 46;
var size_cal = 47;
var mergesort_call = 49;
var printarr = 51;
var ret0 = 52;
var end = 53;

 
// Total line number of code
var code_line_count=53;

// ace editor configuration
var editor;

//current code line number
var code_line_itr;

// assigning unique element id's to any new div 
var id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

// stores last highlighted line number to remove
var line_rem_highlight = 0;



/**
 * Setup the editor.
 */
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
start=0;
element_at_start=0;
end=0;
element_at_end=0;
mid=0;
curr_size=0;
i_index=0;
j_index=0;
k_index=0;
temp_arr1_size = 0;
temp_arr2_size = 0;
mid_element = null;
start_index = null; 
end_index = null;
curr_size_element = null;
i_element = null;
j_element = null;
k_element = null;
temp_arr1_size_ele = null;
temp_arr2_size_ele = null;
temp_arr1 = null;
temp_arr2 = null;
arr_H_ele1 = null;
arr_H_ele2 = null;
L = [];
R = [];
parent_id = "animation_box";

// assigning unique element id's to any new div 
id_count=0;

// FUNCTION VARIABLE TO store the interval function
var interval;

//array html elements.
set_arr_list_Elm=[];

/**
 * This function loops over each line of code in editor by checking 
 * cases according to line number. Every case highlights particular 
 * line of code, does some opeartion on data structure and changes 
 * animations accordingly.
 */
async function loop() {
    
    if (code_line_itr != main && code_line_itr != 0 && code_line_itr != 12 && code_line_itr != mergesort_func_start) {
        document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
    }
    
    unhighlightBoxELement(start_index);
    unhighlightBoxELement(end_index);
    unhighlightBoxELement(mid_element);
    unhighlightBoxELement(curr_size_element);
    unhighlightBoxELement(i_element);
    unhighlightBoxELement(j_element);
    unhighlightBoxELement(k_element);
    unhighlightBoxELement(temp_arr1_size_ele);
    unhighlightBoxELement(temp_arr2_size_ele);
    unhighlightBoxELement(arr_H_ele1);
    unhighlightBoxELement(arr_H_ele2);

    if(code_line_itr<=code_line_count){
        editor.gotoLine(code_line_itr);
        await sleep(100);
        document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
    }
    
    switch (code_line_itr) {
        case main:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case arr_decl:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case size_cal:
            line_rem_highlight = code_line_itr;
            code_line_itr+=2;
            break;
        case mergesort_call:
            line_rem_highlight = code_line_itr;
            code_line_itr = mergesort_func_start;
            break;
        case printarr:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case ret0:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case mergesort_func_start:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case curr_size_dec:
            line_rem_highlight = code_line_itr;
            curr_size = 0;
            curr_size_element = draw_variable('curr size', curr_size, "variable_set");
            highlightBoxELement(curr_size_element);
            code_line_itr++; 
            break;
        case left_start_dec: 
            line_rem_highlight = code_line_itr;
            start = -1;
            start_index = draw_variable('start', start, "variable_set");
            highlightBoxELement(start_index);
            code_line_itr+=2;
            break;
        case for_loop_1: 
            line_rem_highlight = code_line_itr;
            if (curr_size == 0) {
                curr_size = 1;
            }
            else {
                curr_size = curr_size * 2;
            }
            curr_size_element.innerHTML = curr_size;
            highlightBoxELement(curr_size_element);
            start = -1;
            start_index.innerHTML = start;
            if (curr_size > arr_n-1) {
                console.log(curr_size);
                code_line_itr = mergesort_func_end;
            }
            else {
                code_line_itr++;
            }
            break;
        case for_loop_2: 
            line_rem_highlight = code_line_itr;
            if (start == -1) {
                start = 0;
            }
            else {
                start += curr_size*2;
            } 
            start_index.innerHTML = start;
            highlightBoxELement(start_index);
            if (start >= arr_n-1) {
                code_line_itr = for_loop_1_end;
            } 
            else {
                code_line_itr++;
            }
            break;
        case mid_ass: 
            line_rem_highlight = code_line_itr;
            mid = Math.min(start+curr_size-1, arr_n-1);
            mid_element = draw_variable('mid', mid, "variable_set");
            mid_element.innerHTML = mid;
            highlightBoxELement(mid_element);
            code_line_itr++;
            break;
        case right_end_ass: 
            line_rem_highlight = code_line_itr;
            end = arr_n-1;
            end_index = draw_variable('end', end, "variable_set");
            end = Math.min(start + 2*curr_size - 1, arr_n-1);
            end_index.innerHTML = end;
            highlightBoxELement(end_index);
            code_line_itr+=2;
            break;
        case merge_call: 
            line_rem_highlight = code_line_itr;
            code_line_itr = merge_func_start;
            break;
        case for_loop_2_end: 
            line_rem_highlight = code_line_itr;
            removeBoxElm(mid_element);
            removeBoxElm(end_index);
            code_line_itr = for_loop_2;
            break;
        case for_loop_1_end: 
            line_rem_highlight = code_line_itr;
            code_line_itr = for_loop_1;
            break;
        case mergesort_func_end:           
            line_rem_highlight = code_line_itr;
            removeBoxElm(curr_size_element);
            removeBoxElm(start_index);
            code_line_itr = printarr;
            break;
        case merge_func_start:           
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case index_dec:         
            line_rem_highlight = code_line_itr;
            i_element = draw_variable('i', 0, "variable_set");
            j_element = draw_variable('j', 0, "variable_set");
            k_element = draw_variable('k', 0, "variable_set");
            highlightBoxELement(i_element);
            highlightBoxELement(j_element);
            highlightBoxELement(k_element);
            code_line_itr++;
            break;
        case L_size_cal:         
            line_rem_highlight = code_line_itr;
            temp_arr1_size = mid - start + 1;
            temp_arr1_size_ele = draw_variable('n1', temp_arr1_size, "variable_set");
            highlightBoxELement(temp_arr1_size_ele);
            code_line_itr++;
            break;
        case R_size_cal:          
            temp_arr2_size = end - mid;
            temp_arr2_size_ele = draw_variable('n2', temp_arr2_size, "variable_set");
            highlightBoxELement(temp_arr2_size_ele);
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case LR_dec:
            line_rem_highlight = code_line_itr;
            L = []; R = [];
            for (i_index = 0; i_index < temp_arr1_size; i_index++)
                L.push(arr[start + i_index]);
            temp_arr1 = draw_array('L', L, temp_arr1_size, "heap_row");
            for (j_index = 0; j_index < temp_arr2_size; j_index++)
                R.push(arr[mid + 1 + j_index]);
            temp_arr2 = draw_array('R', R, temp_arr2_size, "heap_row");
            i_index = 0; j_index = 0;
            code_line_itr+=2;
            break;
        case for_loop_3:         
            line_rem_highlight = code_line_itr;
            highlightBoxELement(i_element);
            highlightBoxELement(temp_arr1_size_ele);
            if (i_index >= temp_arr1_size) {
                code_line_itr = for_loop_4;
            }
            else {
                code_line_itr++;
            }    
            break;
        case L_ele_ass:           
            line_rem_highlight = code_line_itr;
            highlightBoxELement(arrElmSet[start + i_index]);
            highlightBoxELement(temp_arr1[i_index]);
            arr_H_ele1 = arrElmSet[start + i_index];
            arr_H_ele2 = temp_arr1[i_index];
            i_element.innerHTML = i_index++;
            highlightBoxELement(start_index);
            highlightBoxELement(i_element);
            code_line_itr = for_loop_3;
            break;
        case for_loop_4:     
            line_rem_highlight = code_line_itr;
            highlightBoxELement(j_element);
            highlightBoxELement(temp_arr2_size_ele);
            if (j_index >= temp_arr2_size) {
                code_line_itr = ijk_ass;
            }
            else {
                code_line_itr++;
            }
            break;
        case R_ele_ass:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(arrElmSet[mid + 1 + j_index]);
            highlightBoxELement(temp_arr2[j_index]);
            arr_H_ele1 = arrElmSet[mid + 1 + j_index];
            arr_H_ele2 = temp_arr2[j_index];
            j_element.innerHTML = j_index++;
            highlightBoxELement(j_element);
            highlightBoxELement(mid_element);
            code_line_itr = for_loop_4;
            break;
        case ijk_ass:
            line_rem_highlight = code_line_itr;
            i_index = 0; j_index =0; k_index = start;
            i_element.innerHTML = i_index;
            j_element.innerHTML = j_index;
            k_element.innerHTML = k_index;
            highlightBoxELement(i_element);
            highlightBoxELement(j_element);
            highlightBoxELement(k_element);
            code_line_itr+=2;
            break;
        case while_loop_1:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(i_element);
            highlightBoxELement(temp_arr1_size_ele);
            highlightBoxELement(j_element);
            highlightBoxELement(temp_arr2_size_ele);
            if (i_index >= temp_arr1_size || j_index >= temp_arr2_size) {
                code_line_itr = while_loop_1_end;
            }
            else {
                code_line_itr++;
            }
            break;
        case if_cond:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(temp_arr1[i_index]);
            highlightBoxELement(temp_arr2[j_index]);
            if (L[i_index] > R[j_index]) {
                code_line_itr = if_end;
            }
            else {
                code_line_itr++;
            }
            break;
        case arr_ele_ass_1:
            line_rem_highlight = code_line_itr;
            arrElmSet[k_index].innerHTML = L[i_index];
            arr_H_ele1 = arrElmSet[k_index];
            arr_H_ele2 = temp_arr1[i_index];
            highlightBoxELement(arrElmSet[k_index]);
            highlightBoxELement(temp_arr1[i_index]);
            arr[k_index++] = L[i_index++];
            i_element.innerHTML = i_index;
            highlightBoxELement(i_element);
            k_element.innerHTML = k_index;
            highlightBoxELement(k_element);
            code_line_itr = while_loop_1;
            break;
        case if_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case else_cond:
            line_rem_highlight = code_line_itr;
            if (L[i_index] < R[j_index]) {
                code_line_itr = else_end;
            }
            else {
                code_line_itr++;
            }
            break;
        case arr_ele_ass_2:
            line_rem_highlight = code_line_itr;
            arrElmSet[k_index].innerHTML = R[j_index];
            arr_H_ele1 = arrElmSet[k_index];
            arr_H_ele2 = temp_arr2[j_index];
            highlightBoxELement(arrElmSet[k_index]);
            highlightBoxELement(temp_arr2[j_index]);
            arr[k_index++] = R[j_index++];
            j_element.innerHTML = j_index;
            highlightBoxELement(j_element);
            k_element.innerHTML = k_index;
            highlightBoxELement(k_element);
            code_line_itr = while_loop_1;
            break;
        case else_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case while_loop_1_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case while_loop_2:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(i_element);
            highlightBoxELement(temp_arr1_size_ele);
            if (i_index >= temp_arr1_size) {
                code_line_itr = while_loop_2_end;
            }
            else {
                code_line_itr++;
            }
            break;
        case arr_ele_ass_3:
            line_rem_highlight = code_line_itr;
            arrElmSet[k_index].innerHTML = L[i_index];
            arr_H_ele1 = arrElmSet[k_index];
            arr_H_ele2 = temp_arr1[i_index];
            highlightBoxELement(arrElmSet[k_index]);
            highlightBoxELement(temp_arr1[i_index]);
            arr[k_index++] = L[i_index++];
            i_element.innerHTML = i_index;
            highlightBoxELement(i_element);
            k_element.innerHTML = k_index;
            highlightBoxELement(k_element);
            code_line_itr = while_loop_2;
            break;
        case while_loop_2_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case while_loop_3:
            line_rem_highlight = code_line_itr;
            highlightBoxELement(j_element);
            highlightBoxELement(temp_arr2_size_ele);
            if (j_index >= temp_arr2_size) {
                code_line_itr = while_loop_3_end;
            }
            else code_line_itr++;
            break;
        case arr_ele_ass_4:
            line_rem_highlight = code_line_itr;
            arrElmSet[k_index].innerHTML = R[j_index];
            arr_H_ele1 = arrElmSet[k_index];
            arr_H_ele2 = temp_arr2[j_index];
            highlightBoxELement(arrElmSet[k_index]);
            highlightBoxELement(temp_arr2[j_index]);
            arr[k_index++] = R[j_index++];
            j_element.innerHTML = j_index;
            highlightBoxELement(j_element);
            k_element.innerHTML = k_index;
            highlightBoxELement(k_element);
            code_line_itr = while_loop_3;
            break;
        case while_loop_3_end:
            line_rem_highlight = code_line_itr;
            code_line_itr++;
            break;
        case merge_func_end:
            line_rem_highlight = code_line_itr;
            removeBoxElm(i_element);
            removeBoxElm(j_element);
            removeBoxElm(k_element);
            removeBoxElm(temp_arr1_size_ele);
            removeBoxElm(temp_arr2_size_ele);
            for(var i=0;i<temp_arr1_size;i++) {
                if(temp_arr1!=null)
                    removeBoxElm(temp_arr1[i]);
            }
            for(var i=0;i<temp_arr2_size;i++){
                if(temp_arr2!=null)
                    removeBoxElm(temp_arr2[i]);
            }
            code_line_itr = for_loop_2_end;
            break;
    }
} 


/** 
* this function puts the loop() function  on interval call of 1000 milli sec
* i.e it is called after every 1000 milli sec of 1 sec
*/
function loop_color(){
    interval = setInterval(loop,1000);
}


/**
 * set size of a array
 */
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

/**
 * set value of a array and enable the control buttons 
 */
function set_Array_value(){
    arr=[];
    for(itr=0;itr<arr_n;itr++){
        arr.push(parseInt(document.getElementById('arr_input_search'+itr).value));
    }
    arrElmSet =  draw_array('arr', arr, arr_n, parent_id); 
    editor.setValue(sortCode+arr_n+arraySize+arr+arrayValue+arr_n+restcode);
    code_line_itr = main;
    EnableCtrlButtons();
}


/**
 * set array value  which are given at run time .
 */
sortCode=`void mergeSort(int arr[], int n) {
    int curr_size;  
    int left_start; 

    for (curr_size=1; curr_size <= n-1; curr_size = 2*curr_size) {
        for (left_start=0; left_start < n-1; left_start += 2*curr_size) {
            int mid = min(left_start + curr_size - 1, n-1);
            int right_end = min(left_start + 2*curr_size - 1, n-1);
            
            merge(arr, left_start, mid, right_end);
        }
    }
}

void merge(int arr[], int l, int m, int r) {
    int i, j, k;
    int n1 = m - l + 1;
    int n2 =  r - m;
    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];

    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1+ j];

    i = 0; j = 0; k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        }
        else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1) {
        arr[k++] = L[i++];
    }
    while (j < n2) {
        arr[k++] = R[j++];
    }
}

int main(){
    int arr[`;
    
arraySize = `] = {`;

arrayValue=`};
    int n = `;

restcode = `;

    mergeSort(arr, n);

    printArray(arr, n);
    return 0;
}`;


/**
 * Removes merge sort animation. Disables setarray and control
 * button. 
 */
function reset(){
    code_line_itr=main;
    for(i=0;i<arr_n;i++){
        if(arrElmSet!=null)
            removeBoxElm(arrElmSet[i]);
            document.getElementById('arr_input_search'+i).remove();
        if(set_arr_list_Elm!=null)
            set_arr_list_Elm[i].remove();
    }
    document.getElementById('max_size_array').value='';
    document.getElementById('set_Array_value').disabled = true;
    removeBoxElm(start_index);
    removeBoxElm(curr_size_element);
    removeBoxElm(mid_element);
    removeBoxElm(end_index);
    removeBoxElm(i_element);
    removeBoxElm(j_element);
    removeBoxElm(k_element);
    removeBoxElm(temp_arr1_size_ele);
    removeBoxElm(temp_arr2_size_ele);
    for(var i=0;i<temp_arr1_size;i++) {
        if(temp_arr1!=null)
            removeBoxElm(temp_arr1[i]);
    }
    for(var i=0;i<temp_arr2_size;i++){
        if(temp_arr2!=null)
            removeBoxElm(temp_arr2[i]);
    }
    
    disbaleCtrlButtons();
    if(line_rem_highlight!=0)
    document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar'); 
}