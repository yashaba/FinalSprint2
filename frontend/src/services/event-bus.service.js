import Vue from 'vue'
export const SHOW_MSG = 'show-msg';
export const SHOW_DETAILS = 'show-details';
export const SHOW_EDIT_TASK = 'show-edit-task'
export const UPDATE_BOARD = 'update-board';
export const SCREEN_MODE = 'screen-mode';
export const STOP_SCREEN_MODE = 'stop-screen-mode';

export const eventBus = new Vue();