import cn from "classnames";
import Loading from "../../components/loading";
import { TrainDataEntry } from "./types";
import { useTrainData } from "./useTrainData";

interface Column {
  label: string;
  field: keyof TrainDataEntry;
}
const columns: Column[] = [
  { label: "#", field: "passengerId" },
  { label: "Survived", field: "survived" },
  { label: "Name", field: "name" },
  { label: "Sex", field: "sex" },
  { label: "Age", field: "age" },
  { label: "Class", field: "pClass" },
  { label: "Fare", field: "fare" },
  { label: "Sib & Sp", field: "sibSp" },
  { label: "Par & Ch", field: "parCh" },
];

function formatEntry(entry: TrainDataEntry, col: Column) {
  if (col.field === "survived") {
    return entry.survived ? "✓" : "";
  }
  return entry[col.field];
}
export default function DataList() {
  const { data, isLoading } = useTrainData();

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.field}
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length}>
              <Loading className="mx-auto" />
            </td>
          </tr>
        ) : (
          data?.entries.map((entry, idx) => (
            <tr
              className={cn("border-b", {
                "bg-gray-100": idx % 2 === 0,
                "bg-white": idx % 2 === 1,
              })}
            >
              {columns.map((col) => (
                <td>{formatEntry(entry, col)}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
