// btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn0, btnAc, btnCe, btnDivide, btnMultiply, btnSubtract, btnAdd, btnDecimal, btnEquals

// always adds decimals, even when result is a whole number.

$(document).ready(() => {
  
  let operators = /[*/+-]/;
  let curr = "";
  let sum = "";
  let audio = new Audio('http://www.freesound.org/data/previews/219/219069_1528309-lq.mp3');

  function calculate(input) {
    // Plays a click sound.
    audio.play();
    // If either string exceeds 16 chars, display error and reset.
    if (curr.length > 9 || sum.length > 9) {
      curr = "";
      sum = "";
      $("#screenCurr").text("0");
      $("#screenSum").text("DIGIT LIMIT MET");
      return;
    }

    // ===== NUMBERS =====
    if (typeof input === "number") {
      // If sum is displaying result, clear previous sums.
      if (sum.match(/[=]/)) {
        curr = "";
        sum = "";
      }
      // If 0 is input as first digit (inc. after an operator), do nothing.
      if (input === 0 && (curr === "" || curr.match(operators))) {
        return;
        // Otherwise, if operator was previous input, add it to sum and set curr to input.
      } else {
        if (curr.match(operators)) {
          sum += curr;
          curr = input.toString();
          // If it wasn't an operator, add input digit to curr.
        } else {
          curr += input.toString();
        }
      }
      updateScreen();
    }
    
    // ===== DECIMAL ===== Only allows 1 decimal per value.
    if (input === "." && curr.indexOf(input) === -1) {
      // If sum is displaying result, clear previous sums.
      if (sum.match(/[=]/)) {
        curr = "";
        sum = "";
      }
      // If curr is empty, add a 0 infront of the decimal.
      if (curr === "") {
        curr = "0" + input;
        // Otherwise, if curr is an operator, add it to sum and set curr to "0."
      } else if (curr.match(operators)) {
        sum += curr;
        curr = "0" + input;
        // Otherwise, just add decimal to curr.
      } else {
        curr += input;
      }
      updateScreen();
    }

    // ===== CLEARS ===== Resets everything.
    if (input === "ac") {
      curr = "";
      sum = "";
      updateScreen();
    }
    // If sum contains "=", resets both, if not, just curr.
    if (input === "ce") {
      if (sum.match(/[=]/)) {
        sum = "";
      }
      curr = "";
      updateScreen();
    }
    
    // ===== OPERATORS =====
    if (input.match(operators)) {
      // If sum is displaying a result, set that result as sum and the operator as curr.
      if (sum.match(/[=]/)) {
        sum = curr;
        curr = input;
        updateScreen();
      }
      // If curr is empty or last input was another operator, do nothing.
      if (curr === "" || curr.match(operators)) {
        return;
        // Otherwise, add curr to sum, set curr as input.
      } else {
        sum += curr;
        curr = input;
        /*if (!curr.match(operators)) { // DELETE WHEN YOU'RE SURE IT'S SAFE TO.
          sum += curr;
          curr = input;
        } else {
          curr = input;
        }*/
      }
      updateScreen();
    }
    
    // ===== EQUALS =====
    if (input === "=") {
      // If last input was an operator, do nothing.
      if (curr.match(operators)) {
        return;
        // Otherwise, add curr to sum, set curr to result of sum, add input to sum.
        // The number of decimal places is determined by how much room is left on the display.
      } else {
        sum += curr;
        if (eval(sum) % 1 !== 0) {
          curr = +(eval(sum).toFixed(3).toString()); // (7 - sum.length)
        } else {
          curr = (eval(sum)).toString();
        }
        sum += input;
        updateScreen();
      }
    }

  } // CALCULATE

  // ===== UPDATE SCREEN =====
  function updateScreen() {
    // If curr is not empty, curr display = curr, sum display = sum + curr.
    if (curr !== "") {
      $("#screenCurr").text(curr);
      $("#screenSum").text(sum + curr);
      // Otherwise, curr display = 0.
    } else {
      $("#screenCurr").text("0");
      // And if sum is also empty, sum display = 0.
      if (sum === "") {
        $("#screenSum").text("0");
        // Otherwise, sum display = sum.
      } else {
        $("#screenSum").text(sum);
      }
    }
    //console.log(curr, sum);
  }
  
  // ===== BUTTONS =====
  $("#btn1").click(() => calculate(1));
  $("#btn2").click(() => calculate(2));
  $("#btn3").click(() => calculate(3));
  $("#btn4").click(() => calculate(4));
  $("#btn5").click(() => calculate(5));
  $("#btn6").click(() => calculate(6));
  $("#btn7").click(() => calculate(7));
  $("#btn8").click(() => calculate(8));
  $("#btn9").click(() => calculate(9));
  $("#btn0").click(() => calculate(0));
  $("#btnDecimal").click(() => calculate("."));
  $("#btnAc").click(() => calculate("ac"));
  $("#btnCe").click(() => calculate("ce"));
  $("#btnDivide").click(() => calculate("/"));
  $("#btnMultiply").click(() => calculate("*"));
  $("#btnSubtract").click(() => calculate("-"));
  $("#btnAdd").click(() => calculate("+"));
  $("#btnEquals").click(() => calculate("="));
  
  // ===== KEYPRESS =====
  $(document).keyup((e) => { 
    console.log("Key: " + e.which);
    switch (e.which) {
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 57:
      case 48:
        calculate(e.which - 48);
        break;
      case 190:
        calculate(".");
        break;
      case 65:
      case 32:
        calculate("ac");
        break;
      case 69:
        calculate("ce");
        break;
      case 191:
        calculate("/");
        break;
      case 56:
        if (e.shiftKey) {
          calculate("*");
        } else {
          calculate(e.which - 48);
        }
        break;
      case 189:
        calculate("-");
        break;
      case 187:
        if (e.shiftKey) {
          calculate("+");
        } else {
          calculate("=");
        }
        break;
      case 13:
        calculate("=");
        break;
                   }
  });
});