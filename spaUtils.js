class SpaUtils {
  getDomeEle(routUrl) {
    let _script = "document.querySelector('" + routUrl + "')";
    return eval(_script);
  }
}
const spaUtils = new SpaUtils();
export default spaUtils;
