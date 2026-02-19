import type React from "react";
import { TIME_MANAGEMENT_COURSE } from "./time-management";

export type Course = {
  id: string;
  title: string;
  modules: Module[];
  backgroundMusic?: string;
};

export type Module = {
  title: string;
  assets: {
    [key: string]: string;
  };
} & (
  | {
      type: "video";
      videoUrl: string;
      subtitles?: string;
    }
  | {
      type: "view";
      view: (props: CourseModuleViewProps) => React.ReactNode;
    }
);

export interface CourseModuleViewProps {
  assets: { [key: string]: string };
  // setCurrentModule: React.Dispatch<React.SetStateAction<number | null>>;
  currentModule: number | null;
  
  // gated unified controls
  complete: () => void;
  next: () => void;
  completeAndNext: () => void;
  goTo: (index: number) => void;
}

export const COURSE = TIME_MANAGEMENT_COURSE;
