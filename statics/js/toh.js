// Total line number of code
code_line_count=73;
// ace editor configuration
var editor;
// FUNCTION VARIABLE TO store the interval function
var interval;
// stores last highlighted line number to remove
var line_rem_highlight=-1;
// assigning unique element id's to any new div 
var id_count=0;

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
    editor.gotoLine(code_begin);
}

// animation related values

up_imit=-300
b1 = -42;
b2 = -62;
b3 = -82;    
r3 = [-60, 78, 220];
r2 = [-191, -51, 90];
r1 = [-270, -132, 10];
x_set = [r1,r2,r3];
y_set = [b1,b2,b3];
var stepx=1;
var stepy=1;
var movItr;
var rElmSet=[];
var movSim;

function setuptAnimation(){
    for(i=1;i<=3;i++)
    {
        document.getElementsByClassName('ring'+i)[0].style.visibility='hidden';
        rElmSet.push(document.getElementsByClassName('ring'+i)[0]);
    }
}

function pushRings(src_val,srcTop,rNum){
    x= x_set[rNum-1][src_val];
    y= y_set[srcTop];
    rElmSet[rNum-1].style.transition='0s';
    rElmSet[rNum-1].style.top=y+'px';
    rElmSet[rNum-1].style.left=x+'px';
    rElmSet[rNum-1].style.visibility='visible';
}

function pushRingSet(n_disc){
    for(itr_1=0;itr_1<n_disc;itr_1++){
        x= x_set[itr_1][0];
        y= y_set[n_disc-1-itr_1];
        rElmSet[itr_1].style.transition='0s';
        rElmSet[itr_1].style.top=y+'px';
        rElmSet[itr_1].style.left=x+'px';
        rElmSet[itr_1].style.visibility='visible';    
    }    
}

function movRing(rElm,fx,fy,ix,iy){
//     if(movItr==1)
// //        iy=iy-stepy;
//         iy=up_imit;
//     else if(movItr=2)
//         // if(fx > ix)
//         //     ix=ix+stepx;
//         // else 
//         //     ix=ix-stepx;
//         ix=fx;
//     else if(movItr==3)
// //        iy=iy+stepy;
//         iy=fy;


    // if(movItr==1)
    //     if(iy==up_imit)
    //         movItr=2;
    // else if(movItr==2)
    //     if(ix==fx)
    //         movItr=3;
    // else if(movItr==3)
    //     if(iy==fy)
    //         clearInterval(movSim);
}

function setRing(rNum,des_setRing,desTop,src_setRing,srcTop){
    rElm = rElmSet[rNum-1];    
    rElm.style.transition='0.2s';
    fx= x_set[rNum-1][des_setRing];
    fy= y_set[desTop];
    ix= x_set[rNum-1][src_setRing];
    iy= y_set[srcTop];
    movItr=1;
//    movSim= movRing(rElm,fx,fy,ix,iy);
    rElm.style.top=fy+'px';
    rElm.style.left=fx+'px';
}

/* Code lines numbers for animation change */
//main11
code_begin=58;
n_discsCreate=59;
stackSrcCreate=63;
stackDesCreate=64;
stackAuxCreate=65;
tohCall=67;
stackSrcDel=70;
stackDesDel=72;
stackAuxDel=71;
code_end=73;

// toh
startToh=29;
createSDA=31;
createnMoves=32;
check_n_discs=35;
setDesAsAux=36;
setAuxAsDes=37;
for_full_push_src=40;
full_push_src = 41;
for_full_push_src_end=42;
for_n_moves=45; // if itr  not there create
for_n_moves_checkimod3_0=46;
call_moveDisc_0=47; //50 53
call_moveDisc_2=50; //50 53
call_moveDisc_1=53; //50 53
for_n_moves_checkimod3_1=52;
for_n_moves_checkimod3_2=49;
for_n_moves_end=55;
endToh=56;


