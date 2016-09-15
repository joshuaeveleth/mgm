

export class RegionLogs {
  constructor(logDir: string) {
    if (RegionLogs._instance) {
      throw new Error('RegionLogs singleton has already been initialized');
    }

    //ensure the directory for logs exists
    if (!fs.existsSync(logDir)) {
      fs.mkdir(path.join(logDir), (err) => {
        if (err && err.code !== "EEXIST")
          throw new Error('Cannot create region log directory at ' + logDir);
      });
    }
    this.dir = logDir;
    RegionLogs._instance = this;
  }
}
