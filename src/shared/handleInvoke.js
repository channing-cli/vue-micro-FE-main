import dynamicModules from "@/shared/dynamicModules";

export default function handleInvoke(
  onGlobalStateChange,
  setGlobalState,
  offGlobalStateChange
) {
  onGlobalStateChange(async state => {
    console.log("onGlobalStateChange from main~~~~~~~~~~~~~~~");
    console.log(state);
    offGlobalStateChange();
    if (state.invoke && state.invoke.length > 0) {
      const exposeModule = {};
      await Promise.all(
        state.invoke.map(async item => {
          exposeModule[item] = await dynamicModules[item]();
        })
      );
      console.log("exposeModule");
      console.log(exposeModule);
      setGlobalState({
        exposeModule
      });
    }
  });
}
