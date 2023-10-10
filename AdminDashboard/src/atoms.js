import { atom } from "recoil";

export const listState = atom({ key: "list", default: [] });

export const updateState = atom({ key: "update", default: false });

export const loggedState = atom({ key: "logged", default: false });
