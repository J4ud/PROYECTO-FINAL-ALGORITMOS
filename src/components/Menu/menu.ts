class MenuDropdown extends HTMLElement {
    private _open: boolean = false;
  
    constructor() {
      super();
  
      if (!this.attachShadow({ mode: "open" })) {
        throw new Error("Shadow root creation failed.");
      }
  
      const template = document.createElement("template");
      template.innerHTML = `
        <style>
          menu-dropdown {
            position: relative;
          }
  
          menu-dropdown button {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border: none;
            cursor: pointer;
          }
  
          menu-dropdown ul {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            list-style: none;
            padding: 0;
            margin: 0;
            display: none;
          }
  
          menu-dropdown ul li {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
  
          menu-dropdown ul li:last-child {
            border-bottom: none;
          }
  
          menu-dropdown ul li a {
            color: #333;
            text-decoration: none;
            display: block;
          }
        </style>
        <slot name="trigger"></slot>
        <slot name="content"></slot>
      `;
  
      this.shadowRoot?.appendChild(template.content.cloneNode(true));
  
      this.addEventListener("click", this.handleClick.bind(this));
    }
  
    connectedCallback() {
      this.classList.add("menu-dropdown");
      this.shadowRoot?.addEventListener("click", this.handleClick.bind(this));
    }
  
    handleClick(event: Event) {
      if (event.target === this) {
        this._open = !this._open;
        this.classList.toggle("open", this._open);
        event.preventDefault();
      }
    }
  
    static get observedAttributes() {
      return ["open"];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "open") {
        if (newValue === "true") {
          this.classList.add("open");
        } else {
          this.classList.remove("open");
        }
      }
    }
  
    toggle() {
      this._open = !this._open;
      this.classList.toggle("open", this._open);
    }
  
    get open(): boolean {
      return this._open;
    }
  
    set open(value: boolean) {
      this._open = value;
      this.classList.toggle("open", value);
    }
  }
  
  customElements.define("menu-dropdown", MenuDropdown);