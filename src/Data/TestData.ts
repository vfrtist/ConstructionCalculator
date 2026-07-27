import { newProject, duplicateProject } from "@/lib/objects";
import { ProjectBoards } from "@/lib/structures";

const Data1: ProjectBoards = {
	[crypto.randomUUID()]: {
		name: "Two by Four",
		boardLength: 96,
		cutInputs: [
			{ id: crypto.randomUUID(), length: 93, name: "", qty: 6 },
			{ id: crypto.randomUUID(), length: 48, name: "", qty: 6 },
			{ id: crypto.randomUUID(), length: 72, name: "", qty: 14 },
			{ id: crypto.randomUUID(), length: 45, name: "", qty: 11 },
			{ id: crypto.randomUUID(), length: 17, name: "", qty: 6 },
			{ id: crypto.randomUUID(), length: 24, name: "", qty: 4 },
			{ id: crypto.randomUUID(), length: 9, name: "", qty: 7 },
			{ id: crypto.randomUUID(), length: 21, name: "", qty: 16 },
			{ id: crypto.randomUUID(), length: 4, name: "", qty: 11 },
			{ id: crypto.randomUUID(), length: 40.5, name: "", qty: 4 },
			{ id: crypto.randomUUID(), length: 79, name: "", qty: 1 },
			{ id: crypto.randomUUID(), length: 39.5, name: "", qty: 2 },
			{ id: crypto.randomUUID(), length: 20, name: "", qty: 6 },
		],
	},

	[crypto.randomUUID()]: {
		name: "Two by Six",
		boardLength: 144,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 144,
				name: "Porch Roof Front Trim",
				qty: 1,
			},
			{
				id: crypto.randomUUID(),
				length: 72,
				name: "Roof Base Trim",
				qty: 1,
			},
			{
				id: crypto.randomUUID(),
				length: 36,
				name: "Upper Wall Base Trim",
				qty: 2,
			},
		],
	},

	[crypto.randomUUID()]: {
		name: "One by Four",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 93,
				name: "Porch Roof Front Trim",
				qty: 6,
			},
			{
				id: crypto.randomUUID(),
				length: 48,
				name: "Roof Base Trim",
				qty: 6,
			},
			{
				id: crypto.randomUUID(),
				length: 72,
				name: "Upper Wall Base Trim",
				qty: 14,
			},
		],
	},
	[crypto.randomUUID()]: {
		name: "One by Four",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 25,
				name: "Floor Board",
				qty: 40,
			},
		],
	},
};

const Data2: ProjectBoards = {
	[crypto.randomUUID()]: {
		name: "Four by Four",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 90,
				name: "Porch Supports",
				qty: 4,
			},
		],
	},

	[crypto.randomUUID()]: {
		name: "Trim Boards",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 25.25,
				name: "Upper Wall Side Trim",
				qty: 2,
			},
			{
				id: crypto.randomUUID(),
				length: 77.5,
				name: "Lower Wall Side Trim",
				qty: 2,
			},
		],
	},

	[crypto.randomUUID()]: {
		name: "One by Two",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 29,
				name: "Window Trim Rails",
				qty: 4,
			},
			{
				id: crypto.randomUUID(),
				length: 36,
				name: "Window Trim Stiles",
				qty: 4,
			},
			{
				id: crypto.randomUUID(),
				length: 31,
				name: "Window Sills",
				qty: 2,
			},
			{ id: crypto.randomUUID(), length: 48, name: "Door Rail", qty: 1 },
			{
				id: crypto.randomUUID(),
				length: 71.5,
				name: "Door Stiles",
				qty: 2,
			},
		],
	},

	[crypto.randomUUID()]: {
		name: "Battens",
		boardLength: 96,
		cutInputs: [
			{
				id: crypto.randomUUID(),
				length: 25.25,
				name: "Upper Wall Short",
				qty: 2,
			},
			{
				id: crypto.randomUUID(),
				length: 37.125,
				name: "Upper Wall Long",
				qty: 3,
			},
			{
				id: crypto.randomUUID(),
				length: 16.25,
				name: "Above Window",
				qty: 2,
			},
			{
				id: crypto.randomUUID(),
				length: 19.5,
				name: "Below Window",
				qty: 2,
			},
			{
				id: crypto.randomUUID(),
				length: 3.5,
				name: "Above Door",
				qty: 3,
			},
		],
	},
};

export const DemoTemplate = duplicateProject(
	newProject("Demo", "", { ...Data1, ...Data2 }),
);