// Move Disc
startMoveDis=1;
declareTop1Top2=3;
popSrcTop1=4;
popSrcTop2=5;
checkTop1=6;
checkTop1pushSrcTop2=8;
moveDiscTop2DesSrc_1=9;//20
checkTop2=11;
checkTop2pushDesTop1=13;
moveDiscTop1SrcDes_1=14; //26
checkTop1GTop2=16;
pushSrcTop1=18;
pushSrcTop2=19;
moveDiscTop2DesSrc_2=20;//20
checkTop1LTop2=22;
pushDesTop2=24;
pushDesTop1=25;
moveDiscTop1SrcDes_2=26; //26
endMoveDisc=28;

/*
TRY A WAY TO SKIP LINES IN THE 
skip_lines = [2,4,6,9,11,14]
*/
// main function to handle the box and line highlighting in sync
var nDiscElm,srcElm=null,desElm=null,auxElm=null;  
var s=0,d=1,a=2;
var sElm,dElm,aElm;
var itr=0;
var iElm=null;
var n_disc=2;
var nDiscElm=null;
var nMoves = Math.pow(2,n_disc)-1;
var nMovesElm=null;
var movDiscSrcElm=null;
var movDiscDesElm=null;
var movSrc;
var movDes;
var top1,top2;
var top1Elm,top2Elm;
var parent_id = 'variable_set';
var temp = 'temp';
var heap = 'heap';
var constants = 'constants'
code_line_itr =code_begin-1;

function reset(){
    setuptAnimation();
    code_line_itr=code_begin-1;
    removeBoxElm(nDiscElm);
    removeBoxElm(nMovesElm);
    removeBoxElm(top1Elm);
    removeBoxElm(top2Elm);
    removeBoxElm(iElm);
    if(srcElm!=null)
        srcElm.remove();
    if(auxElm!=null)
        auxElm.remove();
    if(desElm!=null)
        desElm.remove();
    editor.gotoLine(code_begin);
    document.getElementById('set_ndisc_buton').disabled=false;
}

