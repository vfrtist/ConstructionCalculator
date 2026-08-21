import { useState } from "react";

export interface SubBoardProps {
  classNames?: string;
  length: number;
  name?: string;
}

export default function SubBoard({
  classNames,
  length,
  name,
}: SubBoardProps) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="SubBoard container vertical" style={{ flex: length }}>
      {name && <div className="name">{name}</div>}
      <div
        className={`board ${isActive ? "" : "done"} ${classNames ? classNames : ""}`}
        onClick={() => setIsActive((prev) => !prev)}
      >
        {length}
      </div>
    </div>
  );
}
