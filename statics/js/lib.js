/**
 * function Creates HTML element of given type under given parent_id
 * @param {string} element_type- type of element
 * @param {string} parent_id - parent id of element
 * @return {object} return HTML element created
 */

function create_html_element(element_type,parent_id){
    elm = document.createElement(element_type);
    elm.setAttribute('id',element_type+'_'+id_count);
    id_count++;
    document.getElementById(parent_id).appendChild(elm);
    return elm;
}

/**
 * Draws boxes in an array of size arr_n for a type under given parent id.
 * @param {Array} arr - array of numbers 
 * @param {integer} arr_n - size of array
 * @param {string} parent_id - parent id of element
 * @param {string} type_class - type (stack or heap)
 * @return {object} return HTML element list created
 */

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

/**
 * Draws a fieldset.
 * @param {string} legend_string - String to be displayed in legend
 * @param {string} parent_id - Parent id
 * @return {object} return HTML element list created
 */
function draw_fieldset(legend_string,parent_id){
    field = create_html_element('fieldset',parent_id);
    field.setAttribute('class','fieldSet');
    legend = create_html_element('legend',field.id);
    legend.innerHTML = legend_string;
    
    return field;
}

/**
 * Draws a variable with some value.
 * @param {string} var_name - Variable name to be displayed
 * @param {string} variable - Value of variable
 * @param {string} parent_id - Parent id of element
 * @return {object} return HTML element "variable" 
 */
function draw_variable(var_name,variable,parent_id){
    return draw_boxes([variable],1,draw_fieldset(var_name,parent_id).id,'array')[0];
}

/**
 * Draws an array of boxes.
 * @param {string} var_name - Variable name to be displayed
 * @param {string} variable - Value of variable
 * @return {object} return HTML element which is an array of boxes 
 */
function draw_array(var_name,variable,size,parent_id){
    return draw_boxes(variable,size,draw_fieldset(var_name,parent_id).id,'array');
}

/**
 * Draws an fieldset with array of boxes
 * @param {string} arrName - Name of the array to be displayed
 * @param {string} arr - Array of integers
 * @param {integer} arr_n - Size of array
 * @param {string} parent_id - Parent id of element to be created
 * @return {object} return HTML element which is an array of boxes 
 */
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

/**
 * Draws an arrow in given parent id
 * @param {string} parent_id - Parent id of arrow to be drawn
 * @return {object} return arrow HTML element 
 */
function draw_arrow(parent_id)
{
    arrow_box = create_html_element('arrow',parent_id);
    arrow_tail = create_html_element('div',arrow_box.id);
    arrow_tail.setAttribute('class','arrow');
    arrow_head = create_html_element('div',arrow_tail.id); 
    arrow_head.setAttribute('class','arrow_head');
    return arrow_box;
}

/**
 * Draws arrow with some color to tail and head.
 * @param {string} parent_id - Parent id of arrow to be created
 * @param {string} arrowColor - Color of arrow
 * @param {string} arrow_headColor - Color of head of arrow
 * @return {object} return arrow HTML element with desired color
 */
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

/**
 * Sets a timeout
 * @param {integer} ms - time in milliseconds
 * @returns {Promise} - return a promise
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Adds element highlight by adding a required class from it.
 * @param {object} elm - HTML element
 *  
 */
function highlightBoxELement(elm){
    if(elm!=null)
        elm.classList.add('box_label_active');
}

/**
 * Removes element highlight by removing a required class from it.
 * @param {object} elm - HTML element
 *  
 */
function unhighlightBoxELement(elm){
    if(elm!=null)
        if(elm.classList.contains('box_label_active'))
            elm.classList.remove('box_label_active');
}

/**
 * Removes box type element
 * @param {object} elm - HTML element
 *  
 */
function removeBoxElm(elm){
    if(elm!=null)
        if(elm.parentElement!=null)
            elm.parentElement.remove();
}

