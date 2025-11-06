import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { RoomData } from "./RoomDetails";
import { Filter } from "lucide-react";

interface RoomListProps {
  rooms: RoomData[];
  onRoomClick: (room: RoomData) => void;
}

export default function RoomList({ rooms, onRoomClick }: RoomListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [coordinatorFilter, setCoordinatorFilter] = useState<string>("todos");
  const [startTimeFilter, setStartTimeFilter] = useState<string>("");
  const [endTimeFilter, setEndTimeFilter] = useState<string>("");

  const uniqueCoordinators = Array.from(new Set(rooms.map(r => r.coordinator))).filter(coord => coord !== "");

  const filteredRooms = rooms.filter(room => {
    if (statusFilter === "available" && !room.isAvailable) return false;
    if (statusFilter === "occupied" && room.isAvailable) return false;
    
    if (coordinatorFilter && coordinatorFilter !== "todos" && room.coordinator !== coordinatorFilter) return false;
    
    if (startTimeFilter && endTimeFilter) {
      const hasOverlap = room.schedule.some(slot => {
        // Check if there's any overlap between the filter times and slot times
        return slot.startTime < endTimeFilter && slot.endTime > startTimeFilter;
      });
      if (!hasOverlap && room.schedule.length > 0) return false;
    }
    
    return true;
  });

  // Función para formatear el horario para mostrar en la tabla
  const formatScheduleForTable = (schedule: { day: string; startTime: string; endTime: string }[]) => {
    if (schedule.length === 0) return "-";
    
    // Mostrar solo el primer horario en la tabla para no saturar
    const firstSlot = schedule[0];
    return `${firstSlot.day} ${firstSlot.startTime}-${firstSlot.endTime}${schedule.length > 1 ? ` +${schedule.length - 1}` : ''}`;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-500" />
          <span className="text-gray-800">Filtros:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-gray-600">Estado:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="available">Disponibles</SelectItem>
                <SelectItem value="occupied">Ocupadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-600">Coordinador:</label>
            <Select value={coordinatorFilter} onValueChange={setCoordinatorFilter}>
              <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {uniqueCoordinators.map(coord => (
                  <SelectItem key={coord} value={coord}>{coord}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-600">Hora inicio:</label>
            <Input 
              type="time" 
              value={startTimeFilter} 
              onChange={(e) => setStartTimeFilter(e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-600">Hora fin:</label>
            <Input 
              type="time" 
              value={endTimeFilter} 
              onChange={(e) => setEndTimeFilter(e.target.value)}
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b-2 border-gray-300">
              <TableHead className="text-gray-900">Aula</TableHead>
              <TableHead className="text-gray-900">Estado</TableHead>
              <TableHead className="text-gray-900">Clase</TableHead>
              <TableHead className="text-gray-900">Docente</TableHead>
              <TableHead className="text-gray-900">Coordinador</TableHead>
              <TableHead className="text-gray-900">Horario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map(room => (
              <TableRow 
                key={room.id} 
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onRoomClick(room)}
              >
                <TableCell className="text-gray-900 font-medium">{room.code}</TableCell>
                <TableCell>
                  <Badge 
                    className={room.isAvailable 
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white" 
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                    }
                  >
                    {room.isAvailable ? "Disponible" : "Ocupada"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700">{room.className || "-"}</TableCell>
                <TableCell className="text-gray-700">{room.professor || "-"}</TableCell>
                <TableCell className="text-gray-700">{room.coordinator || "-"}</TableCell>
                <TableCell className="text-gray-700">
                  {formatScheduleForTable(room.schedule)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredRooms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron aulas que coincidan con los filtros
          </div>
        )}
      </div>
    </div>
  );
}