async function loop()
{
    unhighlightBoxELement(nDiscElm);
    unhighlightBoxELement(iElm);
    unhighlightBoxELement(nMovesElm);
    unhighlightBoxELement(top1Elm);
    unhighlightBoxELement(top2Elm);
    if(srcElm!=null)
        srcElm.removeHighlight();
    if(auxElm!=null)
        auxElm.removeHighlight();
    if(desElm!=null)
        desElm.removeHighlight();
    if(code_line_itr<line_rem_highlight)line_rem_highlight-=1;
    if(code_line_itr>0 && code_line_itr!=(code_begin-1) && line_rem_highlight!=-1)
    {
     //   editor.gotoLine(line_rem_highlight);
    //   await sleep(50);
       document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');
        // requestAnimationFrame(()=>{document.getElementsByClassName('foo'+line_rem_highlight)[0].classList.remove('bar');},500);
        }
    // increment of the current code line
    code_line_itr++;

    // check for end of code
    if(code_line_itr<=code_line_count){
        editor.gotoLine(code_line_itr);
       await sleep(100);
       document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');
        // requestAnimationFrame(()=>{document.getElementsByClassName('foo'+code_line_itr)[0].classList.add('bar');},500);
    }
    line_rem_highlight=-1;
    switch(code_line_itr){
        /*//main
        code_begin=58;
        n_discsCreate=59;
        stackSrcCreate=63;
        stackDesCreate=64;
        stackAuxCreate=65;
        tohCall=67;
        stackSrcDel=70;
        stackDesDel=71;
        stackAuxDel=72;
        code_end=73;
        */
        case code_begin:
            break;
        case n_discsCreate:
            nDiscElm = draw_variable('n_disc',n_disc,constants);
            pushRingSet(n_disc);
            break;
        case stackSrcCreate:
             srcElm = new Stack(heap,n_disc,'src'); 
             srcElm.size_val.parentElement.style.display='none';  
            break;
        case stackDesCreate:
            desElm = new Stack(heap,n_disc,'des');   
            desElm.size_val.parentElement.style.display='none';  
            break;
        case stackAuxCreate:
            auxElm = new Stack(heap,n_disc,'aux');   
            auxElm.size_val.parentElement.style.display='none';  
            break;
        case tohCall:
            line_rem_highlight=code_line_itr;
            code_line_itr = startToh-1;
            break;
        case stackSrcDel:
            srcElm.remove();
            break;
        case stackDesDel:
            desElm.remove();
            break;
        case stackAuxDel:
            auxElm.remove();
            break;
        case code_end:
            break;
        case (code_end+1):
            removeBoxElm(nDiscElm);
            clearInterval(interval);
            playButton(0);
            document.getElementById('set_ndisc_buton').disabled=false;
            disbaleCtrlButtons(play);
            disbaleCtrlButtons(step);
            break;
        /*TOH function*/
        case startToh:
            line_rem_highlight=code_line_itr;
            break;
        case createSDA:
            // s='S';
            // sElm=draw_variable('s',s,parent_id);
            // a='A';
            // d='D';
            // dElm=draw_variable('d',d,parent_id);
            // aElm=draw_variable('a',a,parent_id);
            s=0;
            a=2;
            d=1;
            break;
        case createnMoves:
            nMoves = Math.pow(2,n_disc)-1;
            nMovesElm = draw_variable('nMoves',nMoves,constants);
            break;
        case check_n_discs:
            highlightBoxELement(nDiscElm);

            if(n_disc%2==0){
                // dElm.innerHTML = 'A';
                // aElm.innerHTML = 'D';
            }else{
                line_rem_highlight=code_line_itr;
                code_line_itr = for_full_push_src-1;
            }
            itr=n_disc+1;
            break;
        case setDesAsAux:
            // d=2;
            document.getElementById('des_id').innerHTML = 'AUX';
            break;
        case setAuxAsDes:
            // a=1;
            document.getElementById('aux_id').innerHTML = 'DES';
            line_rem_highlight=code_line_itr;
            code_line_itr = for_full_push_src-1;
            itr=n_disc+1;
            break;
        case for_full_push_src:
            if(iElm==null)
            {
                iElm=draw_variable('itr',' ',temp);
            }
            itr--;
            iElm.innerHTML = itr;
            highlightBoxELement(iElm);
            highlightBoxELement(nDiscElm);
            if(itr<1)
            {    
                line_rem_highlight=code_line_itr;
                code_line_itr = for_full_push_src_end-1;
            }
            break;
        case full_push_src:
            srcElm.push(itr);
            var topVal = parseInt(srcElm.top_val.innerHTML);
//            pushRing(s,topVal,itr);
            line_rem_highlight=code_line_itr;
            code_line_itr = for_full_push_src-1;
            break;
        case for_full_push_src_end:
            line_rem_highlight=code_line_itr;
            code_line_itr = for_n_moves-1;
            itr=0;
            removeBoxElm(iElm);
            iElm=null;
            break;
        case for_n_moves:
            movDiscDesElm=null;
            movDiscSrcElm=null;
            movSrc=s;
            movDes=d;
            if(itr==0){
                iElm=draw_variable('itr',' ',temp);
            }
            itr++;
            if(itr  > nMoves){
                line_rem_highlight=code_line_itr;
                code_line_itr = for_n_moves_end-1;
            }
            else
            {
                iElm.innerHTML=itr;
                highlightBoxELement(iElm);
                highlightBoxELement(nMovesElm);    
            }
            break;
        case for_n_moves_checkimod3_0:
            highlightBoxELement(iElm);
            line_rem_highlight=code_line_itr;
            if(itr%3==0)
                code_line_itr=call_moveDisc_0-1;
            else
                code_line_itr = for_n_moves_checkimod3_2-1;
            break;
        case for_n_moves_checkimod3_1:
            highlightBoxELement(iElm);
            line_rem_highlight=code_line_itr;
            if(itr%3==1)
                code_line_itr=call_moveDisc_1-1;
            else
                code_line_itr = for_n_moves_end-1;
            break;
        case for_n_moves_checkimod3_2:
            highlightBoxELement(iElm);  
            line_rem_highlight=code_line_itr;
            if(itr%3==2)
                code_line_itr=call_moveDisc_2-1;
            else
                code_line_itr = for_n_moves_checkimod3_1-1;
            break;
        case call_moveDisc_0:
            // src = aux des =des
            movDiscSrcElm = auxElm;
            movSrc=a;
            movDiscDesElm = desElm;
            movDes=d;
            line_rem_highlight=code_line_itr;
            code_line_itr = startMoveDis-1;
            break;
        case call_moveDisc_2:
            // src = src des = aux
            movDiscSrcElm = srcElm;
            movSrc=s;
            movDiscDesElm = auxElm;
            movDes=a;
            line_rem_highlight=code_line_itr;
            code_line_itr = startMoveDis-1;
            break;
        case call_moveDisc_1:
            // src = src des = des
            movDiscSrcElm = srcElm;
            movSrc=s;
            movDiscDesElm = desElm;
            movDes=d;
            line_rem_highlight=code_line_itr;
            code_line_itr = startMoveDis-1;
            break;
        case for_n_moves_end:
            line_rem_highlight = code_line_itr;
            if(itr<=nMoves){
                code_line_itr=for_n_moves-1;
            }else{
                code_line_itr = endToh-1;
                removeBoxElm(iElm);
            }
            break;
        case endToh:
            line_rem_highlight = code_line_itr;
            code_line_itr = tohCall;
            removeBoxElm(nMovesElm);
            break;
        /*
        MOVE DISC 

        startMoveDis=1;
        declareTop1Top2=3;
        checkTop1=5;
        checkTop2=10;
        checkTop1Top2=15;
        checkTop1LTop2=21;
        endMoveDisc=27;

        checkTop1pushSrcTop2=7;
        checkTop2pushDesTop1=12;
        pushSrcTop1=17;
        pushSrcTop2=18;
        pushDesTop1=23;
        pushDesTop2=24;
        */
        case  startMoveDis:
            line_rem_highlight=code_line_itr;
            break;
        case declareTop1Top2:
            top1Elm = draw_variable('top1',' ',temp);
            top2Elm = draw_variable('top2',' ',temp);
            break;
        case popSrcTop1:
            top1 = movDiscSrcElm.pop();
            top1Elm.innerHTML = top1;
            break;
        case popSrcTop2:
            top2 = movDiscDesElm.pop();
            top2Elm.innerHTML = top2;
            break;    
        case checkTop1:
            highlightBoxELement(top1Elm);
            line_rem_highlight=code_line_itr;
            if(top1==-1){
                code_line_itr = checkTop1pushSrcTop2-1;
            }
            else{
                code_line_itr = checkTop2-1;
            }            
            break;
        case checkTop1pushSrcTop2:
            highlightBoxELement(top2Elm);
            movDiscSrcElm.push(top2);
            break;
        case moveDiscTop2DesSrc_1:
            desTopVal = parseInt(movDiscDesElm.top_val.innerHTML);
            srcTopVal = parseInt(movDiscSrcElm.top_val.innerHTML);
           setRing(top2,movSrc,srcTopVal,movDes,desTopVal);
            line_rem_highlight=code_line_itr;
            code_line_itr = endMoveDisc-1;
            break;
        case checkTop2:
            highlightBoxELement(top2Elm);
            line_rem_highlight=code_line_itr;
            if(top2==-1){
                code_line_itr = checkTop2pushDesTop1-1;
            }else{
                code_line_itr = checkTop1GTop2-1;
            }
            break;
        case checkTop2pushDesTop1:
            highlightBoxELement(top1Elm);
            movDiscDesElm.push(top1);
            break;
        case moveDiscTop1SrcDes_1:
            desTopVal = parseInt(movDiscDesElm.top_val.innerHTML);
            srcTopVal = parseInt(movDiscSrcElm.top_val.innerHTML);
           setRing(top1,movDes,desTopVal,movSrc,srcTopVal);
            line_rem_highlight=code_line_itr;
            code_line_itr = endMoveDisc-1;
            break;
        case checkTop1GTop2:
            highlightBoxELement(top1Elm);
            highlightBoxELement(top2Elm);
            line_rem_highlight=code_line_itr;
            if(top1 > top2){
                code_line_itr = pushSrcTop1-1;                
            }else{
                code_line_itr = checkTop1LTop2-1;
            }
            break;
        case pushSrcTop1:
            highlightBoxELement(top1Elm);
            movDiscSrcElm.push(top1);
            break;
        case pushSrcTop2:
            highlightBoxELement(top2Elm);
            movDiscSrcElm.push(top2);
            break;
        case moveDiscTop2DesSrc_2:
            desTopVal = parseInt(movDiscDesElm.top_val.innerHTML);
            srcTopVal = parseInt(movDiscSrcElm.top_val.innerHTML);
           setRing(top2,movSrc,srcTopVal,movDes,desTopVal);
            line_rem_highlight=code_line_itr;
            code_line_itr = endMoveDisc-1;
            break;
        case checkTop1LTop2:
            break;
        case pushDesTop2:
            highlightBoxELement(top2Elm);
            movDiscDesElm.push(top2);
            break;
        case pushDesTop1:
            highlightBoxELement(top1Elm);
            movDiscDesElm.push(top1);
            break;
        case moveDiscTop1SrcDes_2:
            desTopVal = parseInt(movDiscDesElm.top_val.innerHTML);
            srcTopVal = parseInt(movDiscSrcElm.top_val.innerHTML);
            setRing(top1,movDes,desTopVal,movSrc,srcTopVal);
            line_rem_highlight=code_line_itr;
            code_line_itr = endMoveDisc-1;
           break;
        case endMoveDisc:
            removeBoxElm(top1Elm);
            removeBoxElm(top2Elm);
            line_rem_highlight=code_line_itr;
            code_line_itr = for_n_moves_end-1;
            break;
        default:
            break;    
    }
    if(line_rem_highlight==-1)
        line_rem_highlight = code_line_itr;
}  


