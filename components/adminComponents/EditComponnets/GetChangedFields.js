export function getChangedFields(current, initial) {
  const diff = (curr, init) => {
    if (curr === init) return undefined;

    if (curr == null || init == null) {
      // null or undefined changed to something
      return curr;
    }

    if (Array.isArray(curr) && Array.isArray(init)) {
      const result = {};
      let changed = false;

      const maxLen = Math.max(curr.length, init.length);
      for (let i = 0; i < maxLen; i++) {
        if (i >= curr.length) {
          // removed item
          result[i] = null;
          changed = true;
        } else if (i >= init.length) {
          // added item
          result[i] = curr[i];
          changed = true;
        } else {
          const subDiff = diff(curr[i], init[i]);
          if (subDiff !== undefined) {
            result[i] = subDiff;
            changed = true;
          }
        }
      }

      return changed ? result : undefined;
    }

    if (typeof curr === "object" && typeof init === "object") {
      const result = {};
      let changed = false;

      const allKeys = new Set([...Object.keys(curr), ...Object.keys(init)]);
      for (const key of allKeys) {
        const inCurr = curr.hasOwnProperty(key);
        const inInit = init.hasOwnProperty(key);

        if (!inCurr) {
          result[key] = null;
          changed = true;
        } else if (!inInit) {
          result[key] = curr[key];
          changed = true;
        } else {
          const subDiff = diff(curr[key], init[key]);
          if (subDiff !== undefined) {
            result[key] = subDiff;
            changed = true;
          }
        }
      }

      return changed ? result : undefined;
    }

    return curr;
  };

  const changes = diff(current, initial);
  return changes || {};
}
