export class UrlObserver {
  private currentUrl: string | undefined;
  private intervalId: number | null;
  private interval: number;
  private urlChangedCallback: (url: string) => Promise<void>;

  constructor(changedCallback: (url: string) => Promise<void>, interval = 100) {
    this.currentUrl = undefined;
    this.intervalId = null;
    this.interval = interval;
    this.urlChangedCallback = changedCallback;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.checkUrl();
    this.intervalId = window.setInterval(() => {
      this.checkUrl();
    }, this.interval);
  }

  stop() {
    if (this.intervalId === null) {
      return;
    }

    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  checkUrl() {
    const url = window.location.href;

    if (url !== this.currentUrl) {
      this.currentUrl = url;

      this.urlChangedCallback(url);
    }
  }

  getUrl() {
    return this.currentUrl;
  }
}
