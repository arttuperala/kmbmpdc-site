function documentReady() {
    updateTime();
    updateDownload();
    setInterval(updateTime, 2000);
}

// Updates the menubar time.
function updateTime() {
    var now = new Date();
    var minutes = now.getMinutes()
    document.getElementById("menubarClock").innerHTML = now.getHours() + "." + (minutes > 9 ? '' : '0') + minutes;
}

// Fill in latest release version number and URL to download button.
function updateDownload() {
    fetch("https://api.github.com/repos/arttuperala/kmbmpdc/releases/latest").then(function(response) {
        return response.json();
    }).then(function(data) {
        document.getElementById("latestVersion").innerHTML = data.name;
        for (var i = data.assets.length - 1; i >= 0; i--) {
            if (data.assets[i].name === "kmbmpdc.tar.gz") {
                document.getElementById("downloadButton").href = data.assets[i].browser_download_url;
            }
        }
    });
}

// Execute `documentReady()` when DOM is loaded.
if (document.readyState === 'complete' || document.readyState !== 'loading') {
    documentReady();
} else {
    document.addEventListener('DOMContentLoaded', documentReady);
}
