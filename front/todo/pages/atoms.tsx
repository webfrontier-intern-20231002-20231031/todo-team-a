import { atom } from "recoil";

export const todoListState = atom({
    key: "todoListState",
    default: "",
});

export const loadingState = atom({
    key: "loadingState",
    default: false,
});

export const updateFlagState = atom({
    key: "updateFlagState",
    default: true,
});

export const deleteFlagState = atom({
    key: "deleteFlagState",
    default: true,
});