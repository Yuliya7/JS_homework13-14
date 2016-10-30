'use strict';
$(function () {

var html = $('#test-tmpl').html();
var questions = [
        {
            text: '1. I __________ a teacher.',
            answers: ['is', 'am', 'are'],
            correctAnswer: [false, true, false]
    },
        {
            text: '2. He __________ like basketball.',
            answers: ['does not', 'not', 'do not'],
            correctAnswer: [true, false, false]
        },
        {
            text: '3. __________ he go for a walk every evening?',
            answers: ['Is', 'Has', 'Does'],
            correctAnswer: [false, false, true]
    },
    {
        text: '4. I am reading. What __________ doing',
        answers: ['you', 'are', 'are you'],
        correctAnswer: [false, false, true]
    },
    {
        text: '5. What are you doing now? I __________ a letter.',
        answers: ['am writing', 'write', 'be writing'],
        correctAnswer: [true, false, false]
    }
    ];
    localStorage.setItem('testQuestions', JSON.stringify(questions));
    var test = localStorage.getItem('testQuestions');
    var testObj = JSON.parse(test);
    var testList = tmpl(html, {
        data: testObj
    });
    $('body').append(testList);

// отмечает только один чекбокс
    $(function(oneCheck) {

    $('.text_ansvers0').click(function() {
        $('.text_ansvers0 input:checked').prop('checked', false);
        $(this).find('input').prop('checked', true);
    });

        $('.text_ansvers1').click(function() {
        $('.text_ansvers1 input:checked').prop('checked', false);
        $(this).find('input').prop('checked', true);
      });

        $('.text_ansvers2').click(function() {
            $('.text_ansvers2 input:checked').prop('checked', false);
            $(this).find('input').prop('checked', true);
        });

        $('.text_ansvers3').click(function() {
            $('.text_ansvers3 input:checked').prop('checked', false);
            $(this).find('input').prop('checked', true);
        });
        $('.text_ansvers4').click(function() {
            $('.text_ansvers4 input:checked').prop('checked', false);
            $(this).find('input').prop('checked', true);
        });

    });

function answersCheck() {
    var marked = 0;
    for (var i = 0; i < testObj.length; i++) {
        var inputs = $("input[value='" + i + "']");
        var calculate = 0;
        for (var j = 0; j < inputs.length; j++) {

            var checked = inputs[j].checked;
            var right = questions[i].correctAnswer[j] === true;
            if (checked == right) {
                calculate++
            }
        }
        if (calculate == (testObj[i].correctAnswer.length)) {
            marked++;
        }
    }
    var result = ((marked === questions.length) ? 'Поздравляем, Вы прошли тест!' : 'К сожалению, Вы не прошли тест!'+ ' '+ 'Попробуйте еще раз! ') + ' ' + ' ' + ' ' +  'Всего правильных ответов: ' + ' '+ ' ' + marked;
    return result;
    };

$('button#go').click( function(){
    var modal = $('#modal_form');
    event.preventDefault();
    $('#modal_result').text(answersCheck());

    $('#overlay').fadeIn(400,
        function(){
            $('#modal_form')
                .css('display', 'block')
                .animate({opacity: 1, top: '50%'}, 200);
    });

    $('#modal_close, #overlay, #button').click( function(){
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('#overlay').fadeOut(400);
                    $('input').removeAttr('checked');
                });
    });

});

});
