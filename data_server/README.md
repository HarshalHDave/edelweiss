# Data stream server

Exposes a TCP port and emits a real-time stream of market data
This TCP stream is consumed by our backend
Start this server AFTER the backend is live to avoid missing any initial values

## To start

```bash
java -Ddebug=true -Dspeed=2.0 -jar ./feed-play.jar dataset.csv 8080
```

Alternative command

```bash
java -Ddebug=true -Dspeed=2.0 -classpath ./feed-play.jar hackathon.player.Main dataset.csv 8080
```
