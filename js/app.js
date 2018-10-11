'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    var quests = getFromStorage('QuestsTree');
    if (quests) {
        gQuestsTree = quests;
    } else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi?');
        gQuestsTree.no = createQuest('Rita?');
    }
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    // TODO: hide the gameStart section
    $('.gameStart').hide();
    renderQuest();
    // TODO: show the gameQuest section
    $('.gameQuest').show();
}

function renderQuest() {
    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
    $('.currQuest').text(gCurrQuest.txt);
}

function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            // TODO: improve UX
            $('.gameQuest').hide();
            $('.gameEnd').show();
        } else {
            // alert('I dont know...teach me!')
            // TODO: hide and show gameNewQuest section
            $('.gameQuest').hide();
            $('.currQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
        // TODO: update the prev, curr and res global vars
        gPrevQuest = gCurrQuest;
        gCurrQuest = gCurrQuest[res];
        gLastRes = res;
        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    var $newGuess = $('#newGuess').val();
    var $newQuest = $('#newQuest').val();
    // TODO: connect the 2 Quests to the quetsions tree
    gPrevQuest[gLastRes] = createQuest($newQuest);
    gPrevQuest[gLastRes].no = gCurrQuest;
    gPrevQuest[gLastRes].yes = createQuest($newGuess);
    
    var $newGuess = $('#newGuess').val('');
    var $newQuest = $('#newQuest').val('');
    saveToStorage('QuestsTree', gQuestsTree);
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameEnd').hide();

    $('.gameStart').show();
    $('.currQuest').show();

    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}