/**
 * Creates array of buttons and returns it.
 * @param {integer} number_of_buttons - number of buttons
 * @param {string} innertext - text to be displayed
 * @param {string} class1 - class of button
 * @param {string} onclickfunc - onclick function name
 * @param {string} parent_id - parent id of element to be created
 * @param {boolean} isDisabled - Should be disabled or not
 * @return {object} array of buttons
 */
function createButtonArr(number_of_buttons, innertext, class1, onclickfunc, parent_id, isDisabled) {
    btn_arr = [];
    for (var i=1; i<=number_of_buttons; i++) {
        let btn = document.createElement("button");
        btn.setAttribute("class", class1);
        btn.innerHTML = innertext + " " + i;
        btn.onclick = function () { onclickfunc(btn.innerHTML.substr(0, 1)+btn.innerHTML.substr(btn.innerHTML.length-1, 1)); };;
        btn.disabled = isDisabled;
        btn_arr.push(btn);
        document.getElementById(parent_id).appendChild(btn);
    }
    return btn_arr;
}

/** Class for Stack. */
class Stack{

    /**
     * Create a stack.
     * @param {string} parent_id - Parent id of stack to be created
     * @param {number} size - Max size of stack
     * @param {string} stackName - Name of stack
     */
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

    /**
     * Pushes val into stack at position top. Renders it into animation
     * @param {number} val - Value.
     */
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

