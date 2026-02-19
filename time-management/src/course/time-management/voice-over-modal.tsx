import { cn } from "../../../lib/utils";

export default function TimeManagementVoiceOverModal(props: {
  text: string;
  isPlaying: boolean;
  operatorAsset: string;
}) {
  const { text, isPlaying, operatorAsset } = props;
  
  return (
    <div className={cn(
      "inset-0 absolute bg-black/50 pointer-events-none z-10 opacity-0 invisible",
      isPlaying && "opacity-100 visible"
    )}>
      <div className={cn(
        "absolute bottom-4 inset-x-4 bg-blue-400/50 border-2 border-blue-400 shadow-xl shadow-blue-500/20 backdrop-blur-2xl rounded-xl transition-all p-2"
      )}>
        <img src={operatorAsset} alt="Operator" className="w-30 h-30 object-top object-cover absolute left-0 bottom-0" />
        
        <div className="text-white pl-30">
          <div className="text-xs text-yellow-400">Operator</div>
          {text}
        </div>
      </div>
    </div>
  )
}