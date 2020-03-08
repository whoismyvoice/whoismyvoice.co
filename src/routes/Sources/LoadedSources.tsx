import React, { useEffect, useState } from 'react';

import { ELECTION_CYCLES } from '../../constants';
import { ElectionCycle } from '../../models/ElectionCycle';
import Sources from './Sources';

export function LoadedSources(): JSX.Element {
  const [cycles, setCycles] = useState<ElectionCycle[]>([]);
  useEffect(() => {
    ELECTION_CYCLES.then(cycles => setCycles([...cycles].reverse()));
  }, []);
  if (cycles.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return <Sources cycles={cycles} />;
  }
}
