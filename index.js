javascript: (function () {
  var ipt = document.getElementById("wenhao-copy-textarea");
  var copy = function (text) {
    ipt.value = text;
    ipt.select();
    document.execCommand("copy");
  };
  var createTemplate = function (name, url, method, remark) {
    var templ = `//${remark}\n export const ${name}= Simple.Store.create({\n url:'_host:/${url}',\n method:'${method}',\n params:{\n \n},\n dataFormat(type,params,json){\n return json\n}\n})\n \n`;
    return templ;
  };
  var urlToName = function (url) {
    return url
      .split("/")
      .pop()
      .split(".")[0]
      .split("-")
      .reduce((total, n) => {
        return total + (n.slice(0, 1).toUpperCase() + n.slice(1));
      });
  };
  if (!ipt) {
    ipt = document.createElement("textarea");
    ipt.id = "wenhao-copy-textarea";
    ipt.style.cssText = "opacity:0;position:absolute;";
    document.body.appendChild(ipt);
  }
  var toast = (function () {
    var containerDom = document.getElementById("ahao-toast-container");
    if (!containerDom) {
      containerDom = document.createElement("div");
      containerDom.id = "ahao-toast-container";
      containerDom.style.cssText =
        "margin-top:30px;position: fixed;z-index: 1000;top: 20px;left: 50%;transform: translateX(-50%);";
      document.body.appendChild(containerDom);
    }
    return function (text) {
      const boxDom = document.createElement("div");
      boxDom.textContent = text;
      boxDom.style.cssText =
        "padding:5px 15px;background-color:#299a75;color:white;border-radius:5px;margin-top:7px;transition: all 0.5s;box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);";
      containerDom.appendChild(boxDom);
      setTimeout(() => {
        boxDom.style.transform = "translateY(-100%)";
        boxDom.style.opacity = "0";
        setTimeout(() => {
          containerDom.removeChild(boxDom);
        }, 500);
      }, 1500);
    };
  })();
  document.querySelectorAll(".opblock-summary-path").forEach((n) => {
    var btn = document.createElement("div");
    var btn2 = document.createElement("div");
    btn.textContent = "复制url";
    btn.style.cssText =
      "height:40px;margin-left:10px;padding:0 10px;border-radius:4px;display:flex;justify-content: center;align-items: center;background-color:green;color:white;";
    btn2.textContent = "复制Store";
    btn2.style.cssText =
      "height:40px;padding:0 10px;margin-left:10px;border-radius:4px;display:flex;justify-content: center;align-items: center;background-color:green;color:white;";
    n.parentNode.appendChild(btn);
    n.parentNode.appendChild(btn2);
    btn.addEventListener("click", function (e) {
      var url = n.dataset.path;
      copy(url);
      toast("复制成功");
      e.stopPropagation();
      return false;
    });
    btn2.addEventListener("click", function (e) {
      var name = urlToName(n.dataset.path);
      var url = n.dataset.path;
      var method = n.previousElementSibling.textContent;
      var remark = n.nextElementSibling.textContent;
      copy(createTemplate(name, url, method, remark));
      toast("复制成功");
      e.stopPropagation();
      return false;
    });
  });
})();
