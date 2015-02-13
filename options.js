function save_options() {
    var patterns = document.getElementById("patterns").value;
    var adminKey = document.getElementById("adminkey").value;

    chrome.storage.sync.get({
        adminKey: "grader@exam"
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
            patterns: patterns,
            adminKey: adminKey
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
        // patterns: "https?://(((www|login[^\\.])\\.)?(grader\\.)?(eng\\.)?(src\\.)?ku\\.ac\\.th|((docs|drive)\\.)google).*|.*\\.pdf"
        patterns: ".*"
    }, function(items) {
        document.getElementById("patterns").value = items.patterns;
        document.getElementById("adminkey").value = "";
    });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
