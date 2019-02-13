var data;
var noteChanging=null;
refresh();

okBut.addEventListener('click',addNote);

document.addEventListener( "click", changeNote);
// document.addEventListener( "click", changeNote );

function changeNote(event){
    let el = event.target;
    let id=el.parentNode.id;
    let elInData=data.find(function(element){return element.id==id;});

    if(el.classList.contains("markBut")) { 
        elInData.isMark=!elInData.isMark;
    }
    else if(el.classList.contains("delBut")) {
        position =data.indexOf(elInData);
        if ( ~position ) data.splice(position, 1);
    }
    else if(el.classList.contains("textChangeNote")){
        return;
    }
    else if(el.classList.contains("penBut")) {
      
        if( noteChanging==null)
        { 
            let noteTextEl=el.parentNode.querySelector('.noteText');
            let textarea=document.createElement('textarea');
            textarea.className="form-control textChangeNote";
            textarea.value=noteTextEl.innerHTML;
            noteTextEl.innerHTML=null;
            noteTextEl.appendChild(textarea);
            noteChanging=noteTextEl;
           
            el.classList.remove('btn-danger');
            el.classList.add('btn-success');   
            return;
        }
        else{
            
            elInData.text=noteChanging.querySelector('.textChangeNote').value;
            el.classList.remove('btn-success');
            el.classList.add('btn-danger');
            noteChanging=null;
        }

    }

    localStorage.setItem('arrNotes',JSON.stringify(data));
    refresh();
}



function addNote()
{
    data=JSON.parse(localStorage.getItem('arrNotes'));
    let id;
    if(data.length>0){
         id= data[data.length-1].id;

    }
    else{
        id=0;
    }

   let note={
       id:++id,
       date:new Date().toLocaleString(),
       text:document.getElementById("textNote").value,
       isMark:false
   }
   document.getElementById("textNote").value=null;
   data.push(note);
   
   localStorage.setItem('arrNotes',JSON.stringify(data));
   addNoteTo(note,"notesContainer");
}

function addNoteTo(note, element){
    
    var nav=document.createElement('nav');
    nav.className=`navbar ${note.isMark? "bg-dark":"bg-primary"} info-block`;
    nav.id=note.id;
    nav.innerHTML=`<button type="button" class="button-style btn btn-danger fas fa-check markBut" id="${note.id}"></button>
    <p class="">${note.date}</p>
    <p class="col-9 noteText">${note.text}</p>
    <button type="button" class="button-style btn btn-danger fas fa-pen penBut" id="${note.id}" ></button>
    <button type="button" class="button-style btn btn-danger fas fa-trash delBut" id="${note.id}"></button>`;
    element.appendChild(nav);
}

function refresh(){
    var notesContainer = document.getElementById("notesContainer");
    while (notesContainer.firstChild) {
        notesContainer.removeChild(notesContainer.firstChild);
    }
    noteChanging=null;
    data=JSON.parse(localStorage.getItem('arrNotes'));
    
    if(data==null){
        data=[];
        localStorage.setItem('arrNotes',JSON.stringify(data));
    }
    else{
        for (let index = 0; index < data.length; index++) {
            addNoteTo(data[index], notesContainer);
        }
    }
}