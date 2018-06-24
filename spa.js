class SpaUtils {
  getDomeEle(routUrl) {
    let _script = "document.querySelector('" + routUrl + "')";
    return eval(_script);
  }
}
const spaUtils = new SpaUtils();

class SimpleSpa {
  constructor(cfg) {
    this.routerArray = [];
    this.type = "right";
  }
  init() {
    this.initCurrentRouterPage();
    this.listenHistoryChange();
  }
  //监听页面切换
  listenHistoryChange() {
    window.addEventListener("hashchange", e => {
      let nowhashUrl = this.getRouterHashUrl(e.newURL);
      let oldhashUrl = this.getRouterHashUrl(e.oldURL);
      let nowRouterInfo = this.getRouterInfo(nowhashUrl);
      let oldRouterInfo = this.getRouterInfo(oldhashUrl);
      if (nowRouterInfo) {
        this.routerAnimation(nowRouterInfo, oldRouterInfo);
        this.initLoadPage(nowRouterInfo);
        //执行过度动画
      } else {
        //渲染 404 dome
      }
    });
  }
  //初始配置触发当前页面的事务
  initCurrentRouterPage() {
    let _currenturl = window.location.href;
    let nowhashUrl = this.getRouterHashUrl(_currenturl) || "#index";

    let nowRouterInfo = this.getRouterInfo(nowhashUrl);
    if (nowhashUrl === "#index") {
      this.initRouterIndex();
    }
    if (nowRouterInfo) {
      this.initRouterAnimation(nowhashUrl);
      nowRouterInfo.pageEle.style.display = "block";
      this.initLoadPage(nowRouterInfo);
    }
  }
  //初始化首页 地址中加入#index 并处理参数位置
  initRouterIndex() {
    let _url = window.location.href;
    let _queryparams = "";

    if (_url.indexOf("?") > -1) {
      _queryparams = _url.substring(_url.indexOf("?"), _url.length);
      console.log(_queryparams);
      history.replaceState("", "", "#index?" + _queryparams);
    } else {
      history.replaceState("", "", "#index");
    }
  }

  //需要加载的页面执行事物
  initLoadPage(routerInfo) {
    console.log(routerInfo);
    if (routerInfo) {
      //执行pageKey 方法
      routerInfo.pageKey.init();
    } else {
      console.log("需要路由信息");
    }
  }
  initRouterAnimation(currentHashUrl) {
    this.routerArray.forEach(item => {
      if (item.url != currentHashUrl) {
        item.pageEle.style.webkitTransform = "translate3d(100%,0,0)";
        item.pageEle.style.transform = "translate3d(100%,0,0)";
      }
    });
  }

  routerAnimation(newRouter, oldRouter) {
    //默认右侧动画
    if (this.type === "right") {
      newRouter.pageEle.style.zIndex = 100;
      newRouter.pageEle.style.display = "block";
      newRouter.pageEle.style.transition = "all 0.3s ease-in-out";
      setTimeout(() => {
        newRouter.pageEle.style.webkitTransform = "translate3d(0,0,0)";
        newRouter.pageEle.style.transform = "translate3d(0,0,0)";
      }, 20);
      oldRouter.pageEle.style.zIndex = 99;
      oldRouter.pageEle.style.display = "block";
      oldRouter.pageEle.style.transition = "all 0s ease-in-out";
      oldRouter.pageEle.style.transform = "translate3d(100%,0,0)";
    }
  }
  //循环遍历  当前url 是否再路由数组中被注册 并返回
  getRouterInfo(url) {
    let router = false;
    for (let i = 0; i < this.routerArray.length; i++) {
      if (this.routerArray[i].url == url) {
        router = this.routerArray[i];
        break;
      }
    }
    return router;
  }
  //获取地址当前页面的hash地址
  getRouterHashUrl(url) {
    let _url = url || window.location.href;
    let _router = "";
    if (_url.indexOf("#") > -1) {
      if (_url.indexOf("?") > -1) {
        _router = _url.substring(_url.indexOf("#"), _url.indexOf("?"));
      } else {
        _router = _url.substring(_url.indexOf("#"), _url.length);
      }
    }
    return _router;
  }
  //注册路由
  router(url, title, pageKey) {
    this.routerArray.push({
      url: url,
      title: "title",
      pageKey: pageKey,
      pageEle: spaUtils.getDomeEle(url)
    });
  }
}
const simpleSpa = new SimpleSpa();

class Test {
  constructor() {
    this.domeId = "#index2";
  }
  init() {}
  //设置数据
  data() {
    this.phone = "";
    this.address = "";
  }
  //渲染dome
  raender() {
    let _html = ``;
  }
}

const test = new Test();
simpleSpa.router("#index", "title1", test);
simpleSpa.router("#index2", "title2", test);
simpleSpa.init();
