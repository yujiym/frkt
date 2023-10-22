window.onload = () => {
  class Widget {
    constructor(url) {
      this.content = `
        <div id="frkt-widget-module">
        <div id="frkt-widget-module-close" style="display:flex;justify-content:center;align-items:center;width:29px;height:29px;color:#666;background:rgba(238,238,238,0.98);border:1px solid #ddd;border-radius:999px;position:absolute;top:-3px;right:-3px;font-size:14px;cursor:pointer;font-weight:bold;">x</div>
        <iframe src="${url}" style="width:100%;height:100%;border:none;" allow="publickey-credentials-get *"/>
        </div>`
      this.style = `
          #frkt-widget-module {
            position:fixed;
            bottom:15px;
            right:15px;
            left:15px;
            z-index:99999;
            height:480px;
            border-radius:10px;
            box-shadow:0 25px 50px -12px rgb(0 0 0 / 0.45);
        }
          @media (min-width: 640px) {
            #frkt-widget-module {
              left:auto;
              width:320px;
            }
          }
        `
    }

    onloadFn() {
      document
        .getElementById('frkt-widget-module-close')
        .addEventListener('click', () => {
          const iframeEl = document.getElementById('frkt-widget-module')
          if (iframeEl) {
            iframeEl.style.display = 'none'
          }
        })
    }

    appendTo() {
      document.body.insertAdjacentHTML('beforeEnd', this.content)
      const styleTag = document.createElement('style')
      styleTag.textContent = this.style
      document.head.appendChild(styleTag)
      setTimeout(() => {
        const closeButton = document.getElementById('frkt-widget-module-close')
        closeButton.addEventListener('click', () => {
          const iframeEl = document.getElementById('frkt-widget-module')
          if (iframeEl) {
            iframeEl.style.display = 'none'
          }
        })
      }, 500)
    }
  }

  const button = document.querySelector('[data-frkt-widget="open"]')

  if (!button) return

  button.addEventListener('click', () => {
    const widget = new Widget('http://localhost:3003/a/000/r/001')
    widget.appendTo()
  })
}
