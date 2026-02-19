import { Quiz } from "../../components/Quiz";
import { type CourseModuleViewProps } from "../index";
import { selfAssessmentAnswersAtom, selfAssessmentQuestions } from ".";
import { useAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import VoiceOver from "../../components/VoiceOver";
import TimeManagementVoiceOverModal from "./voice-over-modal";
import { postAssessmentAnswersAtom } from "../../../lib/store";

export default function PostAssessment(props: CourseModuleViewProps) {
  const [postAssessmentAnswers, setPostAssessmentAnswers] = useAtom(
    postAssessmentAnswersAtom
  );

  const [selfAssessmentAnswers] = useAtom(selfAssessmentAnswersAtom);

  if (!selfAssessmentAnswers.length) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center">
        Please complete the pre-assessment first.
      </div>
    );
  }

  const { assets } = props;

  if (postAssessmentAnswers.length < 5)
    return (
      <>
        <VoiceOver data={assets.postAssessmentVoiceOver}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Good job detective, we have solved our cases for the day, but there will always be more. It is now time for us to come back to our time mirror. Let's see if your time awareness has gotten any better."
            />
          )}
        </VoiceOver>
        <div
          className="p-10 flex items-start justify-center h-full"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('${assets.postAssessmentBackground}') center/cover no-repeat`,
          }}
        >
          <div className="w-55 shrink-0">
            <h2 className="text-2xl font-black mb-4">
              Let's re-evaluate your Time Mirror
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
              setPostAssessmentAnswers(answers);
            }}
          />
        </div>
      </>
    );

  return <PostAssessmentReport {...props} />;
}

export function PostAssessmentReport(props: CourseModuleViewProps) {
  const { assets, complete, next } = props;
  const [postAssessmentAnswers, setPostAssessmentAnswers] = useAtom(
    postAssessmentAnswersAtom
  );

  const [selfAssessmentAnswers] = useAtom(
    selfAssessmentAnswersAtom
  );

  const selfAssessmentScores = selfAssessmentQuestions.map(
    (question, idx) => 4 - question.options.indexOf(selfAssessmentAnswers[idx])
  );

  const postAssessmentScores = selfAssessmentQuestions.map(
    (question, idx) => 4 - question.options.indexOf(postAssessmentAnswers[idx])
  );

  const preScore = (selfAssessmentScores.reduce((a, b) => a + b, 0) / 20) * 100;
  const postScore =
    (postAssessmentScores.reduce((a, b) => a + b, 0) / 20) * 100;

  return (
    <>
      {preScore - 1 < postScore && (
        <VoiceOver data={assets.postAssessmentPassAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="Splendid! By solving these cases, you have become better in managing your time. Remember, there is always room for improvement, and you seem like one to keep striving for better. My work here is done. Until next time."
            />
          )}
        </VoiceOver>
      )}
      {preScore >= postScore && (
        <VoiceOver data={assets.postAssessmentFailAudio}>
          {(props) => (
            <TimeManagementVoiceOverModal
              {...props}
              operatorAsset={assets.operator}
              text="It seems like your time awareness hasn't improved as expected. Don't be discouraged; time management is a skill that takes practice. Consider revisiting the course materials and trying the assessments again to enhance your skills."
            />
          )}
        </VoiceOver>
      )}
      <div
        className="w-full flex items-center flex-col overflow-hidden h-full"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('${assets.preAssessmentBackground}') center/cover no-repeat`,
        }}
      >
        <h2 className="text-2xl font-black mb-1 mt-6">
          {preScore - 1 < postScore
            ? "You've improved your time management skills."
            : "Keep Practicing! Time management is a skill that takes time to master."}
        </h2>

        <div className="w-[70%] animate-hover relative pt-[14%] px-[14%]">
          <img
            src={assets.timeMirror}
            alt="Operator"
            className="inset-0 w-full absolute -z-10"
          />
          <div className="text-center text-xl flex items-center justify-center flex-col">
            <div>You scored</div>
            <div className="text-7xl text-pink-400 font-bold">
              {postScore.toFixed(0)}%
            </div>
            <div>this time</div>
            <div>You scored {preScore.toFixed(0)}% in your pre-assessment</div>
            <div className="text-sm mt-4">
              {preScore - 1 < postScore
                ? `Great job! You improved by ${(postScore - preScore).toFixed(
                    0
                  )}%`
                : `You can do better! You need to improve by ${(
                    preScore - postScore
                  ).toFixed(0)}%`}
            </div>
            {postScore > preScore - 1 && (
              <button
                // onClick={() => setCurrentModule(null)}
                onClick={() => {
                  complete();   // mark module finished
                  next();       // move forward
                }}
                className="bg-blue-500/50 border-2 text-blue-200 font-bold border-blue-400 shadow-xl hover:bg-blue-500/50 shadow-blue-500/20 backdrop-blur-2xl rounded-xl p-2 flex items-center justify-center mt-4"
              >
                End Course <ArrowRight />
              </button>
            )}
            <button
              onClick={() => setPostAssessmentAnswers([])}
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