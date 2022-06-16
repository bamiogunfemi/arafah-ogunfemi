import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [path, setPath] = useState(null);
  const [err, setErr] = useState(null);
  function findKey(obj, target) {
    const fnd = (obj) => {
      for (const [k, v] of Object.entries(obj.user)) {
        if (typeof v === "object" && query) {
          for (const [i, j] of Object.entries(v)) {
            if (j.toLowerCase() === target?.toLowerCase()) {
              setErr("");
              return `${i}.${k}`;
            } else {
              setErr("Path does not exist");
            }
          }
        } else {
          if (String(v) === target && query) {
            setErr("");
            return k;
          } else if (query) {
            setErr("Path does not exist");
          }
        }
      }
    };
    return fnd(obj);
  }
  const a = {
    user: {
      id: 1,
      name: {
        firstName: "James",
        lastName: "Ibori",
      },
      location: {
        city: "Ikoyi",
        state: "Lagos",
        address: "One expensive house like that",
      },
    },
  };
  useEffect(() => {
    if (query !== "") {
      setErr("");
    }
    setPath(findKey(a, query));
  }, [query]);

  return (
    <section>
      <div className="search">
        <div className="icon"></div>
        <div className="input">
          <input
            value={query}
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            id="mysearch"
          />
        </div>
      </div>
      {err && <h4 className="error">{err}</h4>}
      {query !== "" && path && (
        <h3>
          Path is `pathGet(a, {query}) ="a.user.{path}"`
        </h3>
      )}
    </section>
  );
}

export default App;
