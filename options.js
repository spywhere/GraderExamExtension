function save_options() {
    var patterns = document.getElementById("patterns").value;
    var adminkey = document.getElementById("adminkey").value;
    var newkey = document.getElementById("newkey").value;
    var enabled = document.getElementById("enabled").checked;

    chrome.storage.sync.get({
        adminkey: "grader@exam"
    }, function(items) {
        if(adminkey != items.adminkey){
            var status = document.getElementById("status");
            status.textContent = "Invalid";
            setTimeout(function() {
                status.textContent = "";
            }, 750);
            return;
        }
        if(newkey == ""){
            newkey = adminkey;
        }
        chrome.storage.sync.set({
            patterns: patterns,
            adminkey: newkey,
            enabled: enabled
        }, function() {
            var status = document.getElementById("status");
            status.textContent = "Saved";
            setTimeout(function() {
                status.textContent = "";
            }, 750);
        });
    });
}

function restore_options() {
    chrome.storage.sync.get({
        patterns: "https?://(((www|login[^\\.])\\.)?(grader\\.)?(eng\\.)?(src\\.)?ku\\.ac\\.th|((docs|drive)\\.)google).*|.*\\.pdf"
        // patterns: ".*",
        enabled: true
    }, function(items) {
        document.getElementById("patterns").value = items.patterns;
        document.getElementById("adminkey").value = "";
        document.getElementById("enabled").checked = items.enabled;
    });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
