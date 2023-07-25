function formatNotes(xml) {
    let xmlDoc = xml.responseXML;
    // Main Theme of Tutorial and overview
    document.getElementById("heading").innerHTML = xmlDoc.getElementsByTagName("subject").item(0).innerHTML
    document.getElementById("overview").innerHTML = xmlDoc.getElementsByTagName("overview").item(0).innerHTML;
    let notes = "";
    // Notes content:
    let topics = xmlDoc.getElementsByTagName("topic");
    for (let i = 0; i<topics.length; i++) {
        let subtopics = topics[i].getElementsByTagName("subtopic");
        let topicTitle = topics[i].getElementsByTagName("title").item(0).innerHTML;
        for (let j = 0; j<subtopics.length; j++) {
            notes += "<h2>"+topicTitle+": "+subtopics[j].getElementsByTagName("title").item(0).innerHTML+"</h2>";
            let entries = subtopics[j].getElementsByTagName("content").item(0).getElementsByTagName("entry");
            for (let k = 0; k<entries.length; k++) {
                notes += "<p>"+ entries[k].innerHTML +"</p>"
            }
            notes += "<hr/>";
        }
    }
    document.getElementById("content").innerHTML = notes;
}