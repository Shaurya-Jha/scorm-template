"use client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// atom to manage current module learning
export const currentModuleAtom = atom<number | null>(null);

// atom to manage music and sfx volume globally
export const musicVolumeAtom = atomWithStorage<number>("musicVolume", 0.08);
export const sfxVolumeAtom = atomWithStorage<number>("sfxVolume", 1);


export const postAssessmentAnswersAtom = atom<string[]>([]);
export const priorityAssessmentAnswersAtom = atom<string[]>([]);
export const timeCompressionAnswersAtom = atom<string[]>([]);

// atom to manage the modules and check if they are completed or not
export const completedModulesAtom = atom<Record<number, boolean>>({});