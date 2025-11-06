import { useState } from "react";
import { Building2, FlaskConical, LayoutGrid, List, ArrowLeft } from "lucide-react";
import ModuleCard from "./components/ModuleCard";
import TimeSelector from "./components/TimeSelector";
import RoomMap from "./components/RoomMap";
import RoomList from "./components/RoomList";
import RoomDetails, { RoomData } from "./components/RoomDetails";
import AddClassDialog from "./components/AddClassDialog";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

// Generar aulas vacías
const generateEmptyRooms = (moduleName: string): RoomData[] => {
  const roomCount = moduleName === "Laboratorios" ? 12 : 20;
  const rooms: RoomData[] = [];

  for (let i = 1; i <= roomCount; i++) {
    const roomCode = `${moduleName.charAt(0)}${i.toString().padStart(2, "0")}`;

    rooms.push({
      id: `${moduleName}-${i}`,
      code: roomCode,
      className: undefined,
      schedule: [],
      professor: undefined,
      coordinator: "",
      isAvailable: true,
    });
  }

  return rooms;
};

export default function App() {
  const [startTime, setStartTime] = useState<string>("07:00");
  const [endTime, setEndTime] = useState<string>("21:00");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [roomsData, setRoomsData] = useState<{ [key: string]: RoomData[] }>({});

  const modules = [
    { name: "Módulo A", icon: Building2 },
    { name: "Módulo B", icon: Building2 },
    { name: "Módulo C", icon: Building2 },
    { name: "Módulo D", icon: Building2 },
    { name: "Módulo Psicología", icon: Building2 },
    { name: "Laboratorios", icon: FlaskConical },
  ];

  const currentRooms = selectedModule
    ? roomsData[selectedModule] || generateEmptyRooms(selectedModule)
    : [];

  const availableCount = currentRooms.filter((r) => r.isAvailable).length;
  const occupiedCount = currentRooms.filter((r) => !r.isAvailable).length;

  const handleRoomClick = (room: RoomData) => {
    setSelectedRoom(room);
    setDetailsOpen(true);
  };

  const handleAddClass = () => {
    setDetailsOpen(false);
    setAddClassOpen(true);
  };

  const handleClassAdded = (classData: any) => {
    if (!selectedRoom || !selectedModule) return;

    const updatedRooms = currentRooms.map((room) => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          className: classData.className,
          professor: classData.professor,
          coordinator: classData.coordinator,
          schedule: classData.schedule,
          isAvailable: false,
        };
      }
      return room;
    });

    setRoomsData((prev) => ({
      ...prev,
      [selectedModule]: updatedRooms,
    }));

    toast.success(
      `Clase "${classData.className}" agregada exitosamente al aula ${selectedRoom.code}`
    );
    setAddClassOpen(false);
  };

  const handleRemoveClass = (roomId: string) => {
    if (!selectedModule) return;

    const updatedRooms = currentRooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          className: undefined,
          professor: undefined,
          coordinator: "",
          schedule: [],
          isAvailable: true,
        };
      }
      return room;
    });

    setRoomsData((prev) => ({
      ...prev,
      [selectedModule]: updatedRooms,
    }));

    setDetailsOpen(false);
    toast.success("Clase removida exitosamente");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Contenedor desplazable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto">
          {!selectedModule ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-gray-900 mb-2">Sistema de Gestión de Aulas</h1>
                <p className="text-gray-600">
                  Gestiona la disponibilidad de aulas y asigna clases
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.name}
                    name={module.name}
                    icon={module.icon}
                    onClick={() => setSelectedModule(module.name)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedModule(null)}
                    className="rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h2 className="text-gray-900">{selectedModule}</h2>
                    <p className="text-gray-600">
                      {availableCount} disponibles • {occupiedCount} ocupadas
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <TimeSelector
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                  />

                  <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-lg border-2 border-gray-800">
                    <Button
                      variant={viewMode === "map" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("map")}
                      className={
                        viewMode === "map"
                          ? "bg-gray-800 hover:bg-gray-900 text-white"
                          : "hover:bg-gray-100"
                      }
                    >
                      <LayoutGrid className="w-4 h-4 mr-2" />
                      Croquis
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-gray-800 hover:bg-gray-900 text-white"
                          : "hover:bg-gray-100"
                      }
                    >
                      <List className="w-4 h-4 mr-2" />
                      Lista
                    </Button>
                  </div>
                </div>
              </div>

              {viewMode === "map" ? (
                <RoomMap rooms={currentRooms} onRoomClick={handleRoomClick} />
              ) : (
                <RoomList rooms={currentRooms} onRoomClick={handleRoomClick} />
              )}

              <RoomDetails
                room={selectedRoom}
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                onAddClass={selectedRoom?.isAvailable ? handleAddClass : undefined}
                onRemoveClass={
                  selectedRoom && !selectedRoom.isAvailable
                    ? () => handleRemoveClass(selectedRoom.id)
                    : undefined
                }
              />

              <AddClassDialog
                open={addClassOpen}
                onClose={() => setAddClassOpen(false)}
                roomCode={selectedRoom?.code || ""}
                onAddClass={handleClassAdded}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
