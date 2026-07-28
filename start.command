#!/bin/bash
# Double-click to serve the bank and open it. Ctrl-C in the window to stop.
cd "$(dirname "$0")"
(sleep 1 && open "http://localhost:8000") &
python3 -m http.server 8000
