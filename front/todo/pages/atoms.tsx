import { atom } from "recoil";

export const todoListState = atom({
    key: "todoListState",
    default: "",
});

export const loadingState = atom({
    key: "loadingState",
    default: false,
});