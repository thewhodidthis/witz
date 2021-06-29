var witz = (() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // main.js
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  var glitch = (lookup) => {
    const random = (peak = lookup.length) => Math.floor(Math.random() * peak);
    const filter = (data, turn) => {
      if (!turn) {
        return data;
      }
      const mark = random(data.length);
      const seed = lookup.charAt(random());
      const crop = data.substring(0, mark) + seed + data.substring(mark + 1);
      return filter(crop, turn - 1);
    };
    return filter;
  };
  var witz = (options) => {
    const { chars, depth } = Object.assign({
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      depth: 23
    }, options);
    const filter = glitch(chars);
    return (target = "", N = depth) => {
      if (!N) {
        return target;
      }
      const split = target.indexOf(",") + 1;
      const scoop = target.slice(split);
      return target.slice(0, split) + filter(scoop, N);
    };
  };
  var main_default = witz;
  return main_exports;
})();
