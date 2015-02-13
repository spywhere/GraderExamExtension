function unlock_mode() {
    var adminkey = document.getElementById("adminkey").value;

    chrome.storage.sync.get({
        adminkey: "grader@exam",
        enabled: true
    }, function(items) {
        if(adminkey != items.adminkey){
            var status = document.getElementById("status");
            status.textContent = "Invalid";
            setTimeout(function() {
                status.textContent = "";
            }, 750);
            return;
        }
        chrome.storage.sync.set({
            enabled: !items.enabled
        }, function() {
            show_status();
        });
    });
}

function show_status() {
    chrome.storage.sync.get({enabled: true}, function(items) {
        var status = document.getElementById("status");
        var button = document.getElementById("unlock");
        if(items.enabled){
            button.textContent = "Unlock";
            status.textContent = "Enabled";
        }else{
            button.textContent = "Lock";
            status.textContent = "Disabled";
        }
        setTimeout(function() {
            status.textContent = "";
        }, 750);
    });
}
document.addEventListener("DOMContentLoaded", show_status);
document.getElementById("unlock").addEventListener("click", unlock_mode);
