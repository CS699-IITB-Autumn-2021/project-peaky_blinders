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

function draw_variable(var_name,variable,parent_id){
    return draw_boxes([variable],1,draw_fieldset(var_name,parent_id).id,'array')[0];
}

function draw_array(var_name,variable,size,parent_id){
    return draw_boxes(variable,size,draw_fieldset(var_name,parent_id).id,'array');
}
function draw_set(arrName,arr,arr_n,parent_id){
    parent = draw_fieldset(arrName,parent_id);
    box_list = [];
    for(i=0;i<arr_n;i++)
    {
        elm = document.createElement('div');
        elm.setAttribute('id','div_'+id_count);
        elm.setAttribute('class','set');
        id_count++;

        box = document.createElement('div');
        box.setAttribute('id','div_'+id_count);
        box.setAttribute('class','box');
        id_count++;
        box.innerHTML = arr[i];

        box_list.push(box);

        box2 = document.createElement('div');
        box2.setAttribute('id','div_'+id_count);
        box2.setAttribute('class','dummybox');
        id_count++;

        elm.appendChild(box);
        elm.appendChild(box2);
        document.getElementById(parent.id).appendChild(elm);

    }
    return box_list;
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

function draw_arrow_color(parent_id,arrowColor,arrow_headColor)
{
    arrow_box = create_html_element('arrow',parent_id);
    arrow_tail = create_html_element('div',arrow_box.id);
    arrow_tail.setAttribute('class','arrow');
    arrow_tail.style.background=arrowColor;
    arrow_head = create_html_element('div',arrow_tail.id); 
    arrow_head.setAttribute('class','arrow_head');
    arrow_head.style.borderBottomColor = arrow_headColor;
    return arrow_box;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightBoxELement(elm){
    if(elm!=null)
        elm.classList.add('box_label_active');
}

function unhighlightBoxELement(elm){
    if(elm!=null)
        if(elm.classList.contains('box_label_active'))
            elm.classList.remove('box_label_active');
}
function removeBoxElm(elm){
    if(elm!=null)
        if(elm.parentElement!=null)
            elm.parentElement.remove();
}


class Stack{
    constructor(parent_id,size,stackName){
        const arr_blank =[];
        for(var i=0;i<size;i++)
        {
            arr_blank.push(' ');
        }
        this.stack_field = draw_fieldset(stackName,parent_id);
        this.top_pointer = draw_arrow(this.stack_field.id);
        this.top_pointer.style.position='relative';
        
        this.top_pointer.style.top = 55*Math.ceil(size/2)+'px';
        var stack_arr = draw_fieldset('stack',this.stack_field.id);
        var stack_size = draw_fieldset('size',this.stack_field.id);
        var stack_top = draw_fieldset('top',this.stack_field.id);
        this.size_val = draw_boxes([size],1,stack_size.id,'array')[0]; 
        this.top_val = draw_boxes([-1],1,stack_top.id,'array')[0]; 
        this.arr_list = draw_boxes(arr_blank,size,stack_arr.id,'stack');
    }
    push(val){

        var top = parseInt(this.top_val.innerHTML)+1;
        var size = parseInt(this.size_val.innerHTML);
        if(top==size){
            console.log("stack out of bound");            
            highlightBoxELement(this.size_val);
        }
        else
        {
            this.arr_list[size-(top+1)].innerHTML = val;
            this.top_val.innerHTML = top;
            highlightBoxELement(this.arr_list[size-(top+1)]);
            this.top_pointer.style.top = 55*(Math.ceil(size/2)-(top+1))+'px';
        }    
        highlightBoxELement(this.top_val);
    }
    pop(){
        var val=' ';
        var top = parseInt(this.top_val.innerHTML);
        var size = parseInt(this.size_val.innerHTML);
        if(top==-1)
        {
            console.log("stack empty");
            highlightBoxELement(this.size_val);
        }
        else
        {
            val = parseInt(this.arr_list[size-(top+1)].innerHTML);
            this.arr_list[size-(top+1)].innerHTML=' ';
            unhighlightBoxELement(this.arr_list[size-(top+1)]);
            top = top-1;
            this.top_val.innerHTML = top;
            this.top_pointer.style.top = 55*(Math.ceil(size/2)-(top+1))+'px';
        }
        highlightBoxELement(this.top_val);
        return val;
    }
    removeHighlight(){
        unhighlightBoxELement(this.top_val);
        unhighlightBoxELement(this.size_val);
    }
    remove(){
        this.top_val.parentElement.parentElement.remove();
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


class Queue{
    constructor(parent_id,size,queueName){
        this.queue_field = draw_fieldset(queueName,parent_id);
        
        var div_variables_set = create_html_element('div',this.queue_field.id);
        // div_variables_set.setAttribute('id','queue_varaibleSet');
        /*const*/
        this.size = size;
        this.sizeElm = draw_variable('size',size,div_variables_set.id);
        /**temp*/
        this.front=-1;
        this.frontElm = draw_variable('front',this.front,div_variables_set.id);
        this.frontElm.classList.add('front_val_legend');
        /**temp*/
        this.rear=-1;
        this.rearElm = draw_variable('rear',this.rear,div_variables_set.id);
        this.rearElm.classList.add('rear_val_legend');
        /**heap*/
        this.arr=[];
        for(var i=0;i<this.size;i++){
            this.arr.push(' ');
        }
        this.arrElem = draw_set('arr',this.arr,this.size,this.queue_field.id);
        var arr_box_id = this.arrElem[0].parentElement.parentElement.id

        /**Arrow creation */
        this.front_pointer = draw_arrow_color(arr_box_id,'red','red');
        this.front_pointer.style.position='relative';        
        this.front_pointer.style.transform = 'rotate(270deg)';
            
        this.rear_pointer = draw_arrow_color(arr_box_id,'green','green');
        this.rear_pointer.style.position='relative';        
        this.rear_pointer.style.transform = 'rotate(270deg)';
        /**/ 

        /*arrow position setting */
        var rectBox = this.arrElem[0].getBoundingClientRect();
        rectBox['x']-=60;
        this.faRectOrigin = this.front_pointer.getBoundingClientRect();
        this.front_pointer.style.top =(rectBox['y']-this.faRectOrigin['y'])+55+'px';
        this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';

        this.reRectOrigin = this.rear_pointer.getBoundingClientRect();
        this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
        this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';
    }
    
    enqueue(val){
        highlightBoxELement(this.frontElm);
        highlightBoxELement(this.rearElm);
        if(this.rear==this.size-1){
            console.log("queue full");            
            highlightBoxELement(this.sizeElm);
        }
        else{
            this.rear+=1;
            this.rearElm.innerHTML = this.rear;
            this.arr[this.rear]=val;
            this.arrElem[this.rear].innerHTML = val;
            highlightBoxELement(this.arrElem[this.rear]);
            //rear pointer movement 
            var rectBox = this.arrElem[this.rear].getBoundingClientRect();
            this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
            this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';

            if(this.front==-1)
            {
                this.front_pointer.style.visibility='visible';
                this.rear_pointer.style.visibility='visible';
                this.front=0;
                this.frontElm.innerHTML=this.front;
                this.front_pointer.style.top =rectBox['y']-this.faRectOrigin['y']+55+'px';
                this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';    
            }
        }    
    }

    dequeue (){
        var val=' ';
        highlightBoxELement(this.frontElm);
        if(this.front==-1){
            console.log("queue empty");
        }
        else{
            val = this.arr[this.front];
            this.arrElem[this.front].innerHTML = ' ';
            unhighlightBoxELement(this.arrElem[this.front]);
            this.front+=1;
            this.frontElm.innerHTML=this.front;
            
            if(this.front > this.rear)
            {
                highlightBoxELement(this.rearElm);
                this.front=this.rear=-1;
                this.frontElm.innerHTML=this.rear;
                this.rearElm.innerHTML=this.rear;
                var rectBox = this.arrElem[0].getBoundingClientRect();
                rectBox['x']-=60;
                this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
                this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';
            }
            else{
                var rectBox = this.arrElem[this.front].getBoundingClientRect();
            }
            this.front_pointer.style.top =rectBox['y']-this.faRectOrigin['y']+55+'px';
            this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';    
        }
        return val;
    }

    removeHighlight(){
        unhighlightBoxELement(this.frontElm);
        unhighlightBoxELement(this.rearElm);
        unhighlightBoxELement(this.sizeElm);
    }

    remove(){
        this.front_pointer.remove();
        this.rear_pointer.remove();
        this.queue_field.remove();
    }
    
    set_arrow_position(){
        if(this.front==-1){
            var rectBox = this.arrElem[0].getBoundingClientRect();
            rectBox['x']-=60;
        }
        else{
            var rectBox = this.arrElem[this.front].getBoundingClientRect();
        }
        this.faRectOrigin = this.front_pointer.getBoundingClientRect();
        this.front_pointer.style.top =(rectBox['y']-this.faRectOrigin['y'])+55+'px';
        this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';    

        if(this.rear==-1){
            var rectBox = this.arrElem[0].getBoundingClientRect();
            rectBox['x']-=60;
        }
        else{
            var rectBox = this.arrElem[this.rear].getBoundingClientRect();
        }
        this.reRectOrigin = this.rear_pointer.getBoundingClientRect();
        this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
        this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';           
    }
}