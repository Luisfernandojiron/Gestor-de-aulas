import { motion } from "motion/react";
import { RoomData } from "./RoomDetails";

interface RoomMapProps {
  rooms: RoomData[];
  onRoomClick: (room: RoomData) => void;
}

export default function RoomMap({ rooms, onRoomClick }: RoomMapProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-800">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`
              aspect-square rounded-lg cursor-pointer border-2 
              flex flex-col items-center justify-center p-3
              transition-all duration-200 shadow-md hover:shadow-xl
              ${room.isAvailable 
                ? "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-500 hover:border-cyan-600" 
                : "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-600 hover:border-rose-700"
              }
            `}
            onClick={() => onRoomClick(room)}
          >
            <span className={`text-center ${room.isAvailable ? "text-cyan-900" : "text-rose-900"}`}>
              {room.code}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded shadow-md"></div>
          <span className="text-gray-700">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gradient-to-br from-rose-500 to-rose-700 rounded shadow-md"></div>
          <span className="text-gray-700">Ocupada</span>
        </div>
      </div>
    </div>
  );
}
