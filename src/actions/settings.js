/* @flow */

import ReduxThunk from 'redux-thunk'

export const LOGIN_PASSWORD = 'LOGIN_PASSWORD'
export const loginPassword = (username: string, password: string) => {
	return {
		type: LOGIN_PASSWORD,
		username,
		password
	}
}

export const LOGIN_DISCOVERY = 'LOGIN_DISCOVERY'
export const loginDiscovery = () => {
	return dispatch => {

		dispatch(startLoginDiscovery())

		spotcontrol.startDiscovery().then(blob => {
			dispatch(loginDiscoverySuccess(blob))
		})
	}
}

export const START_LOGIN_DISCOVERY = 'START_LOGIN_DISCOVERY'
export const startLoginDiscovery = () => {
	return {
		type: START_LOGIN_DISCOVERY
	}
}

export const LOGOUT = 'LOGOUT'
export const logout = () => {
	return {
		type: LOGOUT
	}
}

export const LOGIN_DISCOVERY_SUCCESS = 'LOGIN_DISCOVERY_SUCCESS'
export const loginDiscoverySuccess = (blob: string) => {
	return {
		type: LOGIN_DISCOVERY_SUCCESS,
		blob
	}
}

export const LOGIN_SUCESS = 'LOGIN_SUCCESS'
export const loginSuccess = () => {
	return {
		type: LOGIN_SUCESS
	}
}




type action<T, actionType: string> =
	{ meta: "actionSucces", payload: T, type: actionType} |
	{ meta: "actionError", payload: Error, error: true, type: actionType} |
	{ meta: "actionStarted", type: actionType}

type a1 =
{ meta: "actionSucces", foo: string} |
{ meta: "actionError", bar: string}

type a2 =
{ meta: "actionSucces1", foo1: string} |
{ meta: "actionError2", bar1: string}

type a3 = a1 | a2

type act = action<string, "ACT_TYP">
type act2 = action<boolean, "ACT_TYP2">

type aTest = act | act2

type asyncAction<actionType: string, T> =
	{type: actionType, payload: T, status: string}

type actionMix =
	asyncAction<"getPosts", string> |
	asyncAction<"getTest", boolean>

function processActionMix(a: actionMix) : string {
	if (a.type === "getPosts") {
		return a.payload
	} else {
		return a.payload
	}
}


// function genericTypes(action: aTest) : string {
// 	switch(action.type){
// 		case "ACT_TYP" :
// 			return action.payload
// 		case "ACT_TYP2":
// 			return action.payload
// 	}
// }

function recursiveTypes(action: a3) : string {
	switch(action.meta){
		case "actionSucces" :
			return action.foo
		case "actionSucces1" :
			return action.foo1
		case "actionError2" :
			return action.bar1
		default  :
			return action.bar
	}
}

function handleAction(action: act, action2: action) : string {
	if (action2.type === "ACT_TYP2" && action2.meta === "actionSucces"){
		return action2.payload
	} else {
		return "123"
	}

	// if (action.meta === "actionSucces") {
	// 	return action.payload
	// } else {
	// 	let t1 : act  = {meta: "actionError", payload:  new Error("bad"), error: true, type: "ACT_TYP"}
	// 	return "hi"
	// }

}

type BinaryTree =
  { kind: "leaf", value: number } |
  { kind: "branch", left: BinaryTree, right: BinaryTree }

function sumLeaves(tree: BinaryTree): number {
  if (tree.kind === "leaf") {
    return tree.value;
  } else {
    return sumLeaves(tree.left) + sumLeaves(tree.right);
  }
}
