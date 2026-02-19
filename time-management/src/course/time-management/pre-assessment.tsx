import { Quiz } from "../../components/Quiz";
import type { CourseModuleViewProps } from "..";
import { selfAssessmentAnswersAtom, selfAssessmentQuestions } from ".";
import { useAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import VoiceOver from "../../components/VoiceOver";
import TimeManagementVoiceOverModal from "./voice-over-modal";

export default function PreAssessment(props: CourseModuleViewProps) {
  const [selfAssessmentAnswers, setSelfAssessmentAnswers] = useAtom(
    selfAssessmentAnswersAtom
  );

  const { assets } = props;

  if (selfAssessmentAnswers.length < 5)
    return (
      <>
        <VoiceOver data={assets.preAssessmentVoiceOver}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Before you begin investigating Alex’s patterns, let’s uncover your own. Answer these quick questions to establish your Time Mirror baseline."
            />
          )}
        </VoiceOver>
        <div
          className="p-10 flex items-start justify-center h-full"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('${assets.preAssessmentBackground}') center/cover no-repeat`,
          }}
        >
          <div className="w-55 shrink-0">
            <h2 className="text-2xl font-black mb-4">
              Lets create your Time Mirror
            </h2>
            <img
              src={assets.timeMirror}
              alt="Time Mirror"
              className="w-full animate-hover"
            />
          </div>
          <Quiz
            questions={selfAssessmentQuestions}
            onEnd={(answers) => {
              setSelfAssessmentAnswers(answers);
            }}
          />
        </div>
      </>
    );

  return <PreAssessmentReport {...props} />;
}

export function PreAssessmentReport(props: CourseModuleViewProps) {
  const { assets, next, complete } = props;

  const [selfAssessmentAnswers, setSelfAssessmentAnswers] = useAtom(
    selfAssessmentAnswersAtom
  );

  const selfAssessmentScores = selfAssessmentQuestions.map(
    (question, idx) => 4 - question.options.indexOf(selfAssessmentAnswers[idx])
  );

  const score = (selfAssessmentScores.reduce((a, b) => a + b, 0) / 20) * 100;

  return (
    <>
      <VoiceOver data={assets.preAssessmentResultVoiceOver}>
        {(props) => (
          <TimeManagementVoiceOverModal
            {...props}
            operatorAsset={assets.operator}
            text="Your results reflect your current habits. Keep them in mind — the upcoming activities will help you sharpen your approach."
          />
        )}
      </VoiceOver>
      <div
        className="w-full flex items-center flex-col overflow-hidden h-full"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('${assets.preAssessmentBackground}') center/cover no-repeat`,
        }}
      >
        <h2 className="text-2xl font-black mb-1 mt-6">
          This is your starting point.
        </h2>
        <p className="px-10 text-center text-sm mb-2">
          Time management begins with awareness. This score will be compared
          with your post-assessment to show your growth.
        </p>

        <div className="w-[70%] animate-hover relative pt-[14%] px-[14%]">
          <img
            src={assets.timeMirror}
            alt="Operator"
            className="inset-0 w-full absolute -z-10"
          />
          <div className="text-center text-xl flex items-center justify-center flex-col">
            <div>You are already</div>
            <div className="text-7xl text-pink-400 font-bold">
              {score.toFixed(0)}%
            </div>
            <div>proficient in time management</div>
            <div className="text-sm mt-4">
              {score > 50
                ? "You are on the right track!"
                : "Let's work to improve this!"}
            </div>
            <button
              // onClick={() => setCurrentModule(currentModule! + 1)}
              onClick={() => {
                complete();
                next()
              }}
              className="bg-blue-600/50 border-2 text-blue-200 font-bold border-blue-400 shadow-xl hover:bg-blue-500/50 shadow-blue-500/20 backdrop-blur-2xl rounded-xl py-2 px-4 flex items-center justify-center mt-4"
            >
              Continue <ArrowRight />
            </button>
            <button
              onClick={() => setSelfAssessmentAnswers([])}
              className="mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}