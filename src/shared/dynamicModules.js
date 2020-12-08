const dynamicModules = {
  // moment: () => import(/* webpackChunkName: "moment" */ "moment"),
  // lodash: () => import(/* webpackChunkName: "lodash" */ "lodash"),
  // vuedraggable: () =>
  //   import(/* webpackChunkName: "vuedraggable" */ "vuedraggable"),
  people: () => import(/* webpackChunkName: "people" */ "@/views/People.vue")
};
export default dynamicModules;
