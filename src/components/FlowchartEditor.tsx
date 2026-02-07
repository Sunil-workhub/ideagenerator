import { useState, useRef, useCallback, useEffect } from "react";
import { Square, Diamond, Circle, Link2, Trash2 } from "lucide-react";
import { FlowNode, FlowConnection, FlowchartData } from "@/types/idea";

interface FlowchartEditorProps {
  value?: FlowchartData | null;
  onChange?: (data: FlowchartData) => void;
  readOnly?: boolean;
}

const NODE_W = 120;
const NODE_H = 50;

const MIN_HEIGHT = 200;
const DEFAULT_HEIGHT = 300;
const MAX_HEIGHT = 800;

const FlowchartEditor = ({
  value,
  onChange,
  readOnly = false,
}: FlowchartEditorProps) => {
  const [nodes, setNodes] = useState<FlowNode[]>(value?.nodes || []);
  const [connections, setConnections] = useState<FlowConnection[]>(
    value?.connections || [],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [nodeStart, setNodeStart] = useState({ x: 0, y: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [svgHeight, setSvgHeight] = useState(DEFAULT_HEIGHT);
  const [resizing, setResizing] = useState(false);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartH, setResizeStartH] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const newH = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, resizeStartH + (e.clientY - resizeStartY)),
      );
      setSvgHeight(newH);
    };
    const onUp = () => setResizing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing, resizeStartY, resizeStartH]);

  useEffect(() => {
    if (onChange) onChange({ nodes, connections });
  }, [nodes, connections]);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const getSVGPoint = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const addNode = (type: FlowNode["type"]) => {
    setNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        x: 80 + Math.random() * 300,
        y: 40 + Math.random() * 180,
        text:
          type === "process"
            ? "Process"
            : type === "decision"
              ? "Decision?"
              : "Start/End",
      },
    ]);
    setConnectMode(false);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (readOnly) return;
    if (connectMode) {
      if (!connectFrom) {
        setConnectFrom(nodeId);
      } else if (connectFrom !== nodeId) {
        setConnections((prev) => [
          ...prev,
          { id: crypto.randomUUID(), from: connectFrom, to: nodeId },
        ]);
        setConnectFrom(null);
      }
      return;
    }
    setSelectedId(nodeId);
    const pt = getSVGPoint(e);
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setDragging(nodeId);
      setDragStart(pt);
      setNodeStart({ x: node.x, y: node.y });
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const pt = getSVGPoint(e);
      const dx = pt.x - dragStart.x;
      const dy = pt.y - dragStart.y;
      setNodes((prev) =>
        prev.map((n) =>
          n.id === dragging
            ? { ...n, x: nodeStart.x + dx, y: nodeStart.y + dy }
            : n,
        ),
      );
    },
    [dragging, dragStart, nodeStart],
  );

  const handleMouseUp = () => setDragging(null);

  const handleDoubleClick = (e: React.MouseEvent, nodeId: string) => {
    if (readOnly) return;
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setEditingId(nodeId);
      setEditText(node.text);
    }
  };

  const saveEdit = () => {
    if (editingId) {
      setNodes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, text: editText } : n)),
      );
      setEditingId(null);
    }
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setNodes((prev) => prev.filter((n) => n.id !== selectedId));
    setConnections((prev) =>
      prev.filter((c) => c.from !== selectedId && c.to !== selectedId),
    );
    setSelectedId(null);
  };

  const renderShape = (node: FlowNode) => {
    const sel = selectedId === node.id;
    const src = connectFrom === node.id;
    const stroke = src
      ? "hsl(152, 60%, 38%)"
      : sel
        ? "hsl(192, 85%, 35%)"
        : "hsl(218, 18%, 89%)";
    const sw = sel || src ? 2 : 1;
    const fill = "white";

    switch (node.type) {
      case "process":
        return (
          <rect
            x={node.x - NODE_W / 2}
            y={node.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            rx={4}
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        );
      case "decision": {
        const hw = NODE_W / 2,
          hh = NODE_H / 2 + 5;
        return (
          <polygon
            points={`${node.x},${node.y - hh} ${node.x + hw},${node.y} ${node.x},${node.y + hh} ${node.x - hw},${node.y}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        );
      }
      case "terminal":
        return (
          <rect
            x={node.x - NODE_W / 2}
            y={node.y - NODE_H / 2}
            width={NODE_W}
            height={NODE_H}
            rx={NODE_H / 2}
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        );
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      {!readOnly && (
        <div className="flex items-center gap-1 px-2 py-1 border-b bg-muted/50 flex-wrap">
          <button
            type="button"
            onClick={() => addNode("process")}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted transition-colors"
          >
            <Square className="h-3 w-3" /> Process
          </button>
          <button
            type="button"
            onClick={() => addNode("decision")}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted transition-colors"
          >
            <Diamond className="h-3 w-3" /> Decision
          </button>
          <button
            type="button"
            onClick={() => addNode("terminal")}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted transition-colors"
          >
            <Circle className="h-3 w-3" /> Start/End
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            type="button"
            onClick={() => {
              setConnectMode(!connectMode);
              setConnectFrom(null);
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${connectMode ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <Link2 className="h-3 w-3" /> Connect
          </button>
          <button
            type="button"
            onClick={deleteSelected}
            disabled={!selectedId}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-muted disabled:opacity-30 transition-colors"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </button>
          {connectMode && (
            <span className="text-[10px] text-muted-foreground ml-2">
              {connectFrom ? "→ Click target node" : "Click source node"}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <svg
          ref={svgRef}
          width="100%"
          height={svgHeight}
          className={readOnly ? "" : "cursor-crosshair"}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => {
            if (!connectMode) setSelectedId(null);
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="hsl(220, 10%, 46%)" />
            </marker>
          </defs>

          {connections.map((conn) => {
            const from = nodes.find((n) => n.id === conn.from);
            const to = nodes.find((n) => n.id === conn.to);
            if (!from || !to) return null;
            return (
              <line
                key={conn.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsl(220, 10%, 46%)"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {nodes.map((node) => (
            <g
              key={node.id}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onDoubleClick={(e) => handleDoubleClick(e, node.id)}
              className={readOnly ? "" : "cursor-grab active:cursor-grabbing"}
            >
              {renderShape(node)}
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: "10px",
                  fill: "hsl(220, 25%, 12%)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {node.text}
              </text>
            </g>
          ))}

          {nodes.length === 0 && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: "12px", fill: "hsl(220, 10%, 46%)" }}
            >
              {readOnly ? "No flowchart" : "Add shapes using the toolbar above"}
            </text>
          )}
        </svg>

        {editingId &&
          (() => {
            const node = nodes.find((n) => n.id === editingId);
            if (!node) return null;
            return (
              <input
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit();
                }}
                className="absolute bg-card border rounded px-1 py-0.5 text-xs text-center outline-none ring-1 ring-primary"
                style={{
                  left: `${node.x - 55}px`,
                  top: `${node.y - 12}px`,
                  width: "110px",
                }}
              />
            );
          })()}
      </div>
      {/* Resize handle */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setResizing(true);
          setResizeStartY(e.clientY);
          setResizeStartH(svgHeight);
        }}
        className="h-2 cursor-row-resize bg-muted/50 hover:bg-muted border-t flex items-center justify-center"
      >
        <div className="w-8 h-0.5 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
};

export default FlowchartEditor;
