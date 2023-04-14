let dataList = {};
let dataFiles = [];

async function main() {
    dataList = await (await fetch("data/collection.json")).json();
    for (const file of dataList["collection"]) {
        const json = await (await fetch(`data/${file}`)).json();
        dataFiles.push(
            json
        );
    }
    const main = document.querySelector("main");
    
//    let c = 0;
    dataFiles.forEach(file => {
        let element = new HTMLFoldGroup(file["title"]);
        file["collection"].forEach(line => {
            let div       = document.createElement("div");
            div.className   = "math-line";
            let title     = document.createElement("div");
            title.className = "math-title";
            let func      = document.createElement("div");
            func.className  = "math-func";

            title.innerHTML = line["title"] ?? "<span style=\"color: red\">Title Missing</span>";
            if (line["function"] == null)
                func.innerHTML = "<span style=\"color: red\">Function Missing</span>";
            else {
                MathJax.texReset();
                var options = MathJax.getMetricsFor(func);
                MathJax.tex2chtmlPromise(line["function"], options).then(node => {
                    func.appendChild(node);
                    MathJax.startup.document.clear();
                    MathJax.startup.document.updateDocument();
                }).catch(err => {
                    func.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message))
                });
            }

            div.appendChild(title);
            div.appendChild(func);

            element.getContentElement().appendChild(div);

            if (line["comment"] != null) {
                let comment = document.createElement("div");
                comment.className = "math-comment";
                comment.innerHTML = line["comment"];
                element.getContentElement().appendChild(comment);
            }
        });
        main.appendChild(element);
//        if (c++ > 10)
//            element.clickEvent();
    });
}
main();