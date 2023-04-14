{
    const templates = 
    `<template id="fold-group-template">
        <button class="fg-header">
            <fg-title>\${TITLE}</fg-title>
            <div class="flex-spacer"></div>
            <fg-button>\${BUTTON}</fg-button>
        </button>
        <fg-content>\${CONTENT}</fg-content>
    </template>`;
    this.document.body.innerHTML += templates;
}

class HTMLFoldGroup extends HTMLElement {    
    constructor(title_, content_) {
        super();

        let title = title_ ?? this.getAttribute("title") ?? "Fold Group";

        let content = content_ ?? this.innerHTML;
        this.innerHTML = "";

        let template = document.getElementById("fold-group-template");
        let templateContent = template.content;
        this.appendChild(templateContent.cloneNode(true));

        this.innerHTML = this.innerHTML
            .replace("${TITLE}", title)
            .replace("${BUTTON}", "&#x2630")
            .replace("${CONTENT}", content);

        let foldHeader = this.querySelector("button.fg-header");
        let foldButton = this.querySelector("fg-button");
        let foldContent = this.querySelector("fg-content");
        foldContent.setAttribute("state", this.getAttribute("default-state") ?? "closed");
        foldButton.innerHTML = foldContent.getAttribute("state") == "closed" ? "&#x2630" : "&#x2715";

        this.clickEvent = (e) => {
            foldContent.setAttribute("state", foldContent.getAttribute("state") == "open" ? "closed" : "open");
            foldButton.innerHTML = foldButton.innerHTML == "\u2715" ? "&#x2630" : "&#x2715";
        };
        foldHeader.addEventListener("click", this.clickEvent);
    }

    getContentElement() {
        return this.querySelector("fg-content");
    }
}
customElements.define("fold-group", HTMLFoldGroup);