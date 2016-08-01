// const spotcontrol : {
//   login: (username: string, passowrd: string) => Promise<string>,
//   loginBlob: (username: string, blob: string) => Promise<string>,
//   startDiscovery: () => Promise<{username: string, blob: string}>,
//   getDevices: () => Promise<string>,
//   listMdnsDevices: () => Promise<string>,
//   hello: () => Promise<string>,
//   doSearch: (term: string) => Promise<SearchResult>,
//   doSuggest: (term: string) => Promise<SuggestResult>
// } = NativeModules.SpotAndroid;

function wrapControllerFunc(method, args = []){
  return new Promise((resolve, reject) => {
    args.push((res) => {
      resolve(res)
    })
    window.controller[method].apply(window.controller, args)
  })

}

export default {
  login: () => Promise.resolve('success'),
  getDevices: () => Promise.resolve(window.appState.devices),
  hello: () => wrapControllerFunc('SendHello'),
  doSuggest: (term : string) => wrapControllerFunc("Suggest", [term]),
  doSearch: (term : string) => wrapControllerFunc("Search", [term])
}
