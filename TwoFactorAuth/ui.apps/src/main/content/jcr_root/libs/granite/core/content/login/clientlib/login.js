/*
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any. The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
console.log("test");
jQuery(function($){
 
    // disable 403 handler in granite
    $.ajaxSetup({
        statusCode: {
            403: $.noop
        }
    });
 
    function flushError() {
        // adds the class to hide the alert
        $('#error').attr('hidden');
        // clears the text
        $('#error > .coral-Alert-content').text('');
    }
 
    function displayError(message) {
        // removes the hidden class to show the component
        $('#error').removeAttr('hidden');
        // adds the text inside the coral-Alert-message
        $('#error > .coral3-Alert-content').text(message);
    }
 
    // Bind an event listener on login form to make an ajax call
    $("#login").submit(function(event) {
        event.preventDefault();
        var form = this;
        var path = form.action;
        var user = form.j_username.value;
        var pass = form.j_password.value;
        var otp = form.j_otpcode.value;
        var errorMessage = form.errorMessage.value;
        var resource = form.resource.value;
 
        // if no user is given, avoid login request
        if (!user) {
            return true;
        }
 
        // send user/id password to check and persist
        $.ajax({
            url: path,
            type: "POST",
            async: false,
            global: false,
            dataType: "text",
            data: {
                _charset_: "utf-8",
                j_username: user,
                j_password: pass,
                j_otpcode: otp,
                j_validate: true
            },
            success: function (data, code, jqXHR){
                var u = resource;
                if (window.location.hash && u.indexOf('#') < 0) {
                    u = u + window.location.hash;
                }
                document.location = u;
            },
            error: function() {
                displayError(errorMessage);
                form.j_password.value="";
                form.j_otpcode.value="";
            }
        });
        return true;
    });
 
    // workaround for typekit which takes away any focus
    var typekitTries = 5;
    function checkForTypekit() {
        if (!$('html').hasClass('wf-active') && typekitTries-- > 0) {
            setTimeout(checkForTypekit, 500);
        } else {
            $('#username').trigger('focus');
        }
    }
 
    $(document).on('ready', checkForTypekit);
});