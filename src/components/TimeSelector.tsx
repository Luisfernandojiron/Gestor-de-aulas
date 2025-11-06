import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export default function TimeSelector({ startTime, endTime, onStartTimeChange, onEndTimeChange }: TimeSelectorProps) {
  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", 
    "19:00", "20:00", "21:00"
  ];

  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg border-2 border-gray-800">
      <Clock className="w-5 h-5 text-blue-500" />
      <span className="text-gray-800">Filtrar por horario:</span>
      <span className="text-gray-800">De</span>
      <Select value={startTime} onValueChange={onStartTimeChange}>
        <SelectTrigger className="w-[110px] border-2 border-gray-300 focus:border-blue-500 bg-white">
          <SelectValue placeholder="Inicio" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-gray-800">a</span>
      <Select value={endTime} onValueChange={onEndTimeChange}>
        <SelectTrigger className="w-[110px] border-2 border-gray-300 focus:border-blue-500 bg-white">
          <SelectValue placeholder="Fin" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}