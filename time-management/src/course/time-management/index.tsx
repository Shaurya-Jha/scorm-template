import type { Course } from "..";
import { atom } from "jotai";
import PreAssessment from "./pre-assessment";
import { PrioritizationActivity } from "./prioritization";
import { TimeCompressionActivity } from "./time-compression";
import PostAssessment from "./post-assessment";

export const selfAssessmentAnswersAtom = atom<string[]>([]);

export const selfAssessmentQuestions = [
  {
    question: "Which of the following tasks should be your highest priority?",
    options: [
      "A client asking for updates",
      "Submitting documents to HR by EOD",
      "Attending the daily stand-up meeting",
      "Planning for your vacation",
    ],
  },
  {
    question:
      "You have a client meeting in 5 minutes. Suddenly your phone pings — your friend has texted you asking for some new gossip. At the same time, your colleague reminds you to prepare a presentation that must be submitted to the team lead by the end of the day. What will you do?",
    options: [
      "Attend the client meeting, then prepare your presentation, and talk to your friend only after your priority tasks are completed",
      "Attend the client meeting while preparing your presentation and talking to your friend, since you can multitask",
      "Ignore your friend, attend the client meeting, and prepare the presentation afterward",
      "Postpone the client meeting, talk to your friend, and then prepare the presentation",
    ],
  },
  {
    question:
      "You have a busy day with many deliverables. How will you schedule your time?",
    options: [
      "Take breaks during work, and shift anything left over to the next day",
      "Take breaks during work, but still work overtime",
      "Work on your project non-stop and go overtime for any leftover non-priority work",
      "Arrive late and work on the project for the remaining time",
    ],
  },
  {
    question:
      "Your boss asks you to submit a presentation that will take you 20 minutes to create. What time estimate will you give your boss?",
    options: ["30 minutes", "20 minutes", "1 day", "10 minutes"],
  },
  {
    question:
      "You have a lot of work piling up and you’re feeling exhausted. How long will you take for a short break?",
    options: [
      "10-15 minutes",
      "30 minutes",
      "1 hour",
      "Until you feel like coming back",
    ],
  },
];

export const TIME_MANAGEMENT_COURSE: Course = {
  id: "time-management",
  title: "Time management in Chrono City",
  backgroundMusic: "/synthwave.mp3",
  modules: [
    {
      type: "video",
      title: "Introduction",
      videoUrl: "introduction-video",
      subtitles: "subtitles-introduction",
      assets: {
        "introduction-video": "course-assets/time-management/module1.mp4",
        "subtitles-introduction": "course-assets/time-management/module1.vtt",
      },
    },
    {
      type: "video",
      title: "Alex's Case",
      videoUrl: "alex-case-video",
      subtitles: "subtitles-alex-case",
      assets: {
        "alex-case-video": "course-assets/time-management/alex.mp4",
        "subtitles-alex-case": "alex.vtt",
      },
    },
    {
      type: "view",
      title: "Pre Assessment",
      assets: {
        preAssessmentVoiceOver: "course-assets/time-management/pre-assessment.mp3",
        preAssessmentResultVoiceOver: "course-assets/time-management/va2.mp3",
        operator: "course-assets/time-management/operator.png",
        preAssessmentBackground: "course-assets/time-management/cover.png",
        timeMirror: "course-assets/time-management/time-mirror.png",
      },
      view: PreAssessment,
    },
    {
      type: "video",
      title: "Prioritization",
      videoUrl: "priority-video",
      subtitles: "subtitles-priority",
      assets: {
        "priority-video": "/course-assets/time-management/priority.mp4",
        "subtitles-priority": "/course-assets/time-management/priority.vtt",
      },
    },
    {
      type: "view",
      title: "Prioritization Assesment",
      assets: {
        prioritizationVoiceOver: "/course-assets/time-management/priority.mp3",
        prioritizationBackground: "/course-assets/time-management/priority-still.png",
        prioritizationCorrectAudio: "/course-assets/time-management/priority-correct.mp3",
        prioritizationIncorrectAudio: "/course-assets/time-management/priority-incorrect.mp3",
        clipboard: "/course-assets/time-management/clipboard.png",
        operator: "/course-assets/time-management/operator.png",
      },
      view: PrioritizationActivity,
    },
    {
      type: "video",
      title: "Time compression bias",
      videoUrl: "time-compression-video",
      subtitles: "subtitles-time-compression",
      assets: {
        "time-compression-video": "/course-assets/time-management/time-compression.mp4",
        "subtitles-time-compression": "/course-assets/time-management/time-compression.vtt",
      },
    },
    {
      type: "view",
      title: "Time Compression Bias Assessment",
      assets: {
        timeCompressionVoiceOver: "/course-assets/time-management/time-assessment.mp3",
        timeAssessmentCorrectAudio: "/course-assets/time-management/time-assessment-correct.mp3",
        timeAssessmentIncorrectAudio: "/course-assets/time-management/time-assessment-wrong.mp3",
        timeCompressionBackground: "/course-assets/time-management/time-assessment-still.png",
        operator: "/course-assets/time-management/operator.png",
      },
      view: TimeCompressionActivity,
    },
    {
      type: "view",
      title: "Post Assessment",
      assets: {
        postAssessmentVoiceOver: "/course-assets/time-management/post-assessment.mp3",
        postAssessmentPassAudio: "/course-assets/time-management/post-assessment-pass.mp3",
        postAssessmentFailAudio: "/course-assets/time-management/post-assessment-fail.mp3",
        operator: "/course-assets/time-management/operator.png",
        postAssessmentBackground: "/course-assets/time-management/cover.png",
        timeMirror: "/course-assets/time-management/time-mirror.png",
      },
      view: PostAssessment,
    },
  ],
};