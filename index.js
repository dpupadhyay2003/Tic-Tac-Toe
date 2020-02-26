var COUNTER = 0;
var PLAYER_1 = 0;
var PLAYER_2 = 0;
var TIE = 0;


$(document).ready(function() {
    $('#player-1-score').addClass('current-player-box');
    $(".box").click(function(event) {
        var current_div_id = event.target.id; // Get the ID of current Div
        // Checking current data exists or not
        if (!$('#' + current_div_id).text()) { // If Not, then proceeds further
            // console.log('Current Counter Value : ', COUNTER);
            if (COUNTER < 10) {
                COUNTER += 1;
                if (COUNTER % 2 == 0) {
                    //Player - 2 Turn
                    // Print 'o'
                    $('#' + current_div_id).html('o').addClass('o-value text-center');
                    $('#player-2-score').removeClass('current-player-box');
                    $('#player-1-score').addClass('current-player-box margin-left-32').removeClass('margin-left-35');
                    $('#tie-score').addClass('margin-left-6').removeClass('margin-left-8');
                } else {
                    //Player - 1 Turn
                    // Print 'x'
                    $('#' + current_div_id).html('x').addClass('x-value text-center');
                    $('#player-2-score').addClass('current-player-box');
                    $('#player-1-score').removeClass('current-player-box margin-left-32').addClass('margin-left-35');
                    $('#tie-score').addClass('margin-left-8').removeClass('margin-left-6');
                }
            } else {
                //reset counter
                COUNTER = 0;
            }
        }
        gameCondition();
    });
});

function resetAllBoxes() { // Clear All Boxes, as one of the player wins or match gets TIE
    for (let index = 1; index <= 9; index++) {
        $('#div-' + index).html('');
    }
    COUNTER = 0;
    $('#player-2-score').removeClass('current-player-box')
    $('#player-1-score').addClass('current-player-box margin-left-32').removeClass('margin-left-35');
}

function updateScore(value) { // Check and Update the Score.       
    if (value == 'x') {
        // Player X Wins.
        PLAYER_1 += 1;
        $('#player-1-value').html(PLAYER_1)
        resetAllBoxes();
    } else {
        // Player O Wins.
        PLAYER_2 += 1;
        $('#player-2-value').html(PLAYER_2)
        resetAllBoxes();
    }
}

function checkWinning(val1, val2, val3) { //checks whether the div's has same value['x', 'o'] or not
    if ((val1 === 'x' && val2 === 'x' && val3 === 'x') ||
        (val1 === 'o' && val2 === 'o' && val3 === 'o')) {
        return true;
    } else {
        return false;
    }
}

function gameCondition() {
    var div1 = $('#div-1').text();
    var div2 = $('#div-2').text();
    var div3 = $('#div-3').text();
    var div4 = $('#div-4').text();
    var div5 = $('#div-5').text();
    var div6 = $('#div-6').text();
    var div7 = $('#div-7').text();
    var div8 = $('#div-8').text();
    var div9 = $('#div-9').text();

    if (checkWinning(div1, div2, div3)) {
        updateScore(div1);
    } else if (checkWinning(div4, div5, div6)) {
        updateScore(div4);
    } else if (checkWinning(div7, div8, div9)) {
        updateScore(div7);
    } else if (checkWinning(div1, div4, div7)) {
        updateScore(div1);
    } else if (checkWinning(div2, div5, div8)) {
        updateScore(div2);
    } else if (checkWinning(div3, div6, div9)) {
        updateScore(div3);
    } else if (checkWinning(div1, div5, div9)) {
        updateScore(div1);
    } else if (checkWinning(div3, div5, div7)) {
        updateScore(div3);
    } else {
        // Match TIE.
        if (div1 != '' && div2 != '' && div3 != '' &&
            div4 != '' && div5 != '' && div6 != '' &&
            div7 != '' && div8 != '' && div9 != '' &&
            !checkWinning(div1, div2, div3) && !checkWinning(div4, div5, div6) && !checkWinning(div7, div8, div9) &&
            !checkWinning(div1, div4, div7) && !checkWinning(div2, div5, div8) && !checkWinning(div3, div6, div9) &&
            !checkWinning(div1, div5, div9) && !checkWinning(div3, div5, div7)) {
            TIE += 1;
            $('#tie-value').html(TIE);
            resetAllBoxes();
        }
    }
}