    /**
     * Pops value present at top of stack and renders it into animation.
     */
    pop(){
        var val=-1;
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

    /**
     * Removes highlight from the top_val and size_val elements
     */
    removeHighlight(){
        unhighlightBoxELement(this.top_val);
        unhighlightBoxELement(this.size_val);
    }

    /**
     * Removes whole stack animation
     */
    remove(){
        this.top_val.parentElement.parentElement.remove();
    }
}

/** Class for Linked List */
class linkedList{
    /**
     * Creates the initial frame for linked list and initializes the variables with given name.
     * @param {string} parent_id ID of the html element inside which this linkedlist will be created
     * @param {string} linkedList_name  name of the linked list
     */
     constructor(parent_id,linkedList_name='Linked List'){
        this.linkedListField = draw_fieldset(linkedList_name,parent_id);
        this.linkedListField.style.maxWidth = '800px';  
        this.arr = [];
        this.size = 0;
        this.box_list=[];
        this.arrow_list=[];
        this.manual =0 ;
        this.dir=0; // right 0 left 1
        this.lc = 0;
        this.level=0;
        this.litr=0;
        this.ltype= 0 //0 odd 1 even
        this.head = draw_boxes(['H'],1,this.linkedListField.id,'array')[0];
        // this.head.style.fontSize = '15px';
        this.box_list.push(this.head);
        this.size=1;
        this.linkedListField.style.borderBottom='none';
        this.tempBox;
        this.arrowPre;
        this.arrowPost;
        this.currBox;
        this.currArrow;
    }
    /**
     * Sets the arrow and box to correct position and angle
     * @param {object} arrow newly created arrow 
     * @param {object} box  newly created box
     */
    setArrowBox(arrow,box){
        var field_rect = this.linkedListField.getBoundingClientRect();
        var cur_box_rect = box.getBoundingClientRect();
        var cur_arw_rect = arrow.getBoundingClientRect();
    
        if(800-field_rect['right']<40){
            if(this.manual ==0)
            {
                // var last_box_rect = this.box_list[this.size-1].getBoundingClientRect();

                if((field_rect['right']-cur_box_rect['right'] < 90)) {
                }   
                else{
                    // arrow.style.transform = 'rotate(90deg)';
                    arrow.classList.add('arrow_rt_90');
                    box.style.top = 60+'px';
                    this.manual=1;  
                    this.dir=1;
                    this.level=1;
                    this.lc = this.size;
                    this.litr  = 1;
                    if((field_rect['right']-cur_arw_rect['right'] < 90)){
                        arrow.style.top =  '60px';                    
                        arrow.style.left = -60+'px';
                        box.style.left =130*(this.box_list.length-1)+'px'; 
                        this.ltype = 0;
                    }
                    else{
                        arrow.style.left =(130*(this.box_list.length-1))+'px';
                        box.style.left = (130*(this.box_list.length-1))-70+'px'; 
                        this.ltype = 1;
                    }    
                } 
            }    
            else{
                if(this.dir==1){
                    if(this.litr <(this.lc-1)){
                        // arrow.style.transform  = 'rotate(180deg)';
                        arrow.classList.add('arrow_rt_180');
                        arrow.style.top = 60*this.level + 'px';
                        box.style.top = 60*this.level + 'px';
                        if(this.ltype==0){
                            arrow.style.left = 130*(this.lc-2*this.litr-1)+130+'px';
                            box.style.left = 130*(this.lc-2*this.litr-1)+'px';                                   
                        }
                        else{
                            arrow.style.left = 130*(this.lc-2*this.litr-((this.level+1)/2))+60+'px';
                            box.style.left = 130*(this.lc-2*this.litr-((this.level+1)/2))-70+'px';    
                        }
                        this.litr+=1;
                    }             
                    else if(this.litr == (this.lc-1)){
                        // arrow.style.transform  = 'rotate(180deg)';
                        arrow.classList.add('arrow_rt_180');
                        arrow.style.top = 60*this.level + 'px';
                        
                        if(this.ltype==1){
                            // box.style.top = 60*this.level + 'px';
                            arrow.style.left = 130*(this.lc-2*this.litr-1)+60+'px';
                            // box.style.left = 129*(this.lc-2*this.litr-1)-70+'px';
                        }
                        else{
                            box.style.top = 60*this.level + 'px';
                            arrow.style.left = 130*(this.lc-2*this.litr-1)+130+'px';
                            box.style.left = 130*(this.lc-2*this.litr-1)+'px';
                        }
                        this.litr+=1;    
                    }
                    else{
                        // arrow.style.transform  = 'rotate(90deg)';
                        arrow.classList.add('arrow_rt_90');
                        box.style.top = 60+60*this.level+'px';
                        if(this.ltype==0){
                            arrow.style.top = 60+60*this.level+'px';                    
                            arrow.style.left =-(130*(this.lc-1))-60+'px';                                            
                        }
                        else{
                            arrow.style.top = 60*this.level+'px';                    
                            arrow.style.left = -60+'px';
                            box.style.left = -120+'px';
                        }
                        this.dir=0;
                        this.level+=1;
                        this.litr=1;
                    }           
                }
                else if(this.dir==0){
                    if(this.litr <(this.lc-1)){
                        arrow.style.top = 60*this.level + 'px';
                        box.style.top = 60*this.level + 'px';
                        if(this.ltype==1){
                            arrow.style.left=-130+'px';
                            box.style.left = -130+'px';
                        }
                        else{
                            
                        }
                        this.litr+=1;
                    }   
                    else if(this.litr==(this.lc-1)){
                        if(this.ltype==1){
                            arrow.style.top = 50*(this.level -1)+ 'px';
                            box.style.top = 50*(this.level-1) + 'px';
                            box.style.left =130*(this.lc-2)+60+'px'; 
                            arrow.style.left =130*(this.lc-2)+60+'px';     
                        }
                        else{
                            arrow.style.top = 60*(this.level)+ 'px';
                            box.style.top = 60*(this.level) + 'px';    
                        }
                        this.litr+=1;
                    }
                    else{
                        // arrow.style.transform = 'rotate(90deg)';
                        arrow.classList.add('arrow_rt_90');
                        this.dir=1;
                        this.level+=1;
                        this.litr  = 1;
                        if(this.ltype==0){
                            arrow.style.top = 60*(this.level)+ 'px';
                            arrow.style.left = -60+'px';
                            box.style.left =130*(this.lc-1)+'px'; 
                            box.style.top = 60*(this.level)+ 'px';
                        }
                        else{
                            arrow.style.top = 60*(this.level-1)+ 'px';
                            arrow.style.left =(130*(this.lc-this.level+1))+'px';
                            box.style.left = (130*(this.lc-this.level+1))-70+'px'; 
                            box.style.top = 60*(this.level)+ 'px';
                            
                        }    
                    }
                }
            }
        }
        else{
            // this.lc = this.size-1;
        }
    }
    /**
     * inserts the value given to the end of the linked list
     * @param {integer} val 
     */
    insert(val){
        if(this.size ==0){
            this.arr.push(val);
            this.box_list.push(draw_boxes([val],1,this.linkedListField.id,'array')[0]);
            this.size++;
        }
        else{
            var arrow = draw_arrow(this.linkedListField.id);
            arrow.style.position='relative';    
            var box = draw_boxes([val],1,this.linkedListField.id,'array')[0];      
            this.setArrowBox(arrow,box);            
            this.box_list.push(box);
            this.arrow_list.push(arrow);
            this.arr.push(val);
            this.size++;
            this.currArrow = arrow;
            this.currBox = box;
        }
    }