function myclick(){
    document.getElementById('step2_btn').click();
}

/** 
* this function puts the loop() function  on interval call of 1000 milli sec
* i.e it is called after every 1000 milli sec of 1 sec
*/
function loop_color(){
        interval = setInterval(myclick,1000);
}


function setNoOfDisc()
{
    n_disc=parseInt(document.getElementById('nDisc_val').value);
    editor.setValue(code1+n_disc+code2);
    EnableCtrlButtons();
    document.getElementById('set_ndisc_buton').disabled=true;
    loop();
}

code1=`void MoveDisc(struct Stack *src, struct Stack*des, char s, char d) 
{ 
    int top1,top2;
    top1=pop(src);
    top2 =pop(des);
    if (top1 == -1) 
    { 
        push(src,top2); 
        PerformDiscMove(top2, d, s); 
    } 
    else if (top2 ==-1) 
    { 
        push( des,top1); 
        PerformDiscMove(top1, s, d); 
    } 
    else if (top1 >top2) 
    { 
        push(src, top1);
        push(src, top2); 
        PerformDiscMove(top2, d, s); 
    } 
    else
    { 
        push( des,top2); 
        push( des,top1); 
        PerformDiscMove(top1, s, d); 
    } 
} 
void TowerOfHanoi(int n_discs, struct Stack*src, struct Stack *des , struct Stack *aux) 
{  
    char s = 'S', d = 'D',a = 'A'; 
    int n_moves =pow(2, n_discs) - 1; 
    
    //  if n is even swap aux and des
    if (n_discs % 2== 0) {
        d = 'A';
        a = 'D';
    } 

    for (int i =n_discs; i >= 1; i--) {
        push(src,i); 
    }
    
    // iteration of each i upto number of moves
    for (int i = 1; i <= n_moves; i++) { 
        if (i % 3== 0){
                MoveDisc(aux, des, a, d); 
        }
        else if (i% 3 == 2) {
                MoveDisc(src,aux, s, a); 
        }
        else if (i% 3 == 1){ 
                MoveDisc(src,des, s, d); 
        }
    } 
}  

int main() { 
    int n_discs=`
    code2=`;    
    Stack* src,* des, *aux;

    // Creating 3 stacks for the three Rods           
    src =Create_stack(n_discs); 
    des =Create_stack(n_discs);   
    aux =Create_stack(n_discs); 

    TowerOfHanoi(n_discs,src, aux, des);

    // delete dynamically allocated memory stacks
    delete src;
    delete aux;
    delete des;
    return 0; 
}   "`
