export const createProgressController = (setLoading: (value: number) => void) => {
  let percent = 0;

  const updatePercent = (value: number) => {
    percent = Math.max(0, Math.min(100, value));
    setLoading(percent);
  };

  let interval = window.setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      updatePercent(percent + rand);
      return;
    }
    window.clearInterval(interval);
    interval = window.setInterval(() => {
      updatePercent(percent + Math.round(Math.random()));
      if (percent > 91) {
        window.clearInterval(interval);
      }
    }, 2000);
  }, 100);

  const clear = () => {
    window.clearInterval(interval);
    updatePercent(100);
  };

  const stop = () => {
    window.clearInterval(interval);
  };

  const loaded = () => {
    return new Promise<number>((resolve) => {
      window.clearInterval(interval);
      interval = window.setInterval(() => {
        if (percent < 100) {
          updatePercent(percent + 1);
          return;
        }
        resolve(percent);
        window.clearInterval(interval);
      }, 2);
    });
  };

  return { loaded, clear, stop };
};
