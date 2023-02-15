(()=>{"use strict";var __webpack_exports__={};function fragment(param){let{children}=param;return children}let seed=Object.freeze([]);function normalize(child){return child??!1}function element_element(type,props){for(var _len=arguments.length,children=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++)children[_key-2]=arguments[_key];children=seed.concat(...children).map(normalize),"textarea"===type&&(children=[children.join("")]);let attributes={...props,children};return("style"!==type||attributes.html||(attributes.html=children.join("")),"element"===type&&(type=attributes.tag||fragment,delete attributes.tag),"function"==typeof type&&void 0!==type.render)?{type,attributes,children:null}:{type,attributes,children}}function generateKey(scope,node,depth){if(node.attributes.key)return node.attributes.key;let prefix=1===depth.length?"application":`${node.type.name}/${depth}`;return node.attributes.route?prefix+("ssg"===scope.context.environment.mode?scope.context.router.path:scope.context.router.url):prefix}function isUndefined(node){return void 0===node||null!==node&&Object.prototype.hasOwnProperty.call(node,"type")&&void 0===node.type}function isFalse(node){return null===node||!1===node||Object.prototype.hasOwnProperty.call(node,"type")&&null===node.type||!1===node.type}function isClass(node){return"function"==typeof node.type&&node.type.prototype&&"function"==typeof node.type.prototype.render}function isFunction(node){return"function"==typeof node.type}function isText(node){return"text"===node.type}function noop(){}function match(node){return node&&"a"===node.type&&node.attributes.href&&node.attributes.href.startsWith("/")&&!node.attributes.target}function transform(param){let{node}=param;match(node)&&(node.attributes.onclick??=noop)}let anchorable={transform,client:!0};function bindable_match(node){return node?.attributes?.bind!==void 0}function bindable_transform(param){let{node,environment}=param;if(!bindable_match(node))return;let object=node.attributes.bind.object??{},property=node.attributes.bind.property;"textarea"===node.type?node.children=[object[property]??""]:"input"===node.type&&"checkbox"===node.attributes.type?node.attributes.checked=object[property]:node.attributes.value=object[property]??"",environment.client&&("checkbox"===node.attributes.type||"radio"===node.attributes.type?node.attributes.onclick??=noop:"input"!==node.type&&"textarea"!==node.type?node.attributes.onchange??=noop:node.attributes.oninput??=noop)}let bindable={transform:bindable_transform,client:!0,server:!0};function serializeParam(value){return value?.toJSON?.()??value}function serializeSearch(params){let keys=Object.keys(params);return keys.map(key=>!1===params[key]||params[key]?`${key}=${params[key]}`:"").filter(segment=>!!segment).join("&")}function parameterizable_match(node){return node&&node.attributes&&(node.attributes.params||node.attributes.path)}function parameterizable_transform(param){let serializedParams,{node,router,params}=param;if(!parameterizable_match(node))return;if(node.attributes.params)for(let key in serializedParams={},node.attributes.params)serializedParams[key]=serializeParam(node.attributes.params[key]);else serializedParams=params;let search=serializeSearch(serializedParams),path=node.attributes.path||router.path;node.attributes.href=path+(search?"?":"")+search,delete node.attributes.path,delete node.attributes.params}let parameterizable={transform:parameterizable_transform,client:!0,server:!0};function extractLocation(originalUrl){let urlFragments=originalUrl.split("#"),hash=urlFragments[1],targetFragments=urlFragments[0].split("?"),path=targetFragments[0],search=targetFragments[1];"/"!==path&&path.endsWith("/")&&(path=path.substring(0,path.length-1));let url=path;search&&(url+=`?${search}`);let urlWithHash=url;return hash&&(urlWithHash+=`#${hash}`),void 0===hash&&(hash=""),{path,search,url,urlWithHash,hash}}function extractParamValue(value){return"true"===value||"false"!==value&&(value?decodeURIComponent(value.replace(/\+/g," ")):"")}function routeMatches(url,route){let{path}=extractLocation(url),urlPaths=path.split("/"),routePaths=route.split("/"),params={},length=Math.max(urlPaths.length,routePaths.length),catchall=!1;for(let i=0;i<length;i++)if(!catchall){if("*"===routePaths[i])catchall=!0;else if(routePaths[i]&&routePaths[i].startsWith(":")){let key=routePaths[i].replace(":","");params[key]=extractParamValue(urlPaths[i])}else if(routePaths[i]!==urlPaths[i])return!1}return params}function erase(node){node.type=!1,delete node.attributes,delete node.children}function routable_match(node){return node&&void 0!==node.attributes&&void 0!==node.attributes.route}function load(param){let{router}=param;router._routes={}}function routable_transform(param){let{node,depth,router}=param;if(!routable_match(node))return;let routeDepth=depth.slice(0,depth.lastIndexOf("-"));if(void 0!==router._routes[routeDepth])erase(node);else{let params=routeMatches(router.url,node.attributes.route);params?(router._routes[routeDepth]=!0,Object.assign(router._segments,params)):erase(node)}}let routable={load,transform:routable_transform,client:!0,server:!0},plugins=[parameterizable,anchorable,routable,bindable];function transformNodes(scope,node,depth){for(let plugin of plugins)plugin.transform({...scope.context,node,depth})}function loadPlugins(scope){for(let plugin of plugins)plugin.load&&plugin.load(scope.context);return plugins}function useClientPlugins(plugin){plugin.client&&plugins.push(plugin)}function useServerPlugins(plugin){plugin.server&&plugins.push(plugin)}async function generateBranch(siblings,node,depth,scope){if(transformNodes(scope,node,depth),isUndefined(node)){let message="Attempting to render an undefined node. \n";throw void 0===node?message+="This error usually happens because of a missing return statement around JSX or returning undefined from a renderable function.":message+="This error usually happens because of a missing import statement or a typo on a component tag",Error(message)}if(isFalse(node)){siblings.push({type:!1,attributes:{}});return}if(isClass(node)){let memory;let key=generateKey(scope,node,depth),instance=scope.instances[key]||new node.type(scope);instance.persistent=!!node.attributes.persistent,instance.key=key,instance._attributes=node.attributes,instance._scope=scope,scope.memory&&(memory=scope.memory[key])&&(instance.prerendered=!0,instance.initiated=!0,Object.assign(instance,memory),delete scope.memory[key]);let shouldHydrate=!1,shouldLaunch=instance.initiated&&(!instance.prerendered||instance.persistent&&instance.terminated);instance.terminated&&(shouldHydrate=!0,instance.terminated=!1);let shouldPrepare=void 0===scope.instances[key];scope.instances[key]=instance,shouldPrepare&&(void 0===memory&&(instance.prepare&&instance.prepare(),scope.context.environment.server?(instance.initiate&&await instance.initiate(),instance.initiated=!0,instance.launch&&instance.launch()):scope.initiationQueue.push(instance)),shouldHydrate=!0),scope.hydrationQueue&&(shouldHydrate?(shouldLaunch&&instance.launch&&instance.launch(),scope.hydrationQueue.push(instance)):!0===instance.initiated&&instance.update&&instance.update()),scope.context.environment.client&&scope.renewalQueue.push(instance);let children=instance.render();children&&children.type&&(children.instance=instance),node.children=[].concat(children);for(let i=0;i<node.children.length;i++)await generateBranch(siblings,node.children[i],`${depth}-${i}`,scope);return}if("body"===node.type){for(let attribute in node.type=fragment,node.attributes)if(!("children"===attribute||attribute.startsWith("_"))){if("class"===attribute||"style"===attribute)scope.nextBody[attribute]||(scope.nextBody[attribute]=[]),scope.nextBody[attribute].push(node.attributes[attribute]);else if(attribute.startsWith("on")){if(scope.context.environment.server)continue;scope.nextBody[attribute]||(scope.nextBody[attribute]=[]),Array.isArray(node.attributes[attribute])?scope.nextBody[attribute].push(...node.attributes[attribute]):scope.nextBody[attribute].push(node.attributes[attribute])}else scope.nextBody[attribute]=node.attributes[attribute]}}if(isFunction(node)){let context=node.type.name?scope.generateContext(node.attributes):node.attributes,children=node.type(context);node.children=[].concat(children);for(let i=0;i<node.children.length;i++)await generateBranch(siblings,node.children[i],`${depth}-${i}`,scope);return}if(node.type){if("head"===node.type){siblings.push({type:!1,attributes:{}});for(let i=0;i<node.children.length;i++){let id=`${depth}-${i}`;await generateBranch(scope.nextHead,node.children[i],id,scope),scope.nextHead[scope.nextHead.length-1].attributes.id??=id}}else if(node.children){let branch={type:node.type,attributes:node.attributes,children:[]};for(let i=0;i<node.children.length;i++)await generateBranch(branch.children,node.children[i],`${depth}-${i}`,scope);siblings.push(branch)}return}siblings.push({type:"text",text:node})}async function generateTree(node,scope){let tree={type:"div",attributes:{id:"application"},children:[]};return await generateBranch(tree.children,node,"0",scope),tree}let objectProxyHandler={set(target,name,value){return isProxyable(name,value)?target[name]=new Proxy(value,this):target[name]=value,name.startsWith("_")||client_client.update(),!0},get:(target,name,receiver)=>"_isProxy"===name||Reflect.get(target,name,receiver)};function isProxyable(name,value){if(name.startsWith("_"))return!1;let constructor=value?.constructor;return!!constructor&&!value._isProxy&&(constructor===Array||constructor===Object)}function generateObjectProxy(name,value){if(isProxyable(name,value)){if("object"==typeof value)for(let key of Object.keys(value))value[key]=generateObjectProxy(key,value[key]);return new Proxy(value,objectProxyHandler)}return value}let reISO=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/,reMsAjax=/^\/Date\((d|-|.*)\)[/|\\]$/;function dateParser(key,value){if("string"==typeof value){let a=reISO.exec(value);if(a)return new Date(value);if(a=reMsAjax.exec(value)){let b=a[1].split(/[-+,.]/);return new Date(b[0]?+b[0]:0-+b[1])}}return value}function deserialize(string){return JSON.parse(string,dateParser)}let state=deserialize(decodeURIComponent(document.querySelector("[name=nullstack]").content)),context={};for(let key of Object.keys(state.context))context[key]=generateObjectProxy(key,state.context[key]);let contextProxyHandler={set:(target,name,value)=>(context[name]=generateObjectProxy(name,value),client_client.update(),!0),get:(target,name)=>"_isProxy"===name||(void 0===target[name]?context[name]:target[name])};function generateContext(temporary){return new Proxy(temporary,contextProxyHandler)}let client_context=context,generateTruthyString_seed=Object.freeze([]);function generateTruthyString(elements){return generateTruthyString_seed.concat(...elements).filter(Boolean).join(" ")}let environment={...state.environment,client:!0,server:!1,event:"nullstack.environment"};function windowEvent(name){clearTimeout(null),setTimeout(()=>{let event=new Event(`nullstack.${name}`);window.dispatchEvent(event)},0)}let page={...state.page,event:"nullstack.page"};delete state.page;let pageProxyHandler={set(target,name,value,receiver){"title"===name&&(document.title=value);let result=Reflect.set(target,name,value,receiver);return"title"===name&&windowEvent("page"),client_client.update(),result}},proxy=new Proxy(page,pageProxyHandler),client_page=proxy;function getQueryStringParams(url){let query=url.split("?")[1];return query?query.split("&").reduce((params,param)=>{let[key,value]=param.split("=");return params[key]=extractParamValue(value),params},{}):{}}let segments={};function resetSegments(){for(let key in segments)delete segments[key]}let paramsProxyHandler={set(target,name,value){let serializedValue=serializeParam(value);target[name]=serializedValue;let search=serializeSearch(target);return client_router.url=client_router.path+(search?"?":"")+search,!0},get:(target,name)=>!1!==target[name]&&!1!==segments[name]&&(target[name]||segments[name]||"")},params={...state.params};delete state.params;let params_proxy=new Proxy(params,paramsProxyHandler);function updateParams(query){resetSegments();let delta=getQueryStringParams(query);for(let key of Object.keys({...delta,...params}))params[key]=delta[key];return params_proxy}let worker={...state.worker};delete state.worker;let emptyQueue=Object.freeze([]),queuesProxyHandler={set:(target,name,value)=>(target[name]=value,client_client.update(),!0),get:(target,name)=>target[name]||emptyQueue};worker.queues=new Proxy({},queuesProxyHandler);let workerProxyHandler={set:(target,name,value)=>(target[name]!==value&&(target[name]=value,client_client.update()),!0)},worker_proxy=new Proxy(worker,workerProxyHandler);async function register(){if("serviceWorker"in navigator)try{worker_proxy.registration=await navigator.serviceWorker.register("/service-worker.js",{scope:"/"}),environment.development&&worker_proxy.registration.unregister()}catch(error){console.error(error)}}worker.enabled&&(window.addEventListener("beforeinstallprompt",function(event){event.preventDefault(),worker_proxy.installation=event}),register()),window.addEventListener("online",()=>{worker_proxy.online=!0,"ssg"===environment.mode?client_router._update(client_router.url):worker_proxy.responsive=!0}),window.addEventListener("offline",()=>{worker_proxy.online=!1});let client_worker=worker_proxy;function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}let redirectTimer=null;class Router{async _popState(){let{urlWithHash}=extractLocation(window.location.pathname+window.location.search);await this._update(urlWithHash,!1)}async _update(target,push){let{url,path,hash,urlWithHash}=extractLocation(target);(url!==this._url||this._hash!==hash)&&(this.previous=this.url,clearTimeout(redirectTimer),redirectTimer=setTimeout(async()=>{if(client_page.status=200,"ssg"===environment.mode){client_worker.fetching=!0;let api="/index.json";try{let response=await fetch("/"===path?api:path+api),payload=await response.json(url);for(let key in client_client.memory=payload.instances,payload.page)client_page[key]=payload.page[key];client_worker.responsive=!0}catch(error){client_worker.responsive=!1}client_worker.fetching=!1}push&&history.pushState({},document.title,urlWithHash),this._url=url,this._hash=hash,this._changed=!0,updateParams(url),client_client.update(),windowEvent("router")},0))}async _redirect(target){if(/^(\w+:|\/\/)([^.]+.)/.test(target))return window.location.href=target;let absoluteUrl=new URL(target,document.baseURI);await this._update(absoluteUrl.pathname+absoluteUrl.search+absoluteUrl.hash,!0),window.scroll(0,0)}get url(){return this._url}set url(target){this._redirect(target)}get path(){return extractLocation(this._url).path}set path(target){this._redirect(target+window.location.search)}get base(){return this._base||(this._base=new URL(document.querySelector('[rel="canonical"]').href).origin),this._base}constructor(){_defineProperty(this,"event","nullstack.router"),_defineProperty(this,"previous",null),_defineProperty(this,"_changed",!1),_defineProperty(this,"_segments",segments);let{hash,url}=extractLocation(window.location.pathname+window.location.search);this._url=url,this._hash=hash}}let router=new Router,client_router=router;function anchorableElement(element){let links=element.querySelectorAll('a[href^="/"]:not([target])');for(let link of links)link.addEventListener("click",event=>{event.ctrlKey||event.shiftKey||event.altKey||event.metaKey||(event.preventDefault(),client_router.url=link.getAttribute("href"))})}function camelize(key){return key.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(m,chr)=>chr.toUpperCase())}function kebabize(key){return key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()}let eventCallbacks=new WeakMap,eventSubjects=new WeakMap,eventDebouncer=new WeakMap;function executeEvent(callback,subject,event,data){"object"==typeof callback?Object.assign(subject.source,callback):callback({...subject,event,data})}function debounce(selector,name,time,callback){if(time){let eventMap=eventDebouncer.get(selector)||{};clearTimeout(eventMap[name]),eventMap[name]=setTimeout(callback,time),eventDebouncer.set(selector,eventMap)}else callback()}function generateCallback(selector,name){let eventNames=eventCallbacks.get(selector);eventNames||(eventNames={},eventCallbacks.set(selector,eventNames));let callback=function eventCallback(event){let subject=eventSubjects.get(selector);subject&&(subject.href?event.ctrlKey||event.shiftKey||event.altKey||event.metaKey||(event.preventDefault(),client_router.url=subject.href):!0!==subject.default&&event.preventDefault(),debounce(selector,name,subject.debounce,()=>{let data={...subject.data};for(let attribute in subject)if(attribute.startsWith("data-")){let key=camelize(attribute.slice(5));data[key]=subject[attribute]}if(subject?.bind!==void 0){let valueName="checkbox"===subject.type||"radio"===subject.type?"checked":"value",object=subject.bind.object,property=subject.bind.property;"checked"===valueName?object[property]=event.target[valueName]:!0===object[property]||!1===object[property]?object[property]="true"===event.target[valueName]:"number"==typeof object[property]?object[property]=+event.target[valueName]||0:object[property]=event.target[valueName]}if(subject[name]!==noop){if(Array.isArray(subject[name]))for(let subcallback of subject[name])executeEvent(subcallback,subject,event,data);else executeEvent(subject[name],subject,event,data)}}))};return eventNames[name]=callback,callback}let refMap=new WeakMap;function setup(attributes,element){let object=attributes.ref.object,property=attributes.ref.property;"function"==typeof object[property]?setTimeout(()=>{object[property]({...attributes,element})},0):object[property]=element;let map=refMap.get(attributes.ref.object)||{};map[attributes.ref.property]=!0,refMap.set(attributes.ref.object,map)}function ref(attributes,element){attributes?.ref&&setup(attributes,element)}function reref(attributes,element){let map=refMap.get(attributes.ref.object);map?.[attributes.ref.property]||setup(attributes,element)}function render(node,options){if(isFalse(node)||"head"===node.type)return node.element=document.createComment(""),node.element;if(isText(node))return node.element=document.createTextNode(node.text),node.element;let svg=options&&options.svg||"svg"===node.type;for(let name in svg?node.element=document.createElementNS("http://www.w3.org/2000/svg",node.type):node.element=document.createElement(node.type),ref(node.attributes,node.element),node.attributes)if("debounce"!==name){if("html"===name)node.element.innerHTML=node.attributes[name],node.head||anchorableElement(node.element);else if(name.startsWith("on")){if(void 0!==node.attributes[name]){let eventName=name.substring(2),callback=generateCallback(node.element,name);node.element.addEventListener(eventName,callback),eventSubjects.set(node.element,node.attributes)}}else{let nodeValue;nodeValue=("class"===name||"style"===name)&&Array.isArray(node.attributes[name])?generateTruthyString(node.attributes[name]):node.attributes[name];let type=typeof nodeValue;"object"!==type&&"function"!==type&&("value"!==name&&!0===nodeValue?node.element.setAttribute(name,""):("value"===name||!1!==nodeValue&&null!=nodeValue)&&node.element.setAttribute(name,nodeValue))}}if(!node.attributes.html){for(let i=0;i<node.children.length;i++){let child=render(node.children[i],{svg});node.element.appendChild(child)}"select"===node.type&&(node.element.value=node.attributes.value)}return node.element}function updateAttributes(selector,currentAttributes,nextAttributes){let attributeNames=Object.keys({...currentAttributes,...nextAttributes});for(let name of attributeNames)if("debounce"!==name){if("ref"===name&&nextAttributes?.ref?.property)reref(nextAttributes,selector);else if("html"===name)nextAttributes[name]!==currentAttributes[name]&&(selector.innerHTML=nextAttributes[name],anchorableElement(selector));else if("checked"===name||"value"===name)nextAttributes[name]!==currentAttributes[name]&&nextAttributes[name]!==selector[name]&&(selector[name]=nextAttributes[name]);else if(name.startsWith("on")){let eventName=name.substring(2),eventNames=eventCallbacks.get(selector);if(eventNames){let callback=eventNames[name];callback&&!nextAttributes[name]?(selector.removeEventListener(eventName,callback),delete eventNames[name]):nextAttributes[name]&&(callback||selector.addEventListener(eventName,generateCallback(selector,name)),eventSubjects.set(selector,nextAttributes))}else selector.addEventListener(eventName,generateCallback(selector,name))}else{let currentValue,nextValue;currentValue=("class"===name||"style"===name)&&Array.isArray(currentAttributes[name])?generateTruthyString(currentAttributes[name]):currentAttributes[name],nextValue=("class"===name||"style"===name)&&Array.isArray(nextAttributes[name])?generateTruthyString(nextAttributes[name]):nextAttributes[name];let type=typeof nextValue;"object"!==type&&"function"!==type&&(void 0!==currentValue&&void 0===nextValue?selector.removeAttribute(name):currentValue!==nextValue&&("value"!==name&&!1===nextValue||null==nextValue?selector.removeAttribute(name):"value"!==name&&!0===nextValue?selector.setAttribute(name,""):selector.setAttribute(name,nextValue)))}}}function updateHeadChild(current,next){if(isUndefined(current)&&!isUndefined(next)){let nextSelector=render(next);client_client.head.append(nextSelector);return}if(!isUndefined(current)&&isUndefined(next)){current.element.remove();return}if(next.element=current.element,!(isFalse(current)&&isFalse(next))){if(current.type!==next.type){let nextSelector=render(next);current.element.replaceWith(nextSelector);return}updateAttributes(current.element,current.attributes,next.attributes)}}function updateHeadChildren(currentChildren,nextChildren){let limit=Math.max(currentChildren.length,nextChildren.length);for(let i=0;i<limit;i++)updateHeadChild(currentChildren[i],nextChildren[i])}function _rerender(current,next){let selector=current.element;if(next.element=current.element,!(isFalse(current)&&isFalse(next))){if(current.type!==next.type){let nextSelector=render(next);selector.replaceWith(nextSelector);return}if("textarea"===current.type){current.attributes.value=current.children[0].text,next.attributes.value=next.children[0].text,updateAttributes(selector,current.attributes,next.attributes);return}if(isText(current)&&isText(next)){current.text!==next.text&&(selector.textContent=next.text);return}if(!next.attributes.html){let limit=Math.max(current.children.length,next.children.length);if(next.children.length>current.children.length){for(let i=0;i<current.children.length;i++)_rerender(current.children[i],next.children[i]);for(let i=current.children.length;i<next.children.length;i++){let nextSelector=render(next.children[i]);selector.appendChild(nextSelector)}}else if(current.children.length>next.children.length){for(let i=0;i<next.children.length;i++)_rerender(current.children[i],next.children[i]);for(let i=current.children.length-1;i>=next.children.length;i--)selector.childNodes[i].remove()}else for(let i=limit-1;i>-1;i--)_rerender(current.children[i],next.children[i])}updateAttributes(selector,current.attributes,next.attributes)}}function rerender(){_rerender(client_client.virtualDom,client_client.nextVirtualDom),updateAttributes(client_client.body,client_client.currentBody,client_client.nextBody),updateHeadChildren(client_client.currentHead,client_client.nextHead),client_client.virtualDom=client_client.nextVirtualDom,client_client.nextVirtualDom=null,client_client.currentBody=client_client.nextBody,client_client.nextBody={},client_client.currentHead=client_client.nextHead,client_client.nextHead=[]}let client={};client.initialized=!1,client.initializer=null,client.instances={},client_context.instances=client.instances,client.initiationQueue=[],client.renewalQueue=[],client.hydrationQueue=[],client.realHydrationQueue=[],client.virtualDom={},client.selector=null,client.events={},client.generateContext=generateContext,client.renderQueue=null,client.currentBody={},client.nextBody={},client.currentHead=[],client.nextHead=[],client.head=document.head,client.body=document.body,client.update=async function update(){client.initialized&&(clearInterval(client.renderQueue),client.renderQueue=setTimeout(async()=>{let scope=client;scope.context=client_context,scope.plugins=loadPlugins(scope),client.initialized=!1,client.renewalQueue=[];try{client.nextVirtualDom=await generateTree(client.initializer(),scope),rerender(),client.processLifecycleQueues()}catch(e){client.skipHotReplacement=!0,console.error(e)}},16))},client.processLifecycleQueues=async function processLifecycleQueues(){client.initialized||(client.initialized=!0);let shouldUpdate=!1,shouldScroll=client_router._hash;for(;client.initiationQueue.length;){let instance=client.initiationQueue.shift();if(instance.initiate&&await instance.initiate(),instance.initiated=!0,instance.launch&&instance.launch(),shouldUpdate=!0,instance._attributes.route&&shouldScroll){let element=document.getElementById(client_router._hash);element&&element.scrollIntoView({behavior:"smooth"}),shouldScroll=!1}}for(shouldUpdate&&client.update(),shouldUpdate=!1;client.realHydrationQueue.length;){shouldUpdate=!0;let instance=client.realHydrationQueue.shift();instance.hydrate&&await instance.hydrate(),instance.hydrated=!0}for(shouldUpdate&&client.update(),shouldUpdate=!1;client.hydrationQueue.length;){shouldUpdate=!0;let instance=client.hydrationQueue.shift();client.realHydrationQueue.push(instance)}for(let key in shouldUpdate&&client.update(),client.instances){let instance=client.instances[key];client.renewalQueue.includes(instance)||instance.terminated||(instance.terminate&&await instance.terminate(),instance.persistent?instance.terminated=!0:delete client.instances[key])}client_router._changed=!1};let client_client=client,pool=[];function hydrateBody(selector,node){for(let element of(node?.attributes?.html&&anchorableElement(selector),node.element=selector,ref(node.attributes,selector),selector.childNodes))("TEXTAREA"===element.tagName||"textarea"===element.tagName)&&0===element.childNodes.length?element.appendChild(document.createTextNode("")):8===element.COMMENT_NODE&&"#"===element.textContent&&pool.push(element.remove());if(!node.children)return;let limit=node.children.length;for(let i=limit-1;i>-1;i--){if("head"!==node.type&&void 0===selector?.childNodes?.[i])throw console.error(`${node.type.toUpperCase()} expected tag ${node.children[i].type.toUpperCase()} to be child at index ${i} but instead found undefined. This error usually happens because of an invalid HTML hierarchy or changes in comparisons after serialization.`,selector),Error("Virtual DOM does not match the DOM.");hydrateBody(selector.childNodes[i],node.children[i])}}function hydrateHead(){for(let node of client_client.nextHead)isFalse(node)?(node.element=pool.pop()||document.createComment(""),client_client.head.append(node.element)):node.element=document.getElementById(node.attributes.id);pool=null}function hydrate(selector,node){hydrateBody(selector,node),hydrateHead()}let instanceProxies=new WeakMap,instanceProxyHandler={get(target,name,receiver){if("_isProxy"===name)return!0;if(target.constructor[name]?.name==="_invoke")return target.constructor[name].bind(target.constructor);if("function"==typeof target[name]&&"constructor"!==name){let proxy=instanceProxies.get(target);if(name.startsWith("_"))return target[name].bind(proxy);let{[name]:named}={[name]:args=>{let result;let scopedContext=generateContext({...target._attributes,...args});try{result=target[name].call(proxy,scopedContext)}catch(error){if(client_context.catch)client_context.catch(error);else throw error;return null}return result instanceof Promise?new Promise((resolve,reject)=>{result.then(resolve).catch(error=>{client_context.catch?client_context.catch(error):reject(error)})}):result}};return named}return Reflect.get(target,name,receiver)},set:(target,name,value)=>(name.startsWith("_")?target[name]=value:(target[name]=generateObjectProxy(name,value),client_client.update()),!0)};function invoke(name,hash){return async function _invoke(){let payload,params=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};client_worker.fetching=!0,Object.isFrozen(client_worker.queues[name])?client_worker.queues[name]=[params]:client_worker.queues[name]=[...client_worker.queues[name],params];let finalHash=hash===this.hash?hash:`${hash}-${this.hash}`,url=`${client_worker.api}/nullstack/${finalHash}/${name}.json`,body=JSON.stringify(params||{}),options={headers:client_worker.headers,mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer"};/get[A-Z]([*]*)/.test(name)?(options.method="GET",url+=`?payload=${encodeURIComponent(body)}`):(options.body=body,/patch[A-Z]([*]*)/.test(name)?options.method="PATCH":/put[A-Z]([*]*)/.test(name)?options.method="PUT":/delete[A-Z]([*]*)/.test(name)?options.method="DELETE":options.method="POST");try{let response=await fetch(url,options);client_page.status=response.status;let text=await response.text();payload=deserialize(text).result,client_worker.responsive=!0}catch(e){client_worker.responsive=!1}return client_worker.queues[name]?.length===1?delete client_worker.queues[name]:client_worker.queues[name]=client_worker.queues[name].filter(task=>task!==params),client_worker.fetching=!!Object.keys(client_worker.queues).length,payload}}let project={...state.project};delete state.project,Object.freeze(project);let settings={...state.settings};function client_defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}delete state.settings,Object.freeze(settings),client_context.page=client_page,client_context.router=client_router,client_context.settings=settings,client_context.worker=client_worker,client_context.params=params_proxy,client_context.project=project,client_context.environment=state.environment,client_client.memory=state.instances;let scope=client_client;scope.generateContext=generateContext,scope.context=client_context,client_client.plugins=loadPlugins(scope);class Nullstack{static start(Starter){return setTimeout(async()=>{if(window.addEventListener("popstate",()=>{client_router._popState()}),client_client.initializer)return client_client.initializer=()=>element_element(Starter),client_client.update(),this.context;if(client_client.routes={},updateParams(client_router.url),client_client.currentInstance=null,client_client.initializer=()=>element_element(Starter),client_client.selector=document.getElementById("application"),"spa"===environment.mode){scope.plugins=loadPlugins(scope),client_worker.online=navigator.onLine,"function"==typeof client_context.start&&await client_context.start(client_context),client_context.environment=environment,client_client.virtualDom=await generateTree(client_client.initializer(),scope);let body=render(client_client.virtualDom);client_client.selector.replaceWith(body),client_client.selector=body}else client_client.virtualDom=await generateTree(client_client.initializer(),scope),hydrate(client_client.selector,client_client.virtualDom),client_client.currentBody=client_client.nextBody,client_client.currentHead=client_client.nextHead,client_client.nextBody={},client_client.nextHead=[],client_context.environment=environment,scope.plugins=loadPlugins(scope),client_worker.online=navigator.onLine,"function"==typeof client_context.start&&await client_context.start(client_context),client_client.nextVirtualDom=await generateTree(client_client.initializer(),scope),rerender();client_client.processLifecycleQueues(),delete state.context},0),this.context}render(){return!1}constructor(){client_defineProperty(this,"prerendered",!1),client_defineProperty(this,"initiated",!1),client_defineProperty(this,"hydrated",!1),client_defineProperty(this,"terminated",!1),client_defineProperty(this,"key",null);let proxy=new Proxy(this,instanceProxyHandler);return instanceProxies.set(this,proxy),proxy}}client_defineProperty(Nullstack,"element",element_element),client_defineProperty(Nullstack,"invoke",invoke),client_defineProperty(Nullstack,"fragment",fragment),client_defineProperty(Nullstack,"use",useClientPlugins),client_defineProperty(Nullstack,"context",generateContext({}));let nullstack=Nullstack,DATA={name:"Daniel Cruz",username:"danielcruz",image:"https://avatars.githubusercontent.com/u/32555455?v=4",links:[{title:"GitHub",url:"https://github.com/ddanielcruz",image:"https://avatars.githubusercontent.com/u/32555455?v=4"},{title:"Nullstack",url:"https://nullstack.app/",image:"https://nullstack.app/favicon-96x96.png"},{title:"AE Studio",url:"https://ae.studio/",image:"https://ae.studio/img/ae.studio-logo.png"}],socials:[{id:"github",url:"https://github.com/ddanielcruz"},{id:"twitter",url:"https://twitter.com/danielcr_"},{id:"linkedin",url:"https://www.linkedin.com/in/daniel-cruz-53053816b/"}]};class Home extends nullstack{static hash="e7a049b09e57b74991358344645d36b7";prepare({page}){page.title=`${DATA.name} | Linktree`}render(){return nullstack.element("main",{class:"flex flex-col items-center py-16"},nullstack.element("img",{src:DATA.image,class:"w-24 h-24 rounded-full"}),nullstack.element("div",{class:"flex gap-1 items-center mt-4"},nullstack.element("h1",{class:"font-bold text-xl leading-[30px]"},"@",DATA.username),nullstack.element("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjUyNDcgMTUuMTIzNEM4LjIwMyAxNC45MjUxIDcuNzk3IDE0LjkyNTEgNy40NzUzIDE1LjEyMzRMNy4xNDg3MyAxNS4zMjQ3QzYuNjk0MiAxNS42MDQ4IDYuMDk5NzQgMTUuNDc4NSA1Ljc5ODQ1IDE1LjAzNzdMNS41ODE5OSAxNC43MjFDNS4zNjg3NSAxNC40MDkgNC45OTc4NSAxNC4yNDM4IDQuNjIzMzIgMTQuMjk0MUw0LjI0MzExIDE0LjM0NTJDMy43MTM5MiAxNC40MTYyIDMuMjIyMjYgMTQuMDU5IDMuMTI2MzEgMTMuNTMzOEwzLjA1NzM3IDEzLjE1NjRDMi45ODk0NyAxMi43ODQ3IDIuNzE3OCAxMi40ODMgMi4zNTUxOSAxMi4zNzY2TDEuOTg3MDkgMTIuMjY4NkMxLjQ3NDc1IDEyLjExODIgMS4xNzA4OCAxMS41OTE5IDEuMjk2ODcgMTEuMDczMUwxLjM4NzM4IDEwLjcwMDNDMS40NzY1NSAxMC4zMzMgMS4zNTEwOSA5Ljk0NjkyIDEuMDYzMSA5LjcwMjI0TDAuNzcwNzU3IDkuNDUzODVDMC4zNjM4NTIgOS4xMDgxMyAwLjMwMDMyNyA4LjUwMzczIDAuNjI2NDYyIDguMDgwOTZMMC44NjA3NzcgNy43NzcyMkMxLjA5MTYgNy40NzgwMSAxLjEzNDA0IDcuMDc0MjQgMC45NzA0NjggNi43MzM1OEwwLjgwNDQyNCA2LjM4Nzc2QzAuNTczMzE0IDUuOTA2NDMgMC43NjExMTQgNS4zMjg0NCAxLjIzMTAxIDUuMDc0ODhMMS41Njg2MSA0Ljg5MjdDMS45MDExNyA0LjcxMzI0IDIuMTA0MTcgNC4zNjE2NCAyLjA5MzMgMy45ODM5TDIuMDgyMjcgMy42MDA0NEMyLjA2NjkyIDMuMDY2NzIgMi40NzM1NyAyLjYxNTA5IDMuMDA1OTcgMi41NzQ1N0wzLjM4ODQ4IDIuNTQ1NDZDMy43NjUyOSAyLjUxNjc4IDQuMDkzNzUgMi4yNzgxNCA0LjIzNzQ2IDEuOTI4NjRMNC4zODMzNSAxLjU3Mzg1QzQuNTg2NCAxLjA4MDAyIDUuMTQxNiAwLjgzMjgzNiA1LjY0NDQ1IDEuMDEyMzdMNi4wMDU3MyAxLjE0MTM1QzYuMzYxNjMgMS4yNjg0MiA2Ljc1ODc1IDEuMTg0MDEgNy4wMzIxOSAwLjkyMzE3M0w3LjMwOTc4IDAuNjU4MzkxQzcuNjk2MTMgMC4yODk4NTIgOC4zMDM4NyAwLjI4OTg1MiA4LjY5MDIyIDAuNjU4MzkyTDguOTY3ODEgMC45MjMxNzNDOS4yNDEyNSAxLjE4NDAxIDkuNjM4MzcgMS4yNjg0MiA5Ljk5NDI3IDEuMTQxMzVMMTAuMzU1NSAxLjAxMjM3QzEwLjg1ODQgMC44MzI4MzYgMTEuNDEzNiAxLjA4MDAyIDExLjYxNjcgMS41NzM4NUwxMS43NjI1IDEuOTI4NjRDMTEuOTA2MyAyLjI3ODE0IDEyLjIzNDcgMi41MTY3OCAxMi42MTE1IDIuNTQ1NDZMMTIuOTk0IDIuNTc0NTdDMTMuNTI2NCAyLjYxNTA5IDEzLjkzMzEgMy4wNjY3MiAxMy45MTc3IDMuNjAwNDRMMTMuOTA2NyAzLjk4MzlDMTMuODk1OCA0LjM2MTY0IDE0LjA5ODggNC43MTMyNCAxNC40MzE0IDQuODkyN0wxNC43NjkgNS4wNzQ4OEMxNS4yMzg5IDUuMzI4NDQgMTUuNDI2NyA1LjkwNjQzIDE1LjE5NTYgNi4zODc3NkwxNS4wMjk1IDYuNzMzNThDMTQuODY2IDcuMDc0MjQgMTQuOTA4NCA3LjQ3ODAxIDE1LjEzOTIgNy43NzcyMkwxNS4zNzM1IDguMDgwOTZDMTUuNjk5NyA4LjUwMzczIDE1LjYzNjEgOS4xMDgxMyAxNS4yMjkyIDkuNDUzODVMMTQuOTM2OSA5LjcwMjI0QzE0LjY0ODkgOS45NDY5MiAxNC41MjM0IDEwLjMzMyAxNC42MTI2IDEwLjcwMDNMMTQuNzAzMSAxMS4wNzMxQzE0LjgyOTEgMTEuNTkxOSAxNC41MjUzIDEyLjExODIgMTQuMDEyOSAxMi4yNjg2TDEzLjY0NDggMTIuMzc2NkMxMy4yODIyIDEyLjQ4MyAxMy4wMTA1IDEyLjc4NDcgMTIuOTQyNiAxMy4xNTY0TDEyLjg3MzcgMTMuNTMzOEMxMi43Nzc3IDE0LjA1OSAxMi4yODYxIDE0LjQxNjIgMTEuNzU2OSAxNC4zNDUyTDExLjM3NjcgMTQuMjk0MUMxMS4wMDIxIDE0LjI0MzggMTAuNjMxMyAxNC40MDkgMTAuNDE4IDE0LjcyMUwxMC4yMDE1IDE1LjAzNzdDOS45MDAyNiAxNS40Nzg1IDkuMzA1OCAxNS42MDQ4IDguODUxMjcgMTUuMzI0N0w4LjUyNDcgMTUuMTIzNFoiIGZpbGw9IiMwMEI2RkYiLz4KPHBhdGggZD0iTTUuMDY5OTggNy41NjI2NUw3LjE5MTMgOS42ODM5N0wxMS40MzM5IDUuNDQxMzMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K",alt:"verified"})),nullstack.element("div",{class:"flex flex-col gap-4 w-full max-w-2xl mt-8 px-4"},DATA.links.map(link=>nullstack.element("a",{href:link.url,class:"flex items-center bg-white shadow-sm p-1",target:"_blank"},nullstack.element("div",{class:"h-12 w-12"},link.image&&nullstack.element("img",{src:link.image,alt:link.title,class:"rounded-sm"})),nullstack.element("h2",{class:"w-full text-center -ml-12 font-medium text-gray-900 text-sm"},link.title)))),nullstack.element("div",{class:"flex mt-8 gap-4"},DATA.socials.map(social=>nullstack.element("a",{href:social.url,target:"_blank"},nullstack.element("img",{src:`/icons/${social.id}.svg`,alt:social.id,class:"h-10 w-10"})))))}}class Application extends nullstack{static hash="f19980a0ba1e7d540e72c85bba3f57a7";prepare({page}){page.locale="en-US",page.title="Daniel Cruz | Linktree"}render(){return nullstack.element("body",null,nullstack.element(Home,{route:"/"}))}}let client_context_0=nullstack.start(Application);client_context_0.start=async function start(){};let{worker:client_worker_0}=client_context_0;client_worker_0.cdn="https://github.com/ddanielcruz/nullstack-linktree"})();
//# sourceMappingURL=client.js.map