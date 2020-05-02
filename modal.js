var rules = [];
var save = document.getElementById('save');
var addnewRuleBtn = document.getElementById("newrule");
var rangerules = ['rent', 'age', 'tenure']
var ruledata = {}
var otherrules = ['order', 'zipcode']
var newAddedrules = [];
var postUrl = 'http://www.mocky.io/v2/5eac94693300006465dfe610'


function ruleCheck(dataObj, id) {
    let ruleCheck = document.querySelector(`#${id}:checked`);
    let check=true
    if (ruleCheck !== null) {
        let minvalue = document.getElementById(`${id}min`).value;
        let maxvalue = document.getElementById(`${id}max`).value;
        if (minvalue !== '') {
            check=allnumeric(minvalue, id)
            dataObj['min'] = minvalue
        }
        if (maxvalue !== '') {
            check=allnumeric(maxvalue, id)
            dataObj['max'] = maxvalue
        }
        ruledata[id] = dataObj
    }
    return check
}

function addBtn(input, id) {
    let inputDiv = document.getElementById(input);
    let parentDiv = inputDiv.parentNode;
    let value = inputDiv.value
    if (value != '') {
        let valueDiv = inputValues(value, id);
        parentDiv.insertBefore(valueDiv, inputDiv)
        if (ruledata[id]) {
            ruledata[id].push(inputDiv.value)
        } else {
            ruledata[id] = [inputDiv.value]
        }
        inputDiv.value = ''
    }

}

function deleteBtn(event, id) {
    let currentTarget = event.currentTarget.parentElement
    let delvalue = currentTarget.getElementsByTagName('p');
    if (ruledata[id].length > 0) {
        ruledata[id].filter((value) => {
            return value != delvalue
        })
    }

    currentTarget.parentElement.removeChild(currentTarget)

}



addnewRuleBtn.onclick = function () {
    document.getElementById('newAddrule').classList.remove('hidden')

}

function setnewRule() {

    let rulename = document.getElementById('ruleName').value;
    let rulevalue = document.getElementById('rulevalue').value;
    if (rulename != '' && rulevalue != '') {
        if (newAddedrules.length === 0) {
            let newNode = document.createElement('div')
            newNode.setAttribute('class', 'range')
            let table = createTable(rulename, rulevalue)
            let div = document.createElement('div')
            let label = document.createElement('label')
            label.classList.add('newrule')
            let textNode = document.createTextNode('OtherRules')
            label.appendChild(textNode)
            div.appendChild(label)
            let rulediv = document.createElement('div')
            rulediv.classList.add('newaddedrule')
            rulediv.setAttribute('id', 'newaddedrule')
            rulediv.appendChild(table)
            newNode.appendChild(div)
            newNode.appendChild(rulediv)
            let newruleDiv = document.getElementById('newAddrule');
            let parentDiv = newruleDiv.parentNode;
            parentDiv.insertBefore(newNode, newruleDiv)
        } else {

            let tbdy = document.getElementsByTagName('tbody');
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.setAttribute("onclick", "editItem(event)")
            td.setAttribute('id', 'editInput')
            td.appendChild(document.createTextNode(rulename))
            let td2 = document.createElement('td');
            td2.setAttribute("onclick", "editItem(event)")
            td2.setAttribute('id', 'editInput')
            td2.appendChild(document.createTextNode(rulevalue))
            tr.appendChild(td)
            tr.appendChild(td2)
            tbdy[0].appendChild(tr);

        }
        newAddedrules.push(rulename)
        ruledata[rulename] = rulevalue
        document.getElementById('ruleName').value = ''
        document.getElementById('rulevalue').value = ''
        document.getElementById('newAddrule').classList.add('hidden')
    }
}



save.onclick = () => {
    for (let i = 0; i < 3; i++) {
        let dataObj = {}
        var check=ruleCheck(dataObj, rangerules[i])
        if(!check){
            return;
        }
    }

    otherrules.map((rule) => {
        let ruleCheck = document.querySelector(`#${rule}:checked`);
        if (ruleCheck === null) {
            delete ruledata[rule]
        }
    })
    console.log(ruledata)
    if(check){
        postData(ruledata)
    }
   
    return;

}

function postData(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", postUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        data: data
    }));

    xhr.onload = function () {
        let status = xhr.status
        if (status === 200) {
            alert('Rules saved successfully')
        } else {
            alert('Oops! Something went wrong, please try again.')
        }
    };
    xhr.onerror = function () {
        alert(`Network Error`);
    };

}