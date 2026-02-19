"use client";

import VoiceOver from "../../components/VoiceOver";
import type { CourseModuleViewProps } from "..";
import TimeManagementVoiceOverModal from "./voice-over-modal";
import { useState } from "react";
import { useAtom } from "jotai";
import { CheckIcon, XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { priorityAssessmentAnswersAtom } from "../../../lib/store";

const PRIORITY_ITEMS = [
  "Respond to client email",
  "Mail urgent report to the team manager",
  "Join team meeting happening later today",
  "Prepare weekly presentation (due in 3 days)",
  "Clean up old files on laptop",
];

export function PrioritizationActivity(props: CourseModuleViewProps) {
  const { assets } = props;
  const [answers, setAnswers] = useAtom(priorityAssessmentAnswersAtom);
  const [viewingAnswers, setViewingAnswers] = useState(false);

  // jumble items (used useState instead of useMemo due to react 19's component purity error)
  const [items] = useState(() =>
    PRIORITY_ITEMS.sort(() => Math.random() - 0.5),
  );

  // const priorityItems = [
  //   "Respond to client email",
  //   "Mail urgent report to the team manager",
  //   "Join team meeting happening later today",
  //   "Prepare weekly presentation (due in 3 days)",
  //   "Clean up old files on laptop",
  // ];

  // jumble items
  // const items = useMemo(
  //   () => priorityItems.sort(() => Math.random() - 0.5),
  //   []
  // );

  const unorderedItems = items.filter((item) => !answers.includes(item));

  const allPlaced = answers.filter((i) => !!i).length === PRIORITY_ITEMS.length;

  function handleDrop(e: React.DragEvent, slotIndex: number) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (!itemId) return;

    // if an item is already placed in this slot, replace it
    const newAnswers = [...answers];
    newAnswers[slotIndex] = itemId;
    setAnswers(newAnswers);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleRemoveFromSlot(slotIndex: number) {
    setAnswers(
      (ans) => ans.map((a, i) => (i === slotIndex ? undefined : a)) as string[],
    );
  }

  function handleDragStart(e: React.DragEvent, itemId: string) {
    e.dataTransfer.setData("text/plain", itemId);
    e.dataTransfer.effectAllowed = "move";
  }

  const isCorrectOrder = PRIORITY_ITEMS.every(
    (item, index) => item === answers[index],
  );

  return (
    <>
      {viewingAnswers && isCorrectOrder && (
        <VoiceOver data={assets.prioritizationCorrectAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Good work detective. Mia's dilemma has been resolved. Now she can prioritise her work and be back to her productive self. It is now time to move on to our next case."
            />
          )}
        </VoiceOver>
      )}
      {viewingAnswers && !isCorrectOrder && (
        <VoiceOver data={assets.prioritizationIncorrectAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Good try, but we are not quite there yet. Your priority list needs some adjustments. I know you can do this."
            />
          )}
        </VoiceOver>
      )}
      <VoiceOver data={assets.prioritizationVoiceOver}>
        {(props) => (
          <TimeManagementVoiceOverModal
            {...props}
            operatorAsset={assets.operator}
            text="You have to solve Mia's dilemma by fixing her priorities. In front of you are items from Mia's todo list. You have to arrange them from the highest to the lowest in priority."
          />
        )}
      </VoiceOver>

      <div
        className="h-full px-4"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('${assets.prioritizationBackground}') center/cover no-repeat`,
        }}
      >
        <div className="flex justify-between w-full gap-6">
          {/* Left: available items */}
          <div className="flex-1 p-6">
            <p className="font-bold text-xl">
              Drag and drop these tasks in the order of highest to lowest
              priorty
            </p>
            <div className="flex flex-col gap-3 mt-10">
              {unorderedItems.map((item, id) => (
                <div
                  key={id}
                  className="w-80 bg-neutral-200 text-black py-2 px-4 cursor-grab"
                  onDragStart={(e) => handleDragStart(e, item)}
                  draggable
                  role="button"
                >
                  {item}
                </div>
              ))}
              {allPlaced && !viewingAnswers && (
                <div>
                  <button onClick={() => setViewingAnswers(true)}>
                    Continue <CheckIcon />
                  </button>
                </div>
              )}
              {viewingAnswers && !isCorrectOrder && (
                <div>
                  <button
                    onClick={() => {
                      setViewingAnswers(false);
                      setAnswers([]);
                    }}
                  >
                    Retry
                  </button>
                </div>
              )}
              {/*{viewingAnswers && isCorrectOrder && (
                <div>
                  <button
                    onClick={() => {
                      setCurrentModule((prev) => prev! + 1);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              )}*/}
            </div>
          </div>

          {/* Right: ordered slots */}
          <div className="shrink-0 relative animate-hover w-[40%] px-[5%] pt-[9%]">
            <img
              src={assets["clipboard"]}
              alt="Clipboard"
              className="w-full -z-10 absolute top-0 left-0 pointer-events-none -translate-y-15"
            />
            <div>
              <h2 className="font-semibold mb-5 text-black text-3xl text-center">
                Mia's To Do List
              </h2>
            </div>
            <div className="flex flex-col text-black border-t border-t-gray-300">
              {Array.from({ length: 5 }).map((_, idx) => {
                const answer = answers[idx] as string | undefined;
                const isCorrect = answer === PRIORITY_ITEMS[idx];

                return (
                  <div
                    key={idx}
                    className={twMerge(
                      "flex items-center border-b py-2 border-b-gray-300 gap-3",
                      viewingAnswers &&
                        (isCorrect ? "bg-green-100" : "bg-red-100"),
                    )}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                  >
                    <div className="text-sm font-medium text-center">
                      #{idx + 1}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      {answer ? (
                        <>
                          <div className="text-sm">{answer}</div>
                          {!viewingAnswers && (
                            <button
                              onClick={() => handleRemoveFromSlot(idx)}
                              className="ml-2 mr-2 h-6 w-6 flex items-center justify-center hover:text-gray-500 transition-all"
                            >
                              <span className="text-xs font-bold">
                                <XIcon size={16} />
                              </span>
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Drop here</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