    /**
     * creates a temporary box and sets it position as per the argument
     * @param {integer} pos defines the location for the tempbox
     */
    insertTempAtPos(pos){
        this.tempBox = draw_boxes([' '],1,this.linkedListField.id,'array')[0];
        var box = this.tempBox;
        var field_rect = this.linkedListField.getBoundingClientRect();
        box.style.position = 'absolute';
        // box.style.visibility = 'hidden';
        if(pos+1 > this.size-1){
            var boxPostRect = this.box_list[pos].getBoundingClientRect();
        }
        else{
            var boxPostRect = this.box_list[pos+1].getBoundingClientRect();
        }
        if(pos==0)
            var boxPreRect = this.box_list[pos].getBoundingClientRect();
        else
            var boxPreRect = this.box_list[pos-1].getBoundingClientRect();

        if(boxPostRect['y']==boxPreRect['y']){
            if(this.lc==0){
                var boxh = 0;
                var boxw = pos;
            }
            else{
                var boxh = Math.floor(pos/this.lc);
                if(boxh%2==0){
                    var boxw = pos%this.lc;
                }
                else{
                    var boxw = this.lc - pos%this.lc;
                }
            }
            console.log(boxh);
            console.log(boxw);

            if(boxPostRect['x']-boxPreRect['x'] > 0){
                box.style.top = 15+boxh*70+(boxh-1)*60 + 'px';
                box.style.left = 15+(boxw)*130 +'px';
            }
            else{   
                box.style.top = 15+boxh*70+(boxh+1)*60 + 'px';
                box.style.left = 15 + (boxw -1)*130 +'px';
            }
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] > 0)){
            if(this.lc==0){
                var boxh = 0;
                var boxw = pos;
            }
            else{
                var boxh = Math.floor(pos/this.lc);
                var boxw = pos%this.lc;
            }
            console.log(boxh);
            console.log(boxw); 
            if(boxPreRect['x']-field_rect['x']>100){
                box.style.top = (boxh+1)*70+(boxh+1)*60 -60+ 'px';
                box.style.left = 15+(this.lc-2)*130 +75+'px';         
                console.log("ygxg");    
            }
            else{
                box.style.top = 15+(boxh)*70+(boxh)*60 -60+ 'px';
                box.style.left = 15+60+'px';         
            }
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] < 0)){
            if(this.lc==0){
                var boxh = 0;
                var boxw = pos;
            }
            else{
                var boxh = Math.floor(pos/this.lc);
                var boxw = pos%this.lc;
            }
            console.log(boxh);
            console.log(boxw); 
            if(boxPostRect['x']-field_rect['x']>100){
                box.style.top = 15+(boxh)*70+(boxh)*60 -60+ 'px';
                box.style.left = 15+(this.lc-2)*130 +75+'px';         
                console.log("ygxl");    
            }
            else{
                box.style.top = (boxh+1)*70+(boxh+1)*60 -60+ 'px';
                box.style.left = 15+60+'px';         
            }
        }
    }

    /**
     * sets the arrow previous to the position in out direction as per the position
     * @param {integer} pos defines the arrow location
     */
    setArrowPre(pos){
        if(this.size-1 < pos+1)
            var boxPostRect = this.box_list[pos].getBoundingClientRect();
        else
            var boxPostRect = this.box_list[pos+1].getBoundingClientRect();
        var boxPreRect = this.box_list[pos-1].getBoundingClientRect();
        var arrowPre = this.arrow_list[pos-1];

        if(boxPostRect['y']==boxPreRect['y']){
            if(boxPostRect['x']-boxPreRect['x'] > 0){
                // arrowPre.style.transform = 'rotate(-45deg)';
                arrowPre.classList.add('arrow_rt_neg45');
            }
            else{   
                // arrowPre.style.transform = 'rotate(135deg)';
                arrowPre.classList.add('arrow_rt_135');
            }
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] > 0)){
            // arrowPre.style.transform = 'rotate(45deg)';
            arrowPre.classList.add('arrow_rt_45');
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] < 0)){
            // arrowPre.style.transform = 'rotate(135deg)';
            arrowPre.classList.add('arrow_rt_135');
        }               
    }

    /**
     * sets the arrow post the position in inward direction
     * @param {integer} pos defiens the arrow position
     */
    setArrowPost(pos){
        if(pos < this.arrow_list.length){
            var boxPostRect = this.box_list[pos+1].getBoundingClientRect();
            if(pos==0)
                var boxPreRect = this.box_list[pos].getBoundingClientRect();
            else
                var boxPreRect = this.box_list[pos-1].getBoundingClientRect();
            var arrowPost = this.arrow_list[pos];
    
            if(boxPostRect['y']==boxPreRect['y']){
                if(boxPostRect['x']-boxPreRect['x'] > 0){
                    // arrowPost.style.transform = 'rotate(45deg)';
                    arrowPost.classList.add('arrow_rt_45');
                }
                else{   
                    // arrowPost.style.transform = 'rotate(225deg)';
                    arrowPost.classList.add('arrow_rt_225');
                }
            }
            else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] > 0)){
                // arrowPost.style.transform = 'rotate(45deg)';
                arrowPost.classList.add('arrow_rt_45');
            }
            else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] < 0)){
                // arrowPost.style.transform = 'rotate(135deg)';
                arrowPost.classList.add('arrow_rt_135');
            }    
        }
    }

    /**
     * resets the arrow pre to the box at position 'pos'.
     * @param {integer} pos  defines the arrow position
     */
    resetArrowPre(pos){
        if(this.size-1 < pos+1)
            var boxPostRect = this.box_list[pos].getBoundingClientRect();
        else
            var boxPostRect = this.box_list[pos+1].getBoundingClientRect();
        var boxPreRect = this.box_list[pos-1].getBoundingClientRect();
        var arrowPre = this.arrow_list[pos-1];

        if(boxPostRect['y']==boxPreRect['y']){
            if(boxPostRect['x']-boxPreRect['x'] > 0){
                // arrowPre.style.transform = 'rotate(-45deg)';
                arrowPre.classList.remove('arrow_rt_neg45');
            }
            else{   
                // arrowPre.style.transform = 'rotate(135deg)';
                arrowPre.classList.remove('arrow_rt_135');
            }
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] > 0)){
            // arrowPre.style.transform = 'rotate(45deg)';
            arrowPre.classList.remove('arrow_rt_45');
        }
        else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] < 0)){
            // arrowPre.style.transform = 'rotate(135deg)';
            arrowPre.classList.remove('arrow_rt_135');
        }               
    }

    /**
     * resets the arrow post to the box at position 'pos'.
     * @param {integer} pos  defines the arrow position
     */
     resetArrowPost(pos){
        if(pos < this.arrow_list.length){
            var boxPostRect = this.box_list[pos+1].getBoundingClientRect();
    
            if(pos==0)
                var boxPreRect = this.box_list[pos].getBoundingClientRect();
            else
                var boxPreRect = this.box_list[pos-1].getBoundingClientRect();
    
            var arrowPost = this.arrow_list[pos];
    
            if(boxPostRect['y']==boxPreRect['y']){
                if(boxPostRect['x']-boxPreRect['x'] > 0){
                    // arrowPost.style.transform = 'rotate(45deg)';
                    arrowPost.classList.remove('arrow_rt_45');
                }
                else{   
                    // arrowPost.style.transform = 'rotate(225deg)';
                    arrowPost.classList.remove('arrow_rt_225');
                }
            }
            else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] > 0)){
                // arrowPost.style.transform = 'rotate(45deg)';
                arrowPost.classList.remove('arrow_rt_45');
            }
            else if((boxPostRect['y']-boxPreRect['y'] > 0)  &&  (boxPostRect['x']-boxPreRect['x'] < 0)){
                // arrowPost.style.transform = 'rotate(135deg)';
                arrowPost.classList.remove('arrow_rt_135');
            }    
        }
    }

    /**
     * sets the values of the box_list as per the arr
     */
    appendArray(){
        for(var i=0;i<this.size-1;i++){
            this.box_list[i+1].innerHTML = this.arr[i];
        }
    }

    /**
     * Inserts given value at given position in the linked list
     * @param {integer} val 
     * @param {integer} pos 
     */
    insertAtPos(val,pos){
        this.arr.splice(pos-1,0,val);
        var arrow = draw_arrow(this.linkedListField.id);
        arrow.style.position='relative';    
        var box = draw_boxes([' '],1,this.linkedListField.id,'array')[0];      
        this.setArrowBox(arrow,box);            
        this.box_list.push(box);
        this.arrow_list.push(arrow);
        this.size++;
        this.appendArray();
    }

    /**
     * Inserts given value at given position in the linked list ut not append the box_list
     * @param {integer} val 
     * @param {integer} pos 
     */
    insertAtPos_noappend(val,pos){
        this.arr.splice(pos-1,0,val);
        var arrow = draw_arrow(this.linkedListField.id);
        arrow.style.position='relative';    
        var box = draw_boxes([0],1,this.linkedListField.id,'array')[0];      
        this.setArrowBox(arrow,box);            
        this.box_list.push(box);
        this.arrow_list.push(arrow);
        this.size++;
        // this.appendArray();
    }

    /**
     * Deletes the first linked list node with given value
     * @param {integer} val 
     */
    delete(val){
        var val_index = this.arr.findIndex((elm)=>elm==val);
        console.log(val_index);
        if(val_index==-1)
            console.log('no node with value 5');
        else{
            this.arr.splice(val_index,1);
            this.box_list[this.size-1].remove();
            this.box_list.pop();

            this.arrow_list[this.size-2].remove();
            this.arrow_list.pop();

            this.litr--;
            this.size--;
            var field_rect = this.linkedListField.getBoundingClientRect();
            
            if(this.manual==1){
                if(this.lc >= this.size){
                    this.lc=0;
                    this.dir=0;
                    this.level=0;
                    this.manual=0;
                }
                if(this.litr==0&&this.size==1){
                        // ok                
                }
                else if(this.litr==0){
                    this.litr=this.lc;
                    this.level-=1;
                    if(this.dir==0)
                        this.dir=1;
                    else
                        this.dir=0;       
                }    
            }
            this.appendArray();    
        }
    }   

    /**
     * removes the highlights from the box_list elements and the tempBox Created
     */
    removeHighlight(){
        for(i=0;i<this.size;i++){
            unhighlightBoxELement(this.box_list[i]);
        }
        unhighlightBoxELement(this.tempBox);
    }

    /**
     * removes the liked list object from the display
     */
    remove(){
        this.linkedListField.remove();
    }
}

