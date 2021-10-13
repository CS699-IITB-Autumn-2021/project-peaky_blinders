// function Creates HTML element of given type under given parent_id

function create_html_element(element_type,parent_id){
    elm = document.createElement(element_type);
    elm.setAttribute('id',element_type+'_'+id_count);
    id_count++;
    document.getElementById(parent_id).appendChild(elm);
    return elm;
}

// 
function draw_boxes(arr,arr_n,parent_id,type_class){
    elm_list = [];
    for(i=0;i<arr_n;i++)
    {
        elm = create_html_element('div',parent_id);
        elm.setAttribute('class','box');
        elm.classList.add(type_class);
        elm.innerHTML = arr[i];
        elm_list.push(elm);
    }
    return elm_list;
}

// fucntion to create fieldset
function draw_fieldset(legend_string,parent_id){
    field = create_html_element('fieldset',parent_id);
    field.setAttribute('class','fieldSet');
    legend = create_html_element('legend',field.id);
    legend.innerHTML = legend_string;
    
    return field;
}

function draw_arrow(parent_id)
{
    arrow_box = create_html_element('arrow',parent_id);
    arrow_tail = create_html_element('div',arrow_box.id);
    arrow_tail.setAttribute('class','arrow');
    arrow_head = create_html_element('div',arrow_tail.id); 
    arrow_head.setAttribute('class','arrow_head');
    return arrow_box;
}

function draw_arrow_special(parent_id)
{
    arrow_box = create_html_element('arrow',parent_id);
    arrow_tail1 = create_html_element('div',arrow_box.id);
    arrow_tail1.setAttribute('class','arrow');
    arrow_tail1.classList.add('ar1');
    arrow_tail2 = create_html_element('div',arrow_box.id);
    arrow_tail2.setAttribute('class','arrow');
    arrow_tail2.classList.add('ar2');
    arrow_tail3 = create_html_element('div',arrow_box.id);
    arrow_tail3.setAttribute('class','arrow');
    arrow_tail3.classList.add('ar3');
    arrow_head = create_html_element('div',arrow_tail3.id); 
    arrow_head.setAttribute('class','arrow_head');
    return arrow_box;
}

class Stack{
    constructor(parent_id,size){
        const arr_blank =[];
        for(var i=0;i<size;i++)
        {
            arr_blank.push(' ');
        }
        var stack_field = draw_fieldset('STACK',parent_id);
        this.top_pointer = draw_arrow(stack_field.id);
        this.top_pointer.style.position='relative';
        
        this.top_pointer.style.top = 55*Math.ceil(size/2)+'px';
        var stack_arr = draw_fieldset('stack',stack_field.id);
        var stack_size = draw_fieldset('size',stack_field.id);
        var stack_top = draw_fieldset('top',stack_field.id);
        var stack_element = draw_fieldset('element',stack_field.id);
        this.size_val = draw_boxes([size],1,stack_size.id,'array')[0]; 
        this.top_val = draw_boxes([-1],1,stack_top.id,'array')[0];
        this.element = draw_boxes([0],1,stack_element.id,'array')[0]; 
        this.arr_list = draw_boxes(arr_blank,size,stack_arr.id,'stack');
    }
    push(val){
        var top = parseInt(this.top_val.innerHTML)+1;
        var size = parseInt(this.size_val.innerHTML);
        if(top==size)
            console.log("stack out of bound");
        else
        {
            this.arr_list[size-(top+1)].innerHTML = val;
            this.top_val.innerHTML = top;
            this.top_pointer.style.top = 55*(Math.ceil(size/2)-(top+1))+'px';
        }    
    }
    pop(){
        var val=' ';
        var top = parseInt(this.top_val.innerHTML);
        var size = parseInt(this.size_val.innerHTML);
        if(top==-1)
            console.log("stack empty");
        else
        {
            val = parseInt(this.arr_list[size-(top+1)].innerHTML);
            this.arr_list[size-(top+1)].innerHTML=' ';
            top = top-1;
            this.top_val.innerHTML = top;
            this.top_pointer.style.top = 55*(Math.ceil(size/2)-(top+1))+'px';
        }
        return val;
    }
}


class linkedList{
    constructor(parent_id){
        this.linkedListField = draw_fieldset('LInked List',parent_id);
        this.arr = [];
        this.size = 0;
        this.box_list=[];
        this.arrow_list=[];
    }
    insert(val){
        if(this.size ==0){
            this.arr.push(val);
            this.box_list.push(draw_boxes([val],1,this.linkedListField.id,'array')[0]);
            this.size++;
        }
        // -135 for 4   left -260 top 
        else{
            var arrow = draw_arrow(this.linkedListField.id);
            arrow.style.position='relative';
            this.arrow_list.push(arrow);
            var box = draw_boxes([val],1,this.linkedListField.id,'array')[0];
            this.box_list.push(box);
            this.arr.push(val);
            this.size++;
        }
    }
}