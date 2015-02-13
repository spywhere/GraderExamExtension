function unlock_mode() {
    var adminKey = document.getElementById("adminkey").value;

    chrome.storage.sync.get({
        adminKey: "grader@exam",
        enabled: true
    }, function(items) {
        if(adminKey != items.adminKey){
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
        if(items.enabled){
            status.textContent = "Enabled";
        }else{
            status.textContent = "Disabled";
        }
        setTimeout(function() {
            status.textContent = "";
        }, 750);
    });
}
document.addEventListener("DOMContentLoaded", show_status);
document.getElementById("unlock").addEventListener("click", unlock_mode);