/** Class for Queue. */
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
    
    /**
     * Enqueues value into queue. Uses circular queue enqueue methodology. Renders it into animation.
     * @param {number} val 
     */ 
    enqueue(val){
        highlightBoxELement(this.frontElm);
        highlightBoxELement(this.rearElm);
        if((this.front == 0 && this.rear == this.size-1) || (this.rear == (this.front-1)%(this.size-1))){
            console.log("queue full");            
            highlightBoxELement(this.sizeElm);
        }
        else if (this.rear == this.size-1 && this.front != 0){
            this.rear = 0;
            this.rearElm.innerHTML = this.rear;
            this.arr[this.rear]=val;
            this.arrElem[this.rear].innerHTML = val;
            highlightBoxELement(this.arrElem[this.rear]);
            var rectBox = this.arrElem[0].getBoundingClientRect();
            rectBox['x']-=65;
            this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
            this.rear_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';
        }
        else if (this.front==-1) {
            this.front_pointer.style.visibility='visible';
            this.rear_pointer.style.visibility='visible';
            this.rear = 0;
            this.rearElm.innerHTML = this.rear;
            this.arr[this.rear]=val;
            this.arrElem[this.rear].innerHTML = val;
            highlightBoxELement(this.arrElem[this.rear]);
            var rectBox = this.arrElem[this.rear].getBoundingClientRect();
            this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
            this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';
            this.front = 0;
            this.frontElm.innerHTML=this.front;
            this.front_pointer.style.top =rectBox['y']-this.faRectOrigin['y']+55+'px';
            this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';
        }
        else {
            this.rear++;
            this.rearElm.innerHTML = this.rear;
            this.arr[this.rear]=val;
            this.arrElem[this.rear].innerHTML = val;
            highlightBoxELement(this.arrElem[this.rear]);
            //rear pointer movement 
            var rectBox = this.arrElem[this.rear].getBoundingClientRect();
            this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
            this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';
        }    
    }

    /**
     * Dequeues value from queue. Uses circular queue edequeue methodology. Renders it into animation.
     */ 
    dequeue (){
        var val=' ';
        highlightBoxELement(this.frontElm);
        if(this.front==-1){
            console.log("queue empty");
        }
        else if (this.front == this.rear){
            val = this.arr[this.front];
            this.arrElem[this.front].innerHTML = ' ';
            unhighlightBoxELement(this.arrElem[this.front]);
            this.front = -1;
            this.rear = -1;
            this.rearElm.innerHTML=this.rear;
            this.frontElm.innerHTML=this.front;
            var rectBox = this.arrElem[0].getBoundingClientRect();
            rectBox['x']-=60;
            this.rear_pointer.style.top =(rectBox['y']-this.reRectOrigin['y'])+55+'px';
            this.rear_pointer.style.left=rectBox['x']-this.reRectOrigin['x']+'px';
            this.front_pointer.style.top =(rectBox['y']-this.faRectOrigin['y'])+55+'px';
            this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';
        }
        else if (this.front == this.size-1) {
            val = this.arr[this.front];
            this.arrElem[this.front].innerHTML = ' ';
            unhighlightBoxELement(this.arrElem[this.front]);
            var rectBox = this.arrElem[this.front].getBoundingClientRect();
            this.front=0;
            this.frontElm.innerHTML=this.front;
            this.front_pointer.style.top =(rectBox['y']-this.faRectOrigin['y'])+55+'px';
            this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';
        }
        else {
            val = this.arr[this.front];
            this.arrElem[this.front].innerHTML = ' ';
            unhighlightBoxELement(this.arrElem[this.front]);
            this.front+=1;
            var rectBox = this.arrElem[this.front].getBoundingClientRect();
            // this.front++;
            this.frontElm.innerHTML=this.front;
            this.front_pointer.style.top =(rectBox['y']-this.faRectOrigin['y'])+55+'px';
            this.front_pointer.style.left=rectBox['x']-this.faRectOrigin['x']+'px';
        }           
        return val;
    }

    /**
     * Removes highlights from frontElm, rearElm and sizeElm.
     */
    removeHighlight(){
        unhighlightBoxELement(this.frontElm);
        unhighlightBoxELement(this.rearElm);
        unhighlightBoxELement(this.sizeElm);
    }

    /**
     * Removes front_pointer, rear_pointer and queue_field
     */
    remove(){
        this.front_pointer.remove();
        this.rear_pointer.remove();
        this.queue_field.remove();
    }
    
    /**
     * Sets arrow position to appropriate place.
     */
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
