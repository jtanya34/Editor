var addRuleBtn = document.getElementById("addrule");
var editing = false

function allnumeric(inputtxt, id) {
  var numbers = /^[0-9]+$/;
  if (!inputtxt.match(numbers)) {
    document.getElementById(id).classList.remove('hidden')
    return false;
  }else{
    document.getElementById(id).classList.add('hidden')
  }
  return true
}


function inputValues(value, id) {
  let innerdiv = document.createElement('div');
  let pTag = document.createElement('p');
  let textNode = document.createTextNode(value)
  pTag.appendChild(textNode)
  let span = document.createElement('span');
  textNode = document.createTextNode('x')
  span.setAttribute('class', 'closevalue');
  span.setAttribute('onclick', `deleteBtn(event,'${id}')`);
  span.appendChild(textNode)
  innerdiv.setAttribute('class', 'ordervalue');
  innerdiv.append(pTag, span)
  return innerdiv;
}


function editItem(event) {
  if (!editing) {
    editing = true
    let target = event.target
    let name=target.parentElement.firstChild.innerText
    let value=target.parentElement.lastChild.innerText
    let text = target.innerText
    let inputBox = `<input id="inputBox" value='${text}'/>`
    target.innerHTML = inputBox
    let input = document.querySelector("#inputBox");
    input.addEventListener("keypress", function (e) {
      if (e.key === 'Enter') {
        editing = false
        delete ruledata[name]
        if (input.value === '') {
          target.parentElement.parentElement.removeChild(target.parentElement)
        } else {
          target.innerHTML = `<td id='editInput' onclick="editItem(event)">${input.value}</td>`
        
          if(name===text){
            ruledata[input.value]=value
          }else{
            ruledata[name]=input.value
          }
          input.value = ""
        }
      }
    })
  }
}



function createTable(ruleName, rulevalue) {
  let tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('id', 'table');
  tbl.setAttribute('border', '1');
  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  let th1 = document.createElement('th');
  th1.appendChild(document.createTextNode('Rule Name'))
  tr.appendChild(th1)
  let th2 = document.createElement('th');
  th2.appendChild(document.createTextNode('Rule Value'))
  tr.appendChild(th2)
  thead.appendChild(tr)
  let tbdy = document.createElement('tbody');
  tr = document.createElement('tr');
  let td = document.createElement('td');
  td.setAttribute('id', 'editInput')
  td.setAttribute("onclick", "editItem(event)")
  td.appendChild(document.createTextNode(ruleName))
  let td2 = document.createElement('td');
  td2.setAttribute("onclick", "editItem(event)")
  td2.setAttribute('id', 'editInput')
  td2.appendChild(document.createTextNode(rulevalue))
  tr.appendChild(td)
  tr.appendChild(td2)
  tbdy.appendChild(tr);
  tbl.appendChild(thead)
  tbl.appendChild(tbdy);
  return tbl
}


