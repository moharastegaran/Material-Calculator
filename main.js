(function() {
    "use strict";

    /* Global Query */
    const el = function(element) {
        if (element.charAt(0) === "#") {
            return document.querySelector(element);
        }
        return document.querySelectorAll(element);
    };

    /* Variables */
    let viewer = el("#viewer"), equals = el("#equals"), nums = el(".num"),
        ops = el(".ops"), theNum = "", oldNum = "", resultNum, operator;

    /* Get the current number selected */
    const setNum = function(keyNum = null) {
        console.log(`keyNum is ${keyNum ?? this.getAttribute("data-num")}`)
        if (resultNum) {
            theNum = keyNum ?? this.getAttribute("data-num");
            resultNum = "";
        } else if(theNum.length < 6){
            theNum += keyNum ?? this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number

    };

    /* Pass number to oldNum and save operator */
    const moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", "");
    };

    /* Calculate result */
    const displayNum = function() {

        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        console.log(`num1 : ${oldNum}, num2 : ${theNum}`);

        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            default:
                resultNum = theNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                resultNum = "broke!";
            } else {
                resultNum = "Ooops! Infinity...";
                el('#calculator').classList.add("broken");
                el('#reset').classList.add("show");
            }
        }
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        oldNum = 0;
        theNum = resultNum;

    };

    /* Clear everything */
    const clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    for (let i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = function (event){
            setNum(this.getAttribute("data-num"))
        };
    }

    for (let i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    document.addEventListener('keydown', (event) => {
        const numString = "1234567890";
        const name = event.key;
        const code = event.code;

        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);

        if (numString.indexOf(name) >= 0){
            el(`.num[data-num="${name}"]`)[0].focus();
            setNum(name);
        }else {
            console.log(`Input ${name} is not a number`);
        }
    }, false);

    equals.onclick = displayNum;

    el("#clear").onclick = clearAll;
    el("#reset").onclick = function() {
        window.location = window.location;
    };

}());