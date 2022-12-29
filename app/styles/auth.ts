import { button as btn } from "./globals";

export const screen =
	"absolute w-screen h-screen flex justify-center items-center left-0 z-20 bg-slate-300 ";

export const modal =
	"bg-slate-100 shadow-md rounded-md w-9/12 max-w-sm p-3 gap-2 flex flex-col justify-between items-center ";

export const title = "text-base font-semibold text-slate-500 ";

export const label = "text-start w-full font-medium text-slate-500 ";

export const inputContainer =
	"flex w-full h-9 rounded-md transition-all items-center pr-2 ";

export const buttonsGroup =
	"flex w-full h-24 md:h-fit md:my-3 flex-col md:flex-row items-center justify-around ";

export const button = btn + " md:w-1/3 ";

export const input =
	"outline-none w-full bg-transparent transition-all rounded-md p-2 pr-0";
