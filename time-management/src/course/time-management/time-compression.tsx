"use client";

import VoiceOver from "../../components/VoiceOver";
import type { CourseModuleViewProps } from "..";
import TimeManagementVoiceOverModal from "./voice-over-modal";
import { Fragment, useState } from "react";
import { useAtom } from "jotai";
import {
  BriefcaseBusinessIcon,
  CheckIcon,
  HeadsetIcon,
  MailIcon,
  PhoneIcon,
  PresentationIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { timeCompressionAnswersAtom } from "../../../lib/store";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

function shuffle<T>(input: T[]): T[] {
  const array = [...input];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i * 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function TimeCompressionActivity(props: CourseModuleViewProps) {
  const { assets, next } = props;
  const [answers, setAnswers] = useAtom(timeCompressionAnswersAtom);
  const [viewingAnswers, setViewingAnswers] = useState(false);

  const blueColor = "bg-blue-800 border-blue-600";
  const redColor = "bg-pink-800 border-pink-600";
  const greenColor = "bg-green-800 border-green-600";

  const tasks = [
    {
      name: "Team sync",
      duration: 40,
      color: redColor,
      icon: <UsersIcon />,
    },
    {
      name: "Responding to emails",
      duration: 20,
      color: redColor,
      icon: <MailIcon />,
    },
    {
      name: "Working on a project deliverable",
      duration: 80,
      color: greenColor,
      icon: <BriefcaseBusinessIcon />,
    },
    {
      name: "Project Demo",
      duration: 20,
      color: greenColor,
      icon: <PresentationIcon />,
    },
    {
      name: "Taking interviews",
      duration: 80,
      color: blueColor,
      icon: <HeadsetIcon />,
    },
    {
      name: "Client calls",
      duration: 40,
      color: blueColor,
      icon: <PhoneIcon />,
    },
  ];

  // jumble items
  const [items] = useState(() => shuffle(tasks));
  // const items = useMemo(() => {
  //   const array = [...tasks];
  //   let currentIndex = array.length;

  //   // While there remain elements to shuffle...
  //   while (currentIndex != 0) {
  //     // Pick a remaining element...
  //     const randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }, []);

  const allPlaced = answers.filter((i) => !!i).length === items.length;

  const isCorrectOrder = tasks.every(
    (item, index) => item.name === answers[index],
  );

  const toHuman = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
  };

  const totalTimeRaw = items.reduce((acc, item) => acc + item.duration, 0);
  const breakTime = 30;
  const totalTime = totalTimeRaw + breakTime;

  return (
    <>
      {viewingAnswers && isCorrectOrder && (
        <VoiceOver data={assets.timeAssessmentCorrectAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Good job. Orion's schedule has been fixed. He can now cruise through his work day without worrying about compressed deadlines."
            />
          )}
        </VoiceOver>
      )}
      {viewingAnswers && !isCorrectOrder && (
        <VoiceOver data={assets.timeAssessmentIncorrectAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="You are almost there. This timeline needs some fixing, but we are making progress."
            />
          )}
        </VoiceOver>
      )}
      <VoiceOver data={assets.timeCompressionVoiceOver}>
        {(props) => (
          <TimeManagementVoiceOverModal
            {...props}
            operatorAsset={assets.operator}
            text="We need to reorder Orion's schedule for him to relax and go back to his productive self. Organise Orion's tasks for the day by following the 1.5 rule, grouping similar tasks together, and adding breaks in between."
          />
        )}
      </VoiceOver>

      <div
        className="h-full p-8 flex flex-col justify-between gap-8 overflow-auto"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('${assets.timeCompressionBackground}') center/cover no-repeat`,
        }}
      >
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Arrange Orion's tasks in his timeline
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "p-4 rounded-md text-white border-2",
                  item.color,
                )}
              >
                <div className="font-bold">
                  {item.icon}
                  <div className="mt-1">{item.name}</div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-white rounded-full py-0.5 px-2 text-black inline-block text-xs">
                    {item.color === redColor
                      ? "Chores"
                      : item.color === greenColor
                        ? "Focused Work"
                        : "Conference"}
                  </div>
                  <div className="text-xs">
                    Duration: {toHuman(item.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 justify-between">
            <div className="text-sm mb-4">
              Click on the slots below to assign tasks to Orion's timeline. Make
              sure to
              <ol className="list-decimal list-inside ml-1">
                <li>
                  Follow the 1.5 rule: Allocate 1.5 times the estimated duration
                  for each task.
                </li>
                <li>Group similar tasks together to improve efficiency.</li>
                <li>Include breaks to help Orion recharge.</li>
              </ol>
            </div>
            <div className="flex items-center gap-2">
              {allPlaced && !viewingAnswers && (
                <Button
                  disabled={!allPlaced}
                  onClick={() => setViewingAnswers(true)}
                >
                  Submit
                </Button>
              )}
              {viewingAnswers && isCorrectOrder && (
                <Button
                  // onClick={() => setCurrentModule((curr) => (curr || 0) + 1)}
                  onClick={() => next}
                >
                  Proceed <CheckIcon className="size-4" />
                </Button>
              )}
              <Button
                variant={"secondary"}
                onClick={() => {
                  setAnswers([]);
                  setViewingAnswers(false);
                }}
              >
                Reset <XIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="w-full bg-white/20 backdrop-blur-2xl rounded-xl flex items-center h-15 py-1">
            {tasks.map((slot, index) => (
              <Fragment key={index}>
                <Select
                  value={answers[index]}
                  onChange={(val) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = val;
                    setAnswers(newAnswers);
                  }}
                  options={items
                    .filter((i) => !answers.includes(i.name))
                    .map((item) => ({
                      value: item.name,
                      label: (
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.name}
                        </div>
                      ),
                    }))}
                  renderTrigger={(selected) => (
                    <Button
                      className={twMerge(
                        "pl-1 h-full rounded-lg cursor-pointer",
                        index === items.length - 1 && "pr-1",
                      )}
                      style={{
                        width: (slot.duration / totalTime) * 100 + "%",
                      }}
                    >
                      <div
                        className={twMerge(
                          "bg-white/40 h-full rounded-md flex flex-col items-center justify-center",
                          answers[index] &&
                            tasks.find((t) => t.name === answers[index])?.color,
                          viewingAnswers &&
                            tasks.find((t) => t.name === answers[index])
                              ?.name !== slot.name &&
                            "border-2 border-red-500",
                        )}
                      >
                        {selected && (
                          <div className="text-sm font-semibold">
                            {tasks.find((t) => t.name === selected.value)?.icon}
                          </div>
                        )}

                        <div className="text-xs">
                          {toHuman(slot.duration * 1.5)}
                        </div>
                      </div>
                    </Button>
                  )}
                />

                {(index === 1 || index === 3) && (
                  <div
                    className="text-xs text-center"
                    style={{
                      width: (15 / totalTime) * 100 + "%",
                    }}
                  >
                    Break